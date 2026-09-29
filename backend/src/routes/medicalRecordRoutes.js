const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getMedicalRecords,
  getMedicalRecord,
  getPatientMedicalRecords,
  getDoctorMedicalRecords,
  addMedicalRecord,
  editMedicalRecord,
  removeMedicalRecord,
} = require("../controllers/medicalRecordController");

const router = express.Router();

// Get all medical records
router.get("/", authMiddleware, getMedicalRecords);

// Get medical records for a specific patient
router.get("/patient/:patientId", authMiddleware, getPatientMedicalRecords);

// Get medical records for a specific doctor
router.get("/doctor/:doctorId", authMiddleware, getDoctorMedicalRecords);

// Get medical record by ID
router.get("/:id", authMiddleware, getMedicalRecord);

// Create medical record - ADMIN or DOCTOR
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "DOCTOR"),
  addMedicalRecord,
);

// Update medical record - ADMIN or DOCTOR
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "DOCTOR"),
  editMedicalRecord,
);

// Delete medical record - ADMIN only
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  removeMedicalRecord,
);

module.exports = router;
