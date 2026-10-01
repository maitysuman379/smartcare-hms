const {
  createPrediction,
  getPredictionsByPatient,
  getPredictionById,
} = require("../models/aiPredictionModel");

const { predictHeartDisease } = require("../services/mlService");

const pool = require("../config/db");

// ========================================
// HEART DISEASE PREDICTION
// ========================================

const predictHeartDiseaseController = async (req, res) => {
  try {
    // Authenticated user ID
    const userId = req.user.id;

    // Find patient linked with logged-in user
    const [patients] = await pool.query(
      `
            SELECT id
            FROM patients
            WHERE user_id = ?
            LIMIT 1
            `,
      [userId],
    );

    if (patients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    const patientId = patients[0].id;

    // Required heart disease fields
    const requiredFields = [
      "age",
      "sex",
      "cp",
      "trestbps",
      "chol",
      "fbs",
      "restecg",
      "thalach",
      "exang",
      "oldpeak",
      "slope",
      "ca",
      "thal",
    ];

    // Check missing fields
    const missingFields = requiredFields.filter(
      (field) =>
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === "",
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Required prediction fields are missing",
        missing_fields: missingFields,
      });
    }

    // Prepare ML input
    const patientData = {};

    requiredFields.forEach((field) => {
      patientData[field] = req.body[field];
    });

    // Send data to Flask ML API
    const mlResponse = await predictHeartDisease(patientData);

    if (!mlResponse || mlResponse.status !== "success" || !mlResponse.result) {
      return res.status(502).json({
        success: false,
        message: "Invalid response received from ML service",
      });
    }

    const prediction = mlResponse.result;

    // Save prediction into database
    const predictionRecord = await createPrediction({
      patient_id: patientId,
      disease_type: "HEART_DISEASE",
      risk_percentage: prediction.disease_probability,
      prediction_result: prediction.result,
      model_name: "Logistic Regression",
      model_version: "1.0",
      confidence_score: Math.max(
        prediction.disease_probability,
        prediction.no_disease_probability,
      ),
      input_data: patientData,
    });

    return res.status(201).json({
      success: true,
      message: "Heart disease prediction completed successfully",

      prediction: {
        id: predictionRecord.id,
        patient_id: patientId,
        disease: "heart_disease",
        result: prediction.result,
        risk_percentage: prediction.disease_probability,
        no_disease_probability: prediction.no_disease_probability,
        disease_probability: prediction.disease_probability,
        confidence_score: Math.max(
          prediction.disease_probability,
          prediction.no_disease_probability,
        ),
        model_name: "Logistic Regression",
        model_version: "1.0",
      },
    });
  } catch (error) {
    console.error("Heart disease prediction error:", error);

    return res.status(500).json({
      success: false,
      message: "Heart disease prediction failed",
      error: error.message,
    });
  }
};

// ========================================
// GET MY AI PREDICTIONS
// ========================================

const getMyPredictions = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find logged-in patient's ID
    const [patients] = await pool.query(
      `
            SELECT id
            FROM patients
            WHERE user_id = ?
            LIMIT 1
            `,
      [userId],
    );

    if (patients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });
    }

    const patientId = patients[0].id;

    const predictions = await getPredictionsByPatient(patientId);

    return res.status(200).json({
      success: true,
      predictions,
    });
  } catch (error) {
    console.error("Get AI predictions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch AI predictions",
      error: error.message,
    });
  }
};

// ========================================
// GET PREDICTION BY ID
// ========================================

const getPrediction = async (req, res) => {
  try {
    const predictionId = req.params.id;

    const prediction = await getPredictionById(predictionId);

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: "Prediction not found",
      });
    }

    return res.status(200).json({
      success: true,
      prediction,
    });
  } catch (error) {
    console.error("Get prediction error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch prediction",
      error: error.message,
    });
  }
};

module.exports = {
  predictHeartDiseaseController,
  getMyPredictions,
  getPrediction,
};
