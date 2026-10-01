const db = require("../config/db");

const createPrediction = async (predictionData) => {
  const {
    patient_id,
    disease_type,
    risk_percentage,
    prediction_result,
    model_name,
    model_version,
    confidence_score,
    input_data,
  } = predictionData;

  const sql = `
        INSERT INTO ai_predictions (
            patient_id,
            disease_type,
            risk_percentage,
            prediction_result,
            model_name,
            model_version,
            confidence_score,
            input_data
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    patient_id,
    disease_type,
    risk_percentage,
    prediction_result,
    model_name,
    model_version,
    confidence_score,
    JSON.stringify(input_data),
  ];

  const [result] = await db.execute(sql, values);

  return {
    id: result.insertId,
    ...predictionData,
  };
};

const getPredictionsByPatient = async (patientId) => {
  const sql = `
        SELECT
            id,
            patient_id,
            disease_type,
            risk_percentage,
            prediction_result,
            model_name,
            model_version,
            confidence_score,
            input_data,
            prediction_date
        FROM ai_predictions
        WHERE patient_id = ?
        ORDER BY prediction_date DESC
    `;

  const [rows] = await db.execute(sql, [patientId]);

  return rows;
};

const getPredictionById = async (predictionId) => {
  const sql = `
        SELECT
            id,
            patient_id,
            disease_type,
            risk_percentage,
            prediction_result,
            model_name,
            model_version,
            confidence_score,
            input_data,
            prediction_date
        FROM ai_predictions
        WHERE id = ?
    `;

  const [rows] = await db.execute(sql, [predictionId]);

  return rows[0] || null;
};

module.exports = {
  createPrediction,
  getPredictionsByPatient,
  getPredictionById,
};
