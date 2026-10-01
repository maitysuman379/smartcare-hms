const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getPatients,
  getPatient,
  getMyPatient,
  addPatient,
  editPatient,
} = require("../controllers/patientController");

const router = express.Router();

// Get logged-in patient's own profile
// IMPORTANT: This must come before /:id
router.get("/me", authMiddleware, getMyPatient);

// Get all patients
router.get("/", authMiddleware, getPatients);

// Get patient by ID
router.get("/:id", authMiddleware, getPatient);

// Create patient - ADMIN or RECEPTIONIST
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "RECEPTIONIST"),
  addPatient,
);

// Update patient - ADMIN or RECEPTIONIST
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "RECEPTIONIST"),
  editPatient,
);

module.exports = router;
