const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDepartments,
  getDepartment,
  addDepartment,
  editDepartment,
} = require("../controllers/departmentController");

const router = express.Router();

// Get all departments
router.get("/", authMiddleware, getDepartments);

// Get department by ID
router.get("/:id", authMiddleware, getDepartment);

// Create department - ADMIN only
router.post("/", authMiddleware, authorizeRoles("ADMIN"), addDepartment);

// Update department - ADMIN only
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), editDepartment);

module.exports = router;
