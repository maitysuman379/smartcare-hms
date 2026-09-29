const pool = require("../config/db");

// Get all patients
const getAllPatients = async () => {
  const [rows] = await pool.query(`
    SELECT
      p.id,
      p.user_id,
      p.patient_code,
      p.name,
      p.email,
      p.phone,
      p.date_of_birth,
      p.gender,
      p.blood_group,
      p.address,
      p.emergency_contact_name,
      p.emergency_contact_phone,
      p.height_cm,
      p.weight_kg,
      p.created_at,
      p.updated_at
    FROM patients p
    ORDER BY p.name ASC
  `);

  return rows;
};

// Get patient by ID
const getPatientById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      p.id,
      p.user_id,
      p.patient_code,
      p.name,
      p.email,
      p.phone,
      p.date_of_birth,
      p.gender,
      p.blood_group,
      p.address,
      p.emergency_contact_name,
      p.emergency_contact_phone,
      p.height_cm,
      p.weight_kg,
      p.created_at,
      p.updated_at
    FROM patients p
    WHERE p.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Create patient
const createPatient = async (patientData) => {
  const {
    user_id,
    patient_code,
    name,
    email,
    phone,
    date_of_birth,
    gender,
    blood_group,
    address,
    emergency_contact_name,
    emergency_contact_phone,
    height_cm,
    weight_kg,
  } = patientData;

  const [result] = await pool.query(
    `
    INSERT INTO patients (
      user_id,
      patient_code,
      name,
      email,
      phone,
      date_of_birth,
      gender,
      blood_group,
      address,
      emergency_contact_name,
      emergency_contact_phone,
      height_cm,
      weight_kg
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      user_id || null,
      patient_code,
      name,
      email || null,
      phone || null,
      date_of_birth || null,
      gender || null,
      blood_group || null,
      address || null,
      emergency_contact_name || null,
      emergency_contact_phone || null,
      height_cm ?? null,
      weight_kg ?? null,
    ],
  );

  return result.insertId;
};

// Update patient
const updatePatient = async (id, patientData) => {
  const {
    patient_code,
    name,
    email,
    phone,
    date_of_birth,
    gender,
    blood_group,
    address,
    emergency_contact_name,
    emergency_contact_phone,
    height_cm,
    weight_kg,
  } = patientData;

  const [result] = await pool.query(
    `
    UPDATE patients
    SET
      patient_code = ?,
      name = ?,
      email = ?,
      phone = ?,
      date_of_birth = ?,
      gender = ?,
      blood_group = ?,
      address = ?,
      emergency_contact_name = ?,
      emergency_contact_phone = ?,
      height_cm = ?,
      weight_kg = ?
    WHERE id = ?
    `,
    [
      patient_code,
      name,
      email || null,
      phone || null,
      date_of_birth || null,
      gender || null,
      blood_group || null,
      address || null,
      emergency_contact_name || null,
      emergency_contact_phone || null,
      height_cm ?? null,
      weight_kg ?? null,
      id,
    ],
  );

  return result.affectedRows;
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
};
