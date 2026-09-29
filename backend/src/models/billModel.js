const pool = require("../config/db");

// Get all bills
const getAllBills = async () => {
  const [rows] = await pool.query(`
    SELECT
      b.id,
      b.bill_number,
      b.patient_id,
      p.name AS patient_name,
      b.appointment_id,
      b.consultation_fee,
      b.medicine_fee,
      b.lab_fee,
      b.other_fee,
      b.discount,
      b.tax,
      b.total_amount,
      b.payment_status,
      b.bill_date
    FROM bills b
    INNER JOIN patients p ON b.patient_id = p.id
    ORDER BY b.bill_date DESC
  `);

  return rows;
};

// Get bill by ID
const getBillById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      b.id,
      b.bill_number,
      b.patient_id,
      p.name AS patient_name,
      b.appointment_id,
      b.consultation_fee,
      b.medicine_fee,
      b.lab_fee,
      b.other_fee,
      b.discount,
      b.tax,
      b.total_amount,
      b.payment_status,
      b.bill_date
    FROM bills b
    INNER JOIN patients p ON b.patient_id = p.id
    WHERE b.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Get bills by patient
const getBillsByPatientId = async (patientId) => {
  const [rows] = await pool.query(
    `
    SELECT
      b.id,
      b.bill_number,
      b.patient_id,
      p.name AS patient_name,
      b.appointment_id,
      b.consultation_fee,
      b.medicine_fee,
      b.lab_fee,
      b.other_fee,
      b.discount,
      b.tax,
      b.total_amount,
      b.payment_status,
      b.bill_date
    FROM bills b
    INNER JOIN patients p ON b.patient_id = p.id
    WHERE b.patient_id = ?
    ORDER BY b.bill_date DESC
    `,
    [patientId],
  );

  return rows;
};

// Create bill
const createBill = async (billData) => {
  const {
    bill_number,
    patient_id,
    appointment_id,
    consultation_fee,
    medicine_fee,
    lab_fee,
    other_fee,
    discount,
    tax,
    total_amount,
    payment_status,
  } = billData;

  const [result] = await pool.query(
    `
    INSERT INTO bills (
      bill_number,
      patient_id,
      appointment_id,
      consultation_fee,
      medicine_fee,
      lab_fee,
      other_fee,
      discount,
      tax,
      total_amount,
      payment_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      bill_number,
      patient_id,
      appointment_id || null,
      consultation_fee ?? 0,
      medicine_fee ?? 0,
      lab_fee ?? 0,
      other_fee ?? 0,
      discount ?? 0,
      tax ?? 0,
      total_amount ?? 0,
      payment_status || "PENDING",
    ],
  );

  return result.insertId;
};

// Update bill
const updateBill = async (id, billData) => {
  const {
    bill_number,
    patient_id,
    appointment_id,
    consultation_fee,
    medicine_fee,
    lab_fee,
    other_fee,
    discount,
    tax,
    total_amount,
    payment_status,
  } = billData;

  const [result] = await pool.query(
    `
    UPDATE bills
    SET
      bill_number = ?,
      patient_id = ?,
      appointment_id = ?,
      consultation_fee = ?,
      medicine_fee = ?,
      lab_fee = ?,
      other_fee = ?,
      discount = ?,
      tax = ?,
      total_amount = ?,
      payment_status = ?
    WHERE id = ?
    `,
    [
      bill_number,
      patient_id,
      appointment_id || null,
      consultation_fee ?? 0,
      medicine_fee ?? 0,
      lab_fee ?? 0,
      other_fee ?? 0,
      discount ?? 0,
      tax ?? 0,
      total_amount ?? 0,
      payment_status,
      id,
    ],
  );

  return result.affectedRows;
};

// Delete bill
const deleteBill = async (id) => {
  const [result] = await pool.query(`DELETE FROM bills WHERE id = ?`, [id]);

  return result.affectedRows;
};

module.exports = {
  getAllBills,
  getBillById,
  getBillsByPatientId,
  createBill,
  updateBill,
  deleteBill,
};
