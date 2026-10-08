const {
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} = require("../models/reviewModel");

// Submit a review
const submitReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Validate review text
    if (!review || !review.trim()) {
      return res.status(400).json({
        success: false,
        message: "Review cannot be empty",
      });
    }

    const reviewId = await createReview(userId, rating, review.trim());

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      reviewId,
    });
  } catch (error) {
    console.error("Submit review error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
};

// Get approved reviews
const getPublicReviews = async (req, res) => {
  try {
    const reviews = await getApprovedReviews();

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("Get public reviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

// Get all reviews - Admin
const getAdminReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("Get admin reviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

// Approve / Reject review - Admin
const changeReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["APPROVED", "REJECTED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review status",
      });
    }

    const affectedRows = await updateReviewStatus(id, status);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Review ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error("Change review status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update review status",
    });
  }
};

// Delete review - Admin
const removeReview = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteReview(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};

module.exports = {
  submitReview,
  getPublicReviews,
  getAdminReviews,
  changeReviewStatus,
  removeReview,
};
