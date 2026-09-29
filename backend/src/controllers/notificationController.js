const {
  getAllNotifications,
  getNotificationById,
  getNotificationsByUserId,
  createNotification,
  updateNotification,
  updateNotificationReadStatus,
  deleteNotification,
} = require("../models/notificationModel");

const allowedTypes = [
  "APPOINTMENT",
  "PRESCRIPTION",
  "LAB_REPORT",
  "AI_ALERT",
  "BILLING",
  "GENERAL",
];

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await getAllNotifications();

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// Get notification by ID
const getNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await getNotificationById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Get notification error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notification",
      error: error.message,
    });
  }
};

// Get notifications by user
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await getNotificationsByUserId(userId);

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get user notifications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user notifications",
      error: error.message,
    });
  }
};

// Create notification
const addNotification = async (req, res) => {
  try {
    const { user_id, title, message, type = "GENERAL", is_read = 0 } = req.body;

    if (!user_id || !title || !message) {
      return res.status(400).json({
        success: false,
        message: "user_id, title and message are required",
      });
    }

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification type",
      });
    }

    if (![0, 1, true, false].includes(is_read)) {
      return res.status(400).json({
        success: false,
        message: "is_read must be 0, 1, true or false",
      });
    }

    const notificationId = await createNotification({
      user_id,
      title,
      message,
      type,
      is_read: is_read ? 1 : 0,
    });

    const notification = await getNotificationById(notificationId);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification,
    });
  } catch (error) {
    console.error("Create notification error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid user_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create notification",
      error: error.message,
    });
  }
};

// Update notification
const editNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const { user_id, title, message, type, is_read } = req.body;

    if (!user_id || !title || !message) {
      return res.status(400).json({
        success: false,
        message: "user_id, title and message are required",
      });
    }

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification type",
      });
    }

    if (![0, 1, true, false].includes(is_read)) {
      return res.status(400).json({
        success: false,
        message: "is_read must be 0, 1, true or false",
      });
    }

    const affectedRows = await updateNotification(id, {
      user_id,
      title,
      message,
      type,
      is_read: is_read ? 1 : 0,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    const notification = await getNotificationById(id);

    res.status(200).json({
      success: true,
      message: "Notification updated successfully",
      notification,
    });
  } catch (error) {
    console.error("Update notification error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid user_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

// Mark notification as read/unread
const editNotificationReadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;

    if (![0, 1, true, false].includes(is_read)) {
      return res.status(400).json({
        success: false,
        message: "is_read must be 0, 1, true or false",
      });
    }

    const affectedRows = await updateNotificationReadStatus(
      id,
      is_read ? 1 : 0,
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    const notification = await getNotificationById(id);

    res.status(200).json({
      success: true,
      message: is_read
        ? "Notification marked as read"
        : "Notification marked as unread",
      notification,
    });
  } catch (error) {
    console.error("Update notification read status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update notification read status",
      error: error.message,
    });
  }
};

// Delete notification
const removeNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteNotification(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  getNotification,
  getUserNotifications,
  addNotification,
  editNotification,
  editNotificationReadStatus,
  removeNotification,
};
