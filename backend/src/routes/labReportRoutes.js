const express = require("express");

const {
  getLabReports,
  getLabReport,
  getLabReportByOrder,
  getPatientLabReports,
  getDoctorLabReports,
  addLabReport,
  editLabReport,
  removeLabReport,
} = require("../controllers/labReportController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all lab reports
router.get("/", authMiddleware, getLabReports);

// Get lab reports by patient
router.get("/patient/:patientId", authMiddleware, getPatientLabReports);

// Get lab reports by doctor
router.get("/doctor/:doctorId", authMiddleware, getDoctorLabReports);

// Get lab report by lab order
router.get("/order/:labOrderId", authMiddleware, getLabReportByOrder);

// Get lab report by ID
router.get("/:id", authMiddleware, getLabReport);

// Create lab report
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "LAB_STAFF"),
  addLabReport,
);

// Update lab report
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "LAB_STAFF"),
  editLabReport,
);

// Delete lab report
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), removeLabReport);

module.exports = router;
