const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  addPatientVitals,
  getMyLatestVitals,
  getMyVitals,
  getPatientVitalsById,
} = require("../controllers/aiPatientVitalsController");

const router = express.Router();

// ==========================================
// Patient Vitals Routes
// ==========================================

// Save logged-in patient's vitals
router.post("/", authMiddleware, addPatientVitals);

// Get logged-in patient's latest vitals
router.get("/me", authMiddleware, getMyLatestVitals);

// Get logged-in patient's vitals history
router.get("/history", authMiddleware, getMyVitals);

// Get specific vitals record
router.get("/:id", authMiddleware, getPatientVitalsById);

module.exports = router;
