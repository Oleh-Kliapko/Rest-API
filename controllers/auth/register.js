const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, subscription, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(
      409,
      "This user's email has already registered. Please change email address"
    );
  }

  const avatarURL = gravatar.url(email, { s: "100", r: "x" }, false);

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmail(email, verificationToken);

  return res.status(201).json({ email, subscription });
};

module.exports = register;
