const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDoctorSchedules,
  getDoctorSchedule,
  getDoctorSchedulesByDoctor,
  addDoctorSchedule,
  editDoctorSchedule,
  removeDoctorSchedule,
} = require("../controllers/doctorScheduleController");

const router = express.Router();

// Get all doctor schedules
router.get("/", authMiddleware, getDoctorSchedules);

// Get schedules for a specific doctor
router.get("/doctor/:doctorId", authMiddleware, getDoctorSchedulesByDoctor);

// Get schedule by ID
router.get("/:id", authMiddleware, getDoctorSchedule);

// Create schedule - ADMIN only
router.post("/", authMiddleware, authorizeRoles("ADMIN"), addDoctorSchedule);

// Update schedule - ADMIN only
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), editDoctorSchedule);

// Delete schedule - ADMIN only
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  removeDoctorSchedule,
);

module.exports = router;
