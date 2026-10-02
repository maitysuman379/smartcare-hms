const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ? LIMIT 1",
    [username],
  );

  return rows[0];
};

const createUser = async (userData) => {
  const { username, email, passwordHash, role = "PATIENT" } = userData;

  const [result] = await pool.query(
    `INSERT INTO users
      (username, email, password_hash, role)
     VALUES (?, ?, ?, ?)`,
    [username, email, passwordHash, role],
  );

  return result.insertId;
};

/*
 * Get logged-in user's profile
 */
const getUserProfileById = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      username,
      email,
      profile_image,
      phone,
      date_of_birth,
      gender,
      address,
      city,
      state,
      pincode,
      emergency_contact_name,
      emergency_contact_phone,
      emergency_contact_relation,
      role,
      status,
      created_at,
      updated_at
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [userId],
  );

  return rows[0];
};

/*
 * Update logged-in user's profile
 */
const updateUserProfile = async (userId, profileData) => {
  const {
    username,
    phone,
    date_of_birth,
    gender,
    address,
    city,
    state,
    pincode,
    emergency_contact_name,
    emergency_contact_phone,
    emergency_contact_relation,
  } = profileData;

  const [result] = await pool.query(
    `
    UPDATE users
    SET
      username = ?,
      phone = ?,
      date_of_birth = ?,
      gender = ?,
      address = ?,
      city = ?,
      state = ?,
      pincode = ?,
      emergency_contact_name = ?,
      emergency_contact_phone = ?,
      emergency_contact_relation = ?
    WHERE id = ?
    `,
    [
      username,
      phone,
      date_of_birth,
      gender,
      address,
      city,
      state,
      pincode,
      emergency_contact_name,
      emergency_contact_phone,
      emergency_contact_relation,
      userId,
    ],
  );

  return result;
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser,
  getUserProfileById,
  updateUserProfile,
};
