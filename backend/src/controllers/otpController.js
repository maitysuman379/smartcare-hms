const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const {
  getLatestOtpAgeSeconds,
  replaceOtp,
  deleteOtps,
  emailAlreadyRegistered,
  getOtpRecord,
  incrementAttempts,
} = require("../models/otpModel");

const { sendOtpEmail } = require("../services/emailService");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_WAIT_SECONDS = 60;

const sendOtp = async (req, res) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: "A valid email is required",
      });
    }

    if (await emailAlreadyRegistered(email)) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Stop people from spamming the send button
    const age = await getLatestOtpAgeSeconds(email);
    if (age !== null && age < RESEND_WAIT_SECONDS) {
      return res.status(429).json({
        success: false,
        message: `Please wait ${RESEND_WAIT_SECONDS - age} seconds before requesting a new code`,
      });
    }

    const otp = String(crypto.randomInt(100000, 1000000)); // 6 digits
    const otpHash = await bcrypt.hash(otp, 10);

    await replaceOtp(email, otpHash);

    try {
      await sendOtpEmail(email, otp);
    } catch (mailError) {
      console.error("Send OTP email error:", mailError);
      await deleteOtps(email);

      return res.status(500).json({
        success: false,
        message: "Could not send verification email. Please try again.",
      });
    }

    // The code is never returned in the response, only emailed
    res.status(200).json({
      success: true,
      message: "Verification code sent to your email",
    });
  } catch (error) {
    console.error("Send OTP error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send verification code",
    });
  }
};

const MAX_ATTEMPTS = 5;

// Checks a code without consuming it. Returns { ok: true } or { ok: false, message }.
// The caller deletes the OTP only after the account is actually created.
const checkOtp = async (email, otp) => {
  const record = await getOtpRecord(email);

  if (!record) {
    return {
      ok: false,
      message: "No verification code found. Please request a new one.",
    };
  }

  if (record.expired) {
    await deleteOtps(email);
    return {
      ok: false,
      message: "Verification code has expired. Please request a new one.",
    };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await deleteOtps(email);
    return {
      ok: false,
      message: "Too many incorrect attempts. Please request a new code.",
    };
  }

  const matches = await bcrypt.compare(String(otp), record.otp_hash);

  if (!matches) {
    await incrementAttempts(email);
    return { ok: false, message: "Incorrect verification code" };
  }

  return { ok: true };
};

module.exports = { sendOtp, checkOtp };
