const pool = require("../config/db");

// Get all notifications
const getAllNotifications = async () => {
  const [rows] = await pool.query(`
    SELECT
      n.id,
      n.user_id,
      u.username,
      u.email,
      n.title,
      n.message,
      n.type,
      n.is_read,
      n.created_at
    FROM notifications n
    INNER JOIN users u ON n.user_id = u.id
    ORDER BY n.created_at DESC
  `);

  return rows;
};

// Get notification by ID
const getNotificationById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      n.id,
      n.user_id,
      u.username,
      u.email,
      n.title,
      n.message,
      n.type,
      n.is_read,
      n.created_at
    FROM notifications n
    INNER JOIN users u ON n.user_id = u.id
    WHERE n.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Get notifications by user
const getNotificationsByUserId = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT
      n.id,
      n.user_id,
      u.username,
      u.email,
      n.title,
      n.message,
      n.type,
      n.is_read,
      n.created_at
    FROM notifications n
    INNER JOIN users u ON n.user_id = u.id
    WHERE n.user_id = ?
    ORDER BY n.created_at DESC
    `,
    [userId],
  );

  return rows;
};

// Create notification
const createNotification = async (notificationData) => {
  const {
    user_id,
    title,
    message,
    type = "GENERAL",
    is_read = 0,
  } = notificationData;

  const [result] = await pool.query(
    `
    INSERT INTO notifications (
      user_id,
      title,
      message,
      type,
      is_read
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [user_id, title, message, type, is_read],
  );

  return result.insertId;
};

// Update notification
const updateNotification = async (id, notificationData) => {
  const { user_id, title, message, type, is_read } = notificationData;

  const [result] = await pool.query(
    `
    UPDATE notifications
    SET
      user_id = ?,
      title = ?,
      message = ?,
      type = ?,
      is_read = ?
    WHERE id = ?
    `,
    [user_id, title, message, type, is_read, id],
  );

  return result.affectedRows;
};

// Mark notification as read/unread
const updateNotificationReadStatus = async (id, isRead) => {
  const [result] = await pool.query(
    `
    UPDATE notifications
    SET is_read = ?
    WHERE id = ?
    `,
    [isRead, id],
  );

  return result.affectedRows;
};

// Delete notification
const deleteNotification = async (id) => {
  const [result] = await pool.query(`DELETE FROM notifications WHERE id = ?`, [
    id,
  ]);

  return result.affectedRows;
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  getNotificationsByUserId,
  createNotification,
  updateNotification,
  updateNotificationReadStatus,
  deleteNotification,
};
