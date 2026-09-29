const express = require("express");

const {
  getNotifications,
  getNotification,
  getUserNotifications,
  addNotification,
  editNotification,
  editNotificationReadStatus,
  removeNotification,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all notifications
router.get("/", authMiddleware, getNotifications);

// Get notifications by user
router.get("/user/:userId", authMiddleware, getUserNotifications);

// Get notification by ID
router.get("/:id", authMiddleware, getNotification);

// Create notification
router.post("/", authMiddleware, authorizeRoles("ADMIN"), addNotification);

// Update notification
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), editNotification);

// Mark notification as read/unread
router.patch(
  "/:id/read",
  authMiddleware,
  authorizeRoles("ADMIN"),
  editNotificationReadStatus,
);

// Delete notification
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  removeNotification,
);

module.exports = router;
