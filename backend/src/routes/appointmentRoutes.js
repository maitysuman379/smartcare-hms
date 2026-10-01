const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getAppointments,
  getAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  addAppointment,
  editAppointment,
  removeAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

// Get all appointments
router.get("/", authMiddleware, getAppointments);

// Get appointments for a specific patient
router.get("/patient/:patientId", authMiddleware, getPatientAppointments);

// Get appointments for a specific doctor
router.get("/doctor/:doctorId", authMiddleware, getDoctorAppointments);

// Get appointment by ID
router.get("/:id", authMiddleware, getAppointment);

// Create appointment - ADMIN, RECEPTIONIST or PATIENT
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "RECEPTIONIST", "PATIENT"),
  addAppointment,
);

// Update appointment - ADMIN or RECEPTIONIST
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "RECEPTIONIST"),
  editAppointment,
);

// Delete appointment - ADMIN only
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  removeAppointment,
);

module.exports = router;
