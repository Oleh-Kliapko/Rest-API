const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");

const {
  validationRegistrationUser,
  validationLoginUser,
} = require("../../models");

router.post(
  "/register",
  validateBody(validationRegistrationUser),
  ctrl.register
);

router.post("/login", validateBody(validationLoginUser));

module.exports = router;
