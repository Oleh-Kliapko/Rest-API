const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(
      409,
      "This user's email has already been in database. Please change email address"
    );
  }

  await User.create(req.body);
  return res.status(201).json({ email, subscription });
};

module.exports = register;
