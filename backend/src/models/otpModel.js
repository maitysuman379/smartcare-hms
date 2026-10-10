const pool = require("../config/db");

const TABLE = "email_verification_otps";

// Seconds since the latest OTP was created for this email (null if none)
const getLatestOtpAgeSeconds = async (email) => {
  const [rows] = await pool.query(
    `SELECT TIMESTAMPDIFF(SECOND, created_at, NOW()) AS age FROM ${TABLE} WHERE email = ? ORDER BY id DESC LIMIT 1`,
    [email],
  );
  return rows.length ? rows[0].age : null;
};

// Remove any old code for this email, then store the new hashed one (valid 10 minutes)
const replaceOtp = async (email, otpHash) => {
  await pool.query(`DELETE FROM ${TABLE} WHERE email = ?`, [email]);
  await pool.query(
    `INSERT INTO ${TABLE} (email, otp_hash, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))`,
    [email, otpHash],
  );
};

const deleteOtps = async (email) => {
  await pool.query(`DELETE FROM ${TABLE} WHERE email = ?`, [email]);
};

const emailAlreadyRegistered = async (email) => {
  const [rows] = await pool.query(
    "SELECT id FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  return rows.length > 0;
};

// Fetch the stored OTP record (expired is computed in SQL to avoid timezone mismatches)
const getOtpRecord = async (email) => {
  const [rows] = await pool.query(
    `SELECT otp_hash, attempts, (expires_at < NOW()) AS expired FROM ${TABLE} WHERE email = ? LIMIT 1`,
    [email],
  );
  return rows.length ? rows[0] : null;
};

const incrementAttempts = async (email) => {
  await pool.query(
    `UPDATE ${TABLE} SET attempts = attempts + 1 WHERE email = ?`,
    [email],
  );
};

module.exports = {
  getLatestOtpAgeSeconds,
  replaceOtp,
  deleteOtps,
  emailAlreadyRegistered,
  getOtpRecord,
  incrementAttempts,
};
