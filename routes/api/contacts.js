const express = require("express");

const router = express.Router();
const contacts = require("../../models/contacts");

router.get("/", async (_, res, __) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, __) => {
  const result = await contacts.getById(req.params.contactId);
  return res.json(result);
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
