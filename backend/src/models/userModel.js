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

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser,
};
