const db = require("../config/db");

// ==========================================
// Create patient vitals
// ==========================================

const createPatientVitals = async (vitalsData) => {
  const {
    patient_id,
    prediction_id,
    age,
    gender,
    blood_pressure_systolic,
    blood_pressure_diastolic,
    blood_glucose,
    cholesterol,
    bmi,
    heart_rate,
    smoking,
    alcohol,
    creatinine,
    hemoglobin,
  } = vitalsData;

  const sql = `
    INSERT INTO ai_patient_vitals (
      patient_id,
      prediction_id,
      age,
      gender,
      blood_pressure_systolic,
      blood_pressure_diastolic,
      blood_glucose,
      cholesterol,
      bmi,
      heart_rate,
      smoking,
      alcohol,
      creatinine,
      hemoglobin
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    patient_id,
    prediction_id || null,
    age ?? null,
    gender || null,
    blood_pressure_systolic ?? null,
    blood_pressure_diastolic ?? null,
    blood_glucose ?? null,
    cholesterol ?? null,
    bmi ?? null,
    heart_rate ?? null,
    smoking ?? 0,
    alcohol ?? 0,
    creatinine ?? null,
    hemoglobin ?? null,
  ];

  const [result] = await db.execute(sql, values);

  return {
    id: result.insertId,
    ...vitalsData,
  };
};

// ==========================================
// Get latest vitals for a patient
// ==========================================

const getLatestVitalsByPatient = async (patientId) => {
  const sql = `
    SELECT
      id,
      patient_id,
      prediction_id,
      age,
      gender,
      blood_pressure_systolic,
      blood_pressure_diastolic,
      blood_glucose,
      cholesterol,
      bmi,
      heart_rate,
      smoking,
      alcohol,
      creatinine,
      hemoglobin,
      created_at
    FROM ai_patient_vitals
    WHERE patient_id = ?
    ORDER BY created_at DESC, id DESC
    LIMIT 1
  `;

  const [rows] = await db.execute(sql, [patientId]);

  return rows[0] || null;
};

// ==========================================
// Get all vitals for a patient
// ==========================================

const getVitalsByPatient = async (patientId) => {
  const sql = `
    SELECT
      id,
      patient_id,
      prediction_id,
      age,
      gender,
      blood_pressure_systolic,
      blood_pressure_diastolic,
      blood_glucose,
      cholesterol,
      bmi,
      heart_rate,
      smoking,
      alcohol,
      creatinine,
      hemoglobin,
      created_at
    FROM ai_patient_vitals
    WHERE patient_id = ?
    ORDER BY created_at DESC, id DESC
  `;

  const [rows] = await db.execute(sql, [patientId]);

  return rows;
};

// ==========================================
// Get vitals by ID
// ==========================================

const getVitalsById = async (vitalsId) => {
  const sql = `
    SELECT
      id,
      patient_id,
      prediction_id,
      age,
      gender,
      blood_pressure_systolic,
      blood_pressure_diastolic,
      blood_glucose,
      cholesterol,
      bmi,
      heart_rate,
      smoking,
      alcohol,
      creatinine,
      hemoglobin,
      created_at
    FROM ai_patient_vitals
    WHERE id = ?
  `;

  const [rows] = await db.execute(sql, [vitalsId]);

  return rows[0] || null;
};

module.exports = {
  createPatientVitals,
  getLatestVitalsByPatient,
  getVitalsByPatient,
  getVitalsById,
};
