const pool = require("../config/db");

// Get all appointments
const getAllAppointments = async () => {
  const [rows] = await pool.query(`
    SELECT
      a.id,
      a.appointment_code,
      a.patient_id,
      p.name AS patient_name,
      a.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      a.appointment_date,
      a.appointment_time,
      a.reason,
      a.status,
      a.appointment_type,
      a.notes,
      a.created_at,
      a.updated_at
    FROM appointments a
    INNER JOIN patients p
      ON a.patient_id = p.id
    INNER JOIN doctors d
      ON a.doctor_id = d.id
    ORDER BY
      a.appointment_date DESC,
      a.appointment_time ASC
  `);

  return rows;
};

// Get appointment by ID
const getAppointmentById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      a.id,
      a.appointment_code,
      a.patient_id,
      p.name AS patient_name,
      a.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      a.appointment_date,
      a.appointment_time,
      a.reason,
      a.status,
      a.appointment_type,
      a.notes,
      a.created_at,
      a.updated_at
    FROM appointments a
    INNER JOIN patients p
      ON a.patient_id = p.id
    INNER JOIN doctors d
      ON a.doctor_id = d.id
    WHERE a.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Get appointments by patient
const getAppointmentsByPatientId = async (patientId) => {
  const [rows] = await pool.query(
    `
    SELECT
      a.id,
      a.appointment_code,
      a.patient_id,
      p.name AS patient_name,
      a.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      a.appointment_date,
      a.appointment_time,
      a.reason,
      a.status,
      a.appointment_type,
      a.notes,
      a.created_at,
      a.updated_at
    FROM appointments a
    INNER JOIN patients p
      ON a.patient_id = p.id
    INNER JOIN doctors d
      ON a.doctor_id = d.id
    WHERE a.patient_id = ?
    ORDER BY
      a.appointment_date DESC,
      a.appointment_time ASC
    `,
    [patientId],
  );

  return rows;
};

// Get appointments by doctor
const getAppointmentsByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `
    SELECT
      a.id,
      a.appointment_code,
      a.patient_id,
      p.name AS patient_name,
      a.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      a.appointment_date,
      a.appointment_time,
      a.reason,
      a.status,
      a.appointment_type,
      a.notes,
      a.created_at,
      a.updated_at
    FROM appointments a
    INNER JOIN patients p
      ON a.patient_id = p.id
    INNER JOIN doctors d
      ON a.doctor_id = d.id
    WHERE a.doctor_id = ?
    ORDER BY
      a.appointment_date ASC,
      a.appointment_time ASC
    `,
    [doctorId],
  );

  return rows;
};

// Create appointment
const createAppointment = async (appointmentData) => {
  const {
    appointment_code,
    patient_id,
    doctor_id,
    appointment_date,
    appointment_time,
    reason,
    status,
    appointment_type,
    notes,
  } = appointmentData;

  const [result] = await pool.query(
    `
    INSERT INTO appointments (
      appointment_code,
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
      status,
      appointment_type,
      notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      appointment_code,
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason || null,
      status || "SCHEDULED",
      appointment_type || "IN_PERSON",
      notes || null,
    ],
  );

  return result.insertId;
};

// Update appointment
const updateAppointment = async (id, appointmentData) => {
  const {
    appointment_code,
    patient_id,
    doctor_id,
    appointment_date,
    appointment_time,
    reason,
    status,
    appointment_type,
    notes,
  } = appointmentData;

  const [result] = await pool.query(
    `
    UPDATE appointments
    SET
      appointment_code = ?,
      patient_id = ?,
      doctor_id = ?,
      appointment_date = ?,
      appointment_time = ?,
      reason = ?,
      status = ?,
      appointment_type = ?,
      notes = ?
    WHERE id = ?
    `,
    [
      appointment_code,
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason || null,
      status || "SCHEDULED",
      appointment_type || "IN_PERSON",
      notes || null,
      id,
    ],
  );

  return result.affectedRows;
};

// Delete appointment
const deleteAppointment = async (id) => {
  const [result] = await pool.query(
    `
    DELETE FROM appointments
    WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows;
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
