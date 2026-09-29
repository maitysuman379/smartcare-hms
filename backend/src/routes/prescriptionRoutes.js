const express = require("express");

const {
  getPrescriptions,
  getPrescription,
  getPatientPrescriptions,
  getDoctorPrescriptions,
  addPrescription,
  editPrescription,
  removePrescription,
} = require("../controllers/prescriptionController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all prescriptions
router.get("/", authMiddleware, getPrescriptions);

// Get prescriptions by patient
router.get("/patient/:patientId", authMiddleware, getPatientPrescriptions);

// Get prescriptions by doctor
router.get("/doctor/:doctorId", authMiddleware, getDoctorPrescriptions);

// Get prescription by ID
router.get("/:id", authMiddleware, getPrescription);

// Create prescription
// ADMIN and DOCTOR can create prescriptions
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "DOCTOR"),
  addPrescription,
);

// Update prescription
// ADMIN and DOCTOR can update prescriptions
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "DOCTOR"),
  editPrescription,
);

// Delete prescription
// Only ADMIN can delete prescriptions
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  removePrescription,
);

module.exports = router;
