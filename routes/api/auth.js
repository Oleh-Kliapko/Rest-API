const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");

const {
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
  validationEmailUser,
} = require("../../models");

// routes for register
router.post(
  "/register",
  validateBody(validationRegistrationUser),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

// resend email letter for verification
router.post(
  "/verify",
  validateBody(validationEmailUser),
  ctrl.resendVerifyEmail
);

// login route
router.post("/login", validateBody(validationLoginUser), ctrl.login);

// others routes
router.get("/current", authenticate, ctrl.getCurrentUser);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(validationSubscription),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
