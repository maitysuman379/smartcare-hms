const express = require("express");

const {
  getPrescriptionItems,
  getPrescriptionItem,
  getItemsByPrescription,
  getItemsByMedicine,
  addPrescriptionItem,
  editPrescriptionItem,
  removePrescriptionItem,
} = require("../controllers/prescriptionItemController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all prescription items
router.get("/", authMiddleware, getPrescriptionItems);

// Get items by prescription
router.get(
  "/prescription/:prescriptionId",
  authMiddleware,
  getItemsByPrescription,
);

// Get items by medicine
router.get("/medicine/:medicineId", authMiddleware, getItemsByMedicine);

// Get prescription item by ID
router.get("/:id", authMiddleware, getPrescriptionItem);

// Create prescription item
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "DOCTOR"),
  addPrescriptionItem,
);

// Update prescription item
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "DOCTOR"),
  editPrescriptionItem,
);

// Delete prescription item
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  removePrescriptionItem,
);

module.exports = router;
