const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDoctors,
  getDoctor,
  addDoctor,
  editDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

// Get all doctors
router.get("/", authMiddleware, getDoctors);

// Get doctor by ID
router.get("/:id", authMiddleware, getDoctor);

// Create doctor - ADMIN only
router.post("/", authMiddleware, authorizeRoles("ADMIN"), addDoctor);

// Update doctor - ADMIN only
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), editDoctor);

module.exports = router;
