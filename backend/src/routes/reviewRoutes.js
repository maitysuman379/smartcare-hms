const express = require("express");

const router = express.Router();

const {
  submitReview,
  getPublicReviews,
  getAdminReviews,
  changeReviewStatus,
  removeReview,
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ==========================================
// PUBLIC ROUTE
// Anyone can view approved reviews
// ==========================================
router.get("/", getPublicReviews);

// ==========================================
// PATIENT / DOCTOR
// Logged-in users can submit a review
// ==========================================
router.post(
  "/",
  authMiddleware,
  authorizeRoles("PATIENT", "DOCTOR"),
  submitReview,
);

// ==========================================
// ADMIN
// Get all reviews
// ==========================================
router.get("/admin", authMiddleware, authorizeRoles("ADMIN"), getAdminReviews);

// ==========================================
// ADMIN
// Approve / Reject review
// ==========================================
router.patch(
  "/admin/:id/status",
  authMiddleware,
  authorizeRoles("ADMIN"),
  changeReviewStatus,
);

// ==========================================
// ADMIN
// Delete review
// ==========================================
router.delete(
  "/admin/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  removeReview,
);

module.exports = router;
