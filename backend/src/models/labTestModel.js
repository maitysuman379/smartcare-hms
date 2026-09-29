const pool = require("../config/db");

// Get all lab tests
const getAllLabTests = async () => {
  const [rows] = await pool.query(`
    SELECT
      id,
      test_name,
      description,
      normal_range,
      price,
      created_at
    FROM lab_tests
    ORDER BY test_name ASC
  `);

  return rows;
};

// Get lab test by ID
const getLabTestById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      test_name,
      description,
      normal_range,
      price,
      created_at
    FROM lab_tests
    WHERE id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Create lab test
const createLabTest = async (labTestData) => {
  const { test_name, description, normal_range, price } = labTestData;

  const [result] = await pool.query(
    `
    INSERT INTO lab_tests (
      test_name,
      description,
      normal_range,
      price
    )
    VALUES (?, ?, ?, ?)
    `,
    [test_name, description || null, normal_range || null, price ?? 0.0],
  );

  return result.insertId;
};

// Update lab test
const updateLabTest = async (id, labTestData) => {
  const { test_name, description, normal_range, price } = labTestData;

  const [result] = await pool.query(
    `
    UPDATE lab_tests
    SET
      test_name = ?,
      description = ?,
      normal_range = ?,
      price = ?
    WHERE id = ?
    `,
    [test_name, description || null, normal_range || null, price ?? 0.0, id],
  );

  return result.affectedRows;
};

// Delete lab test
const deleteLabTest = async (id) => {
  const [result] = await pool.query(
    `
    DELETE FROM lab_tests
    WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows;
};

module.exports = {
  getAllLabTests,
  getLabTestById,
  createLabTest,
  updateLabTest,
  deleteLabTest,
};
