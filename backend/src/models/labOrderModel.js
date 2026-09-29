const pool = require("../config/db");

// Get all lab orders
const getAllLabOrders = async () => {
  const [rows] = await pool.query(`
    SELECT
      lo.id,
      lo.patient_id,
      p.name AS patient_name,
      lo.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      lo.test_id,
      lt.test_name,
      lt.price AS test_price,
      lo.order_date,
      lo.status,
      lo.notes
    FROM lab_orders lo
    INNER JOIN patients p ON lo.patient_id = p.id
    INNER JOIN doctors d ON lo.doctor_id = d.id
    INNER JOIN lab_tests lt ON lo.test_id = lt.id
    ORDER BY lo.order_date DESC
  `);

  return rows;
};

// Get lab order by ID
const getLabOrderById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      lo.id,
      lo.patient_id,
      p.name AS patient_name,
      lo.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      lo.test_id,
      lt.test_name,
      lt.price AS test_price,
      lo.order_date,
      lo.status,
      lo.notes
    FROM lab_orders lo
    INNER JOIN patients p ON lo.patient_id = p.id
    INNER JOIN doctors d ON lo.doctor_id = d.id
    INNER JOIN lab_tests lt ON lo.test_id = lt.id
    WHERE lo.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Get lab orders by patient
const getLabOrdersByPatientId = async (patientId) => {
  const [rows] = await pool.query(
    `
    SELECT
      lo.id,
      lo.patient_id,
      p.name AS patient_name,
      lo.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      lo.test_id,
      lt.test_name,
      lt.price AS test_price,
      lo.order_date,
      lo.status,
      lo.notes
    FROM lab_orders lo
    INNER JOIN patients p ON lo.patient_id = p.id
    INNER JOIN doctors d ON lo.doctor_id = d.id
    INNER JOIN lab_tests lt ON lo.test_id = lt.id
    WHERE lo.patient_id = ?
    ORDER BY lo.order_date DESC
    `,
    [patientId],
  );

  return rows;
};

// Get lab orders by doctor
const getLabOrdersByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `
    SELECT
      lo.id,
      lo.patient_id,
      p.name AS patient_name,
      lo.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      lo.test_id,
      lt.test_name,
      lt.price AS test_price,
      lo.order_date,
      lo.status,
      lo.notes
    FROM lab_orders lo
    INNER JOIN patients p ON lo.patient_id = p.id
    INNER JOIN doctors d ON lo.doctor_id = d.id
    INNER JOIN lab_tests lt ON lo.test_id = lt.id
    WHERE lo.doctor_id = ?
    ORDER BY lo.order_date DESC
    `,
    [doctorId],
  );

  return rows;
};

// Create lab order
const createLabOrder = async (labOrderData) => {
  const { patient_id, doctor_id, test_id, status, notes } = labOrderData;

  const [result] = await pool.query(
    `
    INSERT INTO lab_orders (
      patient_id,
      doctor_id,
      test_id,
      status,
      notes
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [patient_id, doctor_id, test_id, status || "ORDERED", notes || null],
  );

  return result.insertId;
};

// Update lab order
const updateLabOrder = async (id, labOrderData) => {
  const { patient_id, doctor_id, test_id, status, notes } = labOrderData;

  const [result] = await pool.query(
    `
    UPDATE lab_orders
    SET
      patient_id = ?,
      doctor_id = ?,
      test_id = ?,
      status = ?,
      notes = ?
    WHERE id = ?
    `,
    [patient_id, doctor_id, test_id, status, notes || null, id],
  );

  return result.affectedRows;
};

// Delete lab order
const deleteLabOrder = async (id) => {
  const [result] = await pool.query(
    `
    DELETE FROM lab_orders
    WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows;
};

module.exports = {
  getAllLabOrders,
  getLabOrderById,
  getLabOrdersByPatientId,
  getLabOrdersByDoctorId,
  createLabOrder,
  updateLabOrder,
  deleteLabOrder,
};
