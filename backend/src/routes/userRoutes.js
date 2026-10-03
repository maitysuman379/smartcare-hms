const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");

const router = express.Router();

/*
 * Get logged-in user's profile
 */
router.get("/profile", authMiddleware, getMyProfile);

/*
 * Update logged-in user's profile
 */
router.put("/profile", authMiddleware, updateMyProfile);

/*
 * ADMIN only test route
 */
router.get(
  "/admin-test",
  authMiddleware,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });
  },
);

module.exports = router;
