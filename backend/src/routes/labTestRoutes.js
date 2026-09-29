const express = require("express");

const {
  getLabTests,
  getLabTest,
  addLabTest,
  editLabTest,
  removeLabTest,
} = require("../controllers/labTestController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all lab tests
router.get("/", authMiddleware, getLabTests);

// Get lab test by ID
router.get("/:id", authMiddleware, getLabTest);

// Create lab test
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "LAB_STAFF"),
  addLabTest,
);

// Update lab test
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "LAB_STAFF"),
  editLabTest,
);

// Delete lab test
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), removeLabTest);

module.exports = router;
