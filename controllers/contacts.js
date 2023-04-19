const { Contact } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "This contact was not found");
  }
  return res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  return res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId);

  if (!result) {
    throw HttpError(404, "This contact was not found");
  }

  return res.status(200).json({ message: "This contact was deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, "Missing field favorite");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
