const express = require("express");

const {
  getLabOrders,
  getLabOrder,
  getPatientLabOrders,
  getDoctorLabOrders,
  addLabOrder,
  editLabOrder,
  removeLabOrder,
} = require("../controllers/labOrderController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all lab orders
router.get("/", authMiddleware, getLabOrders);

// Get lab orders by patient
router.get("/patient/:patientId", authMiddleware, getPatientLabOrders);

// Get lab orders by doctor
router.get("/doctor/:doctorId", authMiddleware, getDoctorLabOrders);

// Get lab order by ID
router.get("/:id", authMiddleware, getLabOrder);

// Create lab order
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN", "DOCTOR"),
  addLabOrder,
);

// Update lab order
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "DOCTOR", "LAB_STAFF"),
  editLabOrder,
);

// Delete lab order
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), removeLabOrder);

module.exports = router;
