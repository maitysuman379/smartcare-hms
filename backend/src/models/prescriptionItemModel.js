const pool = require("../config/db");

// Get all prescription items
const getAllPrescriptionItems = async () => {
  const [rows] = await pool.query(`
    SELECT
      pi.id,
      pi.prescription_id,
      pi.medicine_id,
      m.name AS medicine_name,
      m.generic_name,
      pi.dosage,
      pi.frequency,
      pi.duration,
      pi.quantity,
      pi.instructions
    FROM prescription_items pi
    INNER JOIN medicines m
      ON pi.medicine_id = m.id
    ORDER BY pi.id DESC
  `);

  return rows;
};

// Get prescription item by ID
const getPrescriptionItemById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      pi.id,
      pi.prescription_id,
      pi.medicine_id,
      m.name AS medicine_name,
      m.generic_name,
      pi.dosage,
      pi.frequency,
      pi.duration,
      pi.quantity,
      pi.instructions
    FROM prescription_items pi
    INNER JOIN medicines m
      ON pi.medicine_id = m.id
    WHERE pi.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Get items for a prescription
const getPrescriptionItemsByPrescriptionId = async (prescriptionId) => {
  const [rows] = await pool.query(
    `
    SELECT
      pi.id,
      pi.prescription_id,
      pi.medicine_id,
      m.name AS medicine_name,
      m.generic_name,
      pi.dosage,
      pi.frequency,
      pi.duration,
      pi.quantity,
      pi.instructions
    FROM prescription_items pi
    INNER JOIN medicines m
      ON pi.medicine_id = m.id
    WHERE pi.prescription_id = ?
    ORDER BY pi.id ASC
    `,
    [prescriptionId],
  );

  return rows;
};

// Get items by medicine
const getPrescriptionItemsByMedicineId = async (medicineId) => {
  const [rows] = await pool.query(
    `
    SELECT
      pi.id,
      pi.prescription_id,
      pi.medicine_id,
      m.name AS medicine_name,
      m.generic_name,
      pi.dosage,
      pi.frequency,
      pi.duration,
      pi.quantity,
      pi.instructions
    FROM prescription_items pi
    INNER JOIN medicines m
      ON pi.medicine_id = m.id
    WHERE pi.medicine_id = ?
    ORDER BY pi.id DESC
    `,
    [medicineId],
  );

  return rows;
};

// Create prescription item
const createPrescriptionItem = async (itemData) => {
  const {
    prescription_id,
    medicine_id,
    dosage,
    frequency,
    duration,
    quantity,
    instructions,
  } = itemData;

  const [result] = await pool.query(
    `
    INSERT INTO prescription_items (
      prescription_id,
      medicine_id,
      dosage,
      frequency,
      duration,
      quantity,
      instructions
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      prescription_id,
      medicine_id,
      dosage || null,
      frequency || null,
      duration || null,
      quantity ?? null,
      instructions || null,
    ],
  );

  return result.insertId;
};

// Update prescription item
const updatePrescriptionItem = async (id, itemData) => {
  const {
    prescription_id,
    medicine_id,
    dosage,
    frequency,
    duration,
    quantity,
    instructions,
  } = itemData;

  const [result] = await pool.query(
    `
    UPDATE prescription_items
    SET
      prescription_id = ?,
      medicine_id = ?,
      dosage = ?,
      frequency = ?,
      duration = ?,
      quantity = ?,
      instructions = ?
    WHERE id = ?
    `,
    [
      prescription_id,
      medicine_id,
      dosage || null,
      frequency || null,
      duration || null,
      quantity ?? null,
      instructions || null,
      id,
    ],
  );

  return result.affectedRows;
};

// Delete prescription item
const deletePrescriptionItem = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM prescription_items WHERE id = ?`,
    [id],
  );

  return result.affectedRows;
};

module.exports = {
  getAllPrescriptionItems,
  getPrescriptionItemById,
  getPrescriptionItemsByPrescriptionId,
  getPrescriptionItemsByMedicineId,
  createPrescriptionItem,
  updatePrescriptionItem,
  deletePrescriptionItem,
};
