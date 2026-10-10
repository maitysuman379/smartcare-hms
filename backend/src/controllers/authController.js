const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { findUserByEmail, findUserByUsername } = require("../models/userModel");

const { createRegisteredAccount } = require("../models/registrationModel");

const { checkOtp } = require("./otpController");
const { deleteOtps } = require("../models/otpModel");

const DOCTOR_REGISTRATION_MESSAGE = `Doctor Registration – Pending Verification

Your registration application has been submitted successfully.

Please submit the required documents and provide your complete contact details, including your phone number and residential address, to the hospital administrator within 7 days of registration for verification.

Important Notice: If you fail to provide the required documents and information within 7 days, your application may be rejected, and your registration records may be deleted from our database in accordance with our data-retention policy.

Your account will remain in PENDING status until the administrator verifies your information, completes your professional profile, and approves your application.

Thank you for choosing SmartCare HMS.

SmartCare HMS – Healthcare Management System`;

const ACCOUNT_STATUS_MESSAGES = {
  PENDING:
    "Your doctor application is pending administrator verification. Please submit the required documents and contact information within 7 days of registration.",
  REJECTED:
    "Your application has been rejected. Please contact the hospital administrator.",
  INACTIVE: "Your account is inactive. Please contact the administrator.",
  BLOCKED: "Your account has been blocked. Please contact the administrator.",
};

// ================================
// REGISTER
// ================================

const register = async (req, res) => {
  try {
    const username =
      typeof req.body.username === "string" ? req.body.username.trim() : "";

    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const password = req.body.password;
    const otp = req.body.otp;

    const requestedRole = String(req.body.role || "PATIENT")
      .trim()
      .toUpperCase();

    // Public registration is limited to PATIENT and DOCTOR.
    if (!["PATIENT", "DOCTOR"].includes(requestedRole)) {
      return res.status(403).json({
        success: false,
        message:
          "Public registration is allowed only for patients and doctors.",
      });
    }

    // Required fields.
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required.",
      });
    }

    if (username.length > 100 || email.length > 150) {
      return res.status(400).json({
        success: false,
        message: "Username or email exceeds the allowed length.",
      });
    }

    // Password validation.
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and no more than 72 UTF-8 bytes.",
      });
    }

    // Email format validation.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Check username.
    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // Check email.
    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // OTP verification is required for both roles.
    if (!otp || (typeof otp !== "string" && typeof otp !== "number")) {
      return res.status(400).json({
        success: false,
        message: "Email verification code is required.",
      });
    }

    const otpResult = await checkOtp(email, String(otp));

    if (!otpResult.ok) {
      return res.status(400).json({
        success: false,
        message: otpResult.message,
      });
    }

    // Hash the password using the existing mechanism.
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user and associated patient/application atomically.
    const account = await createRegisteredAccount({
      username,
      email,
      passwordHash,
      role: requestedRole,
    });

    // OTP is deleted only after successful account creation.
    try {
      await deleteOtps(email);
    } catch (cleanupError) {
      console.error("OTP cleanup error:", cleanupError);
    }

    // Doctor registration response.
    if (requestedRole === "DOCTOR") {
      return res.status(201).json({
        success: true,
        message: DOCTOR_REGISTRATION_MESSAGE,
        application: {
          id: account.applicationId,
          userId: account.userId,
          username,
          email,
          role: "DOCTOR",
          status: "PENDING",
          applicationStatus: "PENDING_DOCUMENTS",
          deadlineAt: account.deadlineAt,
          submissionWindowDays: 7,
        },
      });
    }

    // Existing patient registration response.
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: account.userId,
        username,
        email,
        role: "PATIENT",
        status: "ACTIVE",
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// ================================
// LOGIN
// ================================

const login = async (req, res) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const { password } = req.body;

    if (!email || typeof password !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Verify password before revealing account status.
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Do not issue a JWT to non-active accounts.
    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        status: user.status,
        message:
          ACCOUNT_STATUS_MESSAGES[user.status] ||
          "Your account is not active. Please contact the administrator.",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured.");

      return res.status(500).json({
        success: false,
        message: "Authentication is temporarily unavailable.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

module.exports = {
  register,
  login,
};
