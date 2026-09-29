const pool = require("../config/db");

const getAllDepartments = async () => {
  const [rows] = await pool.query(
    `SELECT id, name, description, created_at
     FROM departments
     ORDER BY name ASC`,
  );

  return rows;
};

const getDepartmentById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, name, description, created_at
     FROM departments
     WHERE id = ?
     LIMIT 1`,
    [id],
  );

  return rows[0];
};

const createDepartment = async (departmentData) => {
  const { name, description } = departmentData;

  const [result] = await pool.query(
    `INSERT INTO departments (name, description)
     VALUES (?, ?)`,
    [name, description || null],
  );

  return result.insertId;
};

const updateDepartment = async (id, departmentData) => {
  const { name, description } = departmentData;

  const [result] = await pool.query(
    `UPDATE departments
     SET name = ?, description = ?
     WHERE id = ?`,
    [name, description || null, id],
  );

  return result.affectedRows;
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
};
