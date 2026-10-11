const express = require("express");

const { sendOtp } = require("../controllers/otpController");

const {
  register,
  login,
  setupAdmin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);

// Protected, one-time initial Admin setup.
router.post("/setup-admin", setupAdmin);

module.exports = router;
