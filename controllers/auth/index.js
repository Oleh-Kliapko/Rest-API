const { ctrlWrapper } = require("../../helpers");

module.exports = {
  register: ctrlWrapper(require("./register")),
};
