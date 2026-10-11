const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const pool = require("../config/db");

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
// REGISTER PATIENT OR DOCTOR
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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists.",
      });
    }

    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

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

    const passwordHash = await bcrypt.hash(password, 10);

    const account = await createRegisteredAccount({
      username,
      email,
      passwordHash,
      role: requestedRole,
    });

    try {
      await deleteOtps(email);
    } catch (cleanupError) {
      console.error("OTP cleanup error:", cleanupError);
    }

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

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

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

// ================================
// ONE-TIME ADMIN SETUP
// ================================

const setupAdmin = async (req, res) => {
  let connection;
  let lockAcquired = false;

  try {
    const expectedSecret = process.env.ADMIN_SETUP_SECRET;
    const providedSecret = req.get("x-admin-setup-secret") || "";

    if (
      typeof expectedSecret !== "string" ||
      expectedSecret.length < 32 ||
      !providedSecret
    ) {
      return res.status(403).json({
        success: false,
        message: "Admin setup is not authorized.",
      });
    }

    const expectedBuffer = Buffer.from(expectedSecret, "utf8");
    const providedBuffer = Buffer.from(providedSecret, "utf8");

    if (
      expectedBuffer.length !== providedBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, providedBuffer)
    ) {
      return res.status(403).json({
        success: false,
        message: "Admin setup is not authorized.",
      });
    }

    const username =
      typeof req.body.username === "string" ? req.body.username.trim() : "";

    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const password = req.body.password;

    if (!username || !email || typeof password !== "string") {
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

    if (password.length < 12 || Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 12 characters and no more than 72 UTF-8 bytes.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    connection = await pool.getConnection();

    // Serialize setup requests using a MySQL advisory lock.
    const [lockRows] = await connection.query(
      "SELECT GET_LOCK(?, 10) AS acquired",
      ["smartcare_hms_admin_setup"],
    );

    if (Number(lockRows[0]?.acquired) !== 1) {
      return res.status(503).json({
        success: false,
        message: "Admin setup is busy. Please try again.",
      });
    }

    lockAcquired = true;

    // Only permit initial setup if no Admin exists.
    const [adminRows] = await connection.query(
      "SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1",
    );

    if (adminRows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An Admin account already exists.",
      });
    }

    // Check username and email against existing users.
    const [existingRows] = await connection.query(
      `SELECT id
       FROM users
       WHERE email = ? OR username = ?
       LIMIT 1`,
      [email, username],
    );

    if (existingRows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await connection.query(
      `INSERT INTO users
        (username, email, password_hash, role, status)
       VALUES (?, ?, ?, 'ADMIN', 'ACTIVE')`,
      [username, email, passwordHash],
    );

    return res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
      user: {
        id: result.insertId,
        username,
        email,
        role: "ADMIN",
        status: "ACTIVE",
      },
    });
  } catch (error) {
    console.error("Admin setup error:", error.code || error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Admin setup failed. Please try again.",
    });
  } finally {
    if (connection) {
      try {
        if (lockAcquired) {
          await connection.query("SELECT RELEASE_LOCK(?)", [
            "smartcare_hms_admin_setup",
          ]);
        }
      } catch (releaseError) {
        console.error("Admin setup lock release failed.");
      } finally {
        connection.release();
      }
    }
  }
};

// ================================
// EXPORT CONTROLLERS
// ================================

module.exports = {
  register,
  login,
  setupAdmin,
};
