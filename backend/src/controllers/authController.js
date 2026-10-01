const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  findUserByEmail,
  findUserByUsername,
  createUser,
} = require("../models/userModel");

const { createPatient } = require("../models/patientModel");

// ================================
// REGISTER
// ================================

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    // Check username
    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Check email
    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Only allow valid roles
    const allowedRoles = [
      "ADMIN",
      "DOCTOR",
      "PATIENT",
      "RECEPTIONIST",
      "LAB_STAFF",
    ];

    const userRole = role || "PATIENT";

    if (!allowedRoles.includes(userRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // ================================
    // CREATE USER
    // ================================

    const userId = await createUser({
      username,
      email,
      passwordHash,
      role: userRole,
    });

    // ================================
    // CREATE PATIENT PROFILE
    // ================================
    // Only PATIENT users need a patient profile

    if (userRole === "PATIENT") {
      await createPatient({
        user_id: userId,
        patient_code: `PAT-${userId}`,
        name: username,
        email,
      });
    }

    // ================================
    // SUCCESS RESPONSE
    // ================================

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: userId,
        username,
        email,
        role: userRole,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// ================================
// LOGIN
// ================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ================================
    // FIND USER
    // ================================

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ================================
    // CHECK ACCOUNT STATUS
    // ================================

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: `Account is ${user.status.toLowerCase()}`,
      });
    }

    // ================================
    // CHECK PASSWORD
    // ================================

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ================================
    // CREATE JWT
    // ================================

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

    // ================================
    // LOGIN SUCCESS
    // ================================

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// ================================
// EXPORT
// ================================

module.exports = {
  register,
  login,
};
