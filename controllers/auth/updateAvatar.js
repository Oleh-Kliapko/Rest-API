const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const avatarExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff"];

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const avatarName = `${_id}_${originalname}`;

  const fileExtension = originalname.substring(
    originalname.lastIndexOf(".") + 1
  );

  if (!avatarExtensions.includes(fileExtension.toLowerCase())) {
    throw HttpError(
      400,
      `${originalname} includes an invalid file extension! Must be: ${avatarExtensions.join(
        ", or "
      )}`
    );
  }

  const resultUpload = path.join(avatarDir, avatarName);

  // Use Jimp to modify the image
  const image = await Jimp.read(tempUpload);
  await image
    .autocrop()
    .cover(250, 250)
    .quality(60)
    .greyscale()
    .writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
