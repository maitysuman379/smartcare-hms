const express = require("express");

const {
  getBills,
  getBill,
  getPatientBills,
  addBill,
  editBill,
  removeBill,
} = require("../controllers/billController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all bills
router.get("/", authMiddleware, getBills);

// Get bills by patient
router.get("/patient/:patientId", authMiddleware, getPatientBills);

// Get bill by ID
router.get("/:id", authMiddleware, getBill);

// Create bill
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "RECEPTIONIST"),
  addBill,
);

// Update bill
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "RECEPTIONIST"),
  editBill,
);

// Delete bill
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), removeBill);

module.exports = router;
