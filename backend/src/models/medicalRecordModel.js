const pool = require("../config/db");

// Get all medical records
const getAllMedicalRecords = async () => {
  const [rows] = await pool.query(`
    SELECT
      mr.id,
      mr.patient_id,
      p.name AS patient_name,
      mr.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      mr.appointment_id,
      mr.diagnosis,
      mr.symptoms,
      mr.treatment,
      mr.medical_notes,
      mr.record_date
    FROM medical_records mr
    INNER JOIN patients p
      ON mr.patient_id = p.id
    INNER JOIN doctors d
      ON mr.doctor_id = d.id
    LEFT JOIN appointments a
      ON mr.appointment_id = a.id
    ORDER BY mr.record_date DESC
  `);

  return rows;
};

// Get medical record by ID
const getMedicalRecordById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      mr.id,
      mr.patient_id,
      p.name AS patient_name,
      mr.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      mr.appointment_id,
      mr.diagnosis,
      mr.symptoms,
      mr.treatment,
      mr.medical_notes,
      mr.record_date
    FROM medical_records mr
    INNER JOIN patients p
      ON mr.patient_id = p.id
    INNER JOIN doctors d
      ON mr.doctor_id = d.id
    LEFT JOIN appointments a
      ON mr.appointment_id = a.id
    WHERE mr.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Get medical records by patient
const getMedicalRecordsByPatientId = async (patientId) => {
  const [rows] = await pool.query(
    `
    SELECT
      mr.id,
      mr.patient_id,
      p.name AS patient_name,
      mr.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      mr.appointment_id,
      mr.diagnosis,
      mr.symptoms,
      mr.treatment,
      mr.medical_notes,
      mr.record_date
    FROM medical_records mr
    INNER JOIN patients p
      ON mr.patient_id = p.id
    INNER JOIN doctors d
      ON mr.doctor_id = d.id
    LEFT JOIN appointments a
      ON mr.appointment_id = a.id
    WHERE mr.patient_id = ?
    ORDER BY mr.record_date DESC
    `,
    [patientId],
  );

  return rows;
};

// Get medical records by doctor
const getMedicalRecordsByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `
    SELECT
      mr.id,
      mr.patient_id,
      p.name AS patient_name,
      mr.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      mr.appointment_id,
      mr.diagnosis,
      mr.symptoms,
      mr.treatment,
      mr.medical_notes,
      mr.record_date
    FROM medical_records mr
    INNER JOIN patients p
      ON mr.patient_id = p.id
    INNER JOIN doctors d
      ON mr.doctor_id = d.id
    LEFT JOIN appointments a
      ON mr.appointment_id = a.id
    WHERE mr.doctor_id = ?
    ORDER BY mr.record_date DESC
    `,
    [doctorId],
  );

  return rows;
};

// Create medical record
const createMedicalRecord = async (recordData) => {
  const {
    patient_id,
    doctor_id,
    appointment_id,
    diagnosis,
    symptoms,
    treatment,
    medical_notes,
  } = recordData;

  const [result] = await pool.query(
    `
    INSERT INTO medical_records (
      patient_id,
      doctor_id,
      appointment_id,
      diagnosis,
      symptoms,
      treatment,
      medical_notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      patient_id,
      doctor_id,
      appointment_id || null,
      diagnosis || null,
      symptoms || null,
      treatment || null,
      medical_notes || null,
    ],
  );

  return result.insertId;
};

// Update medical record
const updateMedicalRecord = async (id, recordData) => {
  const {
    patient_id,
    doctor_id,
    appointment_id,
    diagnosis,
    symptoms,
    treatment,
    medical_notes,
  } = recordData;

  const [result] = await pool.query(
    `
    UPDATE medical_records
    SET
      patient_id = ?,
      doctor_id = ?,
      appointment_id = ?,
      diagnosis = ?,
      symptoms = ?,
      treatment = ?,
      medical_notes = ?
    WHERE id = ?
    `,
    [
      patient_id,
      doctor_id,
      appointment_id || null,
      diagnosis || null,
      symptoms || null,
      treatment || null,
      medical_notes || null,
      id,
    ],
  );

  return result.affectedRows;
};

// Delete medical record
const deleteMedicalRecord = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM medical_records WHERE id = ?`,
    [id],
  );

  return result.affectedRows;
};

module.exports = {
  getAllMedicalRecords,
  getMedicalRecordById,
  getMedicalRecordsByPatientId,
  getMedicalRecordsByDoctorId,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
};
