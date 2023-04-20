const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId);

  if (!result) {
    throw HttpError(404, "This contact was not found");
  }

  return res.status(200).json({ message: "This contact was deleted" });
};

module.exports = removeContact;
