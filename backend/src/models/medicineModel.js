const pool = require("../config/db");

// Get all medicines
const getAllMedicines = async () => {
  const [rows] = await pool.query(`
    SELECT
      id,
      name,
      generic_name,
      manufacturer,
      description,
      stock_quantity,
      unit_price,
      expiry_date,
      created_at
    FROM medicines
    ORDER BY name ASC
  `);

  return rows;
};

// Get medicine by ID
const getMedicineById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      name,
      generic_name,
      manufacturer,
      description,
      stock_quantity,
      unit_price,
      expiry_date,
      created_at
    FROM medicines
    WHERE id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Create medicine
const createMedicine = async (medicineData) => {
  const {
    name,
    generic_name,
    manufacturer,
    description,
    stock_quantity,
    unit_price,
    expiry_date,
  } = medicineData;

  const [result] = await pool.query(
    `
    INSERT INTO medicines (
      name,
      generic_name,
      manufacturer,
      description,
      stock_quantity,
      unit_price,
      expiry_date
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      generic_name || null,
      manufacturer || null,
      description || null,
      stock_quantity ?? 0,
      unit_price ?? 0.0,
      expiry_date || null,
    ],
  );

  return result.insertId;
};

// Update medicine
const updateMedicine = async (id, medicineData) => {
  const {
    name,
    generic_name,
    manufacturer,
    description,
    stock_quantity,
    unit_price,
    expiry_date,
  } = medicineData;

  const [result] = await pool.query(
    `
    UPDATE medicines
    SET
      name = ?,
      generic_name = ?,
      manufacturer = ?,
      description = ?,
      stock_quantity = ?,
      unit_price = ?,
      expiry_date = ?
    WHERE id = ?
    `,
    [
      name,
      generic_name || null,
      manufacturer || null,
      description || null,
      stock_quantity ?? 0,
      unit_price ?? 0.0,
      expiry_date || null,
      id,
    ],
  );

  return result.affectedRows;
};

// Delete medicine
const deleteMedicine = async (id) => {
  const [result] = await pool.query(`DELETE FROM medicines WHERE id = ?`, [id]);

  return result.affectedRows;
};

module.exports = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
