const express = require("express");

const {
  getMedicines,
  getMedicine,
  addMedicine,
  editMedicine,
  removeMedicine,
} = require("../controllers/medicineController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all medicines
router.get("/", authMiddleware, getMedicines);

// Get medicine by ID
router.get("/:id", authMiddleware, getMedicine);

// Create medicine
// ADMIN and LAB_STAFF can create medicines
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "LAB_STAFF"),
  addMedicine,
);

// Update medicine
// ADMIN and LAB_STAFF can update medicines
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "LAB_STAFF"),
  editMedicine,
);

// Delete medicine
// Only ADMIN can delete medicines
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), removeMedicine);

module.exports = router;
