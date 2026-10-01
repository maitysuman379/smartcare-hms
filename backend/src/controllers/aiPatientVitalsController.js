const db = require("../config/db");

const {
  createPatientVitals,
  getLatestVitalsByPatient,
  getVitalsByPatient,
  getVitalsById,
} = require("../models/aiPatientVitalsModel");

// ==========================================
// Get logged-in patient's patient ID
// ==========================================

const getLoggedInPatientId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT id
    FROM patients
    WHERE user_id = ?
    LIMIT 1
    `,
    [userId],
  );

  return rows.length > 0 ? rows[0].id : null;
};

// ==========================================
// Create patient vitals
// ==========================================

const addPatientVitals = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find actual patient ID
    const patientId = await getLoggedInPatientId(userId);

    if (!patientId) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    const {
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
    } = req.body;

    const vitals = await createPatientVitals({
      patient_id: patientId,
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
    });

    res.status(201).json({
      success: true,
      message: "Patient vitals saved successfully",
      vitals,
    });
  } catch (error) {
    console.error("Add patient vitals error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save patient vitals",
      error: error.message,
    });
  }
};

// ==========================================
// Get logged-in patient's latest vitals
// ==========================================

const getMyLatestVitals = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find actual patient ID
    const patientId = await getLoggedInPatientId(userId);

    if (!patientId) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    const vitals = await getLatestVitalsByPatient(patientId);

    res.status(200).json({
      success: true,
      vitals,
    });
  } catch (error) {
    console.error("Get latest patient vitals error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient vitals",
      error: error.message,
    });
  }
};

// ==========================================
// Get logged-in patient's vitals history
// ==========================================

const getMyVitals = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find actual patient ID
    const patientId = await getLoggedInPatientId(userId);

    if (!patientId) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    const vitals = await getVitalsByPatient(patientId);

    res.status(200).json({
      success: true,
      vitals,
    });
  } catch (error) {
    console.error("Get patient vitals error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient vitals",
      error: error.message,
    });
  }
};

// ==========================================
// Get specific vitals record
// ==========================================

const getPatientVitalsById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Find actual patient ID
    const patientId = await getLoggedInPatientId(userId);

    if (!patientId) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    const vitals = await getVitalsById(id);

    if (!vitals) {
      return res.status(404).json({
        success: false,
        message: "Vitals record not found",
      });
    }

    // Security check:
    // Make sure this vitals record belongs to logged-in patient
    if (vitals.patient_id !== patientId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      vitals,
    });
  } catch (error) {
    console.error("Get patient vitals by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vitals record",
      error: error.message,
    });
  }
};

module.exports = {
  addPatientVitals,
  getMyLatestVitals,
  getMyVitals,
  getPatientVitalsById,
};
