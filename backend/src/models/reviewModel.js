const pool = require("../config/db");

// Create a new review
const createReview = async (userId, rating, review) => {
  const [result] = await pool.query(
    `INSERT INTO reviews (user_id, rating, review)
         VALUES (?, ?, ?)`,
    [userId, rating, review],
  );

  return result.insertId;
};

// Get all approved reviews
const getApprovedReviews = async () => {
  const [rows] = await pool.query(
    `SELECT 
            r.id,
            r.rating,
            r.review,
            r.created_at,
            u.username,
            u.profile_image
         FROM reviews r
         JOIN users u ON r.user_id = u.id
         WHERE r.status = 'APPROVED'
         ORDER BY r.created_at DESC`,
  );

  return rows;
};

// Get all reviews for admin
const getAllReviews = async () => {
  const [rows] = await pool.query(
    `SELECT 
            r.id,
            r.rating,
            r.review,
            r.status,
            r.created_at,
            u.id AS user_id,
            u.username,
            u.role,
            u.profile_image
         FROM reviews r
         JOIN users u ON r.user_id = u.id
         ORDER BY r.created_at DESC`,
  );

  return rows;
};

// Update review status
const updateReviewStatus = async (reviewId, status) => {
  const [result] = await pool.query(
    `UPDATE reviews
         SET status = ?
         WHERE id = ?`,
    [status, reviewId],
  );

  return result.affectedRows;
};

// Delete review
const deleteReview = async (reviewId) => {
  const [result] = await pool.query(
    `DELETE FROM reviews
         WHERE id = ?`,
    [reviewId],
  );

  return result.affectedRows;
};

module.exports = {
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
};
