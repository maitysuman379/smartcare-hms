const pool = require("../config/db");

// Get all prescriptions
const getAllPrescriptions = async () => {
  const [rows] = await pool.query(`
    SELECT
      pr.id,
      pr.patient_id,
      p.name AS patient_name,
      pr.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      pr.medical_record_id,
      pr.prescription_date,
      pr.instructions
    FROM prescriptions pr
    INNER JOIN patients p
      ON pr.patient_id = p.id
    INNER JOIN doctors d
      ON pr.doctor_id = d.id
    LEFT JOIN medical_records mr
      ON pr.medical_record_id = mr.id
    ORDER BY pr.prescription_date DESC
  `);

  return rows;
};

// Get prescription by ID
const getPrescriptionById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      pr.id,
      pr.patient_id,
      p.name AS patient_name,
      pr.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      pr.medical_record_id,
      pr.prescription_date,
      pr.instructions
    FROM prescriptions pr
    INNER JOIN patients p
      ON pr.patient_id = p.id
    INNER JOIN doctors d
      ON pr.doctor_id = d.id
    LEFT JOIN medical_records mr
      ON pr.medical_record_id = mr.id
    WHERE pr.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Get prescriptions by patient
const getPrescriptionsByPatientId = async (patientId) => {
  const [rows] = await pool.query(
    `
    SELECT
      pr.id,
      pr.patient_id,
      p.name AS patient_name,
      pr.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      pr.medical_record_id,
      pr.prescription_date,
      pr.instructions
    FROM prescriptions pr
    INNER JOIN patients p
      ON pr.patient_id = p.id
    INNER JOIN doctors d
      ON pr.doctor_id = d.id
    LEFT JOIN medical_records mr
      ON pr.medical_record_id = mr.id
    WHERE pr.patient_id = ?
    ORDER BY pr.prescription_date DESC
    `,
    [patientId],
  );

  return rows;
};

// Get prescriptions by doctor
const getPrescriptionsByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `
    SELECT
      pr.id,
      pr.patient_id,
      p.name AS patient_name,
      pr.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      pr.medical_record_id,
      pr.prescription_date,
      pr.instructions
    FROM prescriptions pr
    INNER JOIN patients p
      ON pr.patient_id = p.id
    INNER JOIN doctors d
      ON pr.doctor_id = d.id
    LEFT JOIN medical_records mr
      ON pr.medical_record_id = mr.id
    WHERE pr.doctor_id = ?
    ORDER BY pr.prescription_date DESC
    `,
    [doctorId],
  );

  return rows;
};

// Create prescription
const createPrescription = async (prescriptionData) => {
  const { patient_id, doctor_id, medical_record_id, instructions } =
    prescriptionData;

  const [result] = await pool.query(
    `
    INSERT INTO prescriptions (
      patient_id,
      doctor_id,
      medical_record_id,
      instructions
    )
    VALUES (?, ?, ?, ?)
    `,
    [patient_id, doctor_id, medical_record_id || null, instructions || null],
  );

  return result.insertId;
};

// Update prescription
const updatePrescription = async (id, prescriptionData) => {
  const { patient_id, doctor_id, medical_record_id, instructions } =
    prescriptionData;

  const [result] = await pool.query(
    `
    UPDATE prescriptions
    SET
      patient_id = ?,
      doctor_id = ?,
      medical_record_id = ?,
      instructions = ?
    WHERE id = ?
    `,
    [
      patient_id,
      doctor_id,
      medical_record_id || null,
      instructions || null,
      id,
    ],
  );

  return result.affectedRows;
};

// Delete prescription
const deletePrescription = async (id) => {
  const [result] = await pool.query(`DELETE FROM prescriptions WHERE id = ?`, [
    id,
  ]);

  return result.affectedRows;
};

module.exports = {
  getAllPrescriptions,
  getPrescriptionById,
  getPrescriptionsByPatientId,
  getPrescriptionsByDoctorId,
  createPrescription,
  updatePrescription,
  deletePrescription,
};
