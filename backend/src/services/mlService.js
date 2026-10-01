const axios = require("axios");

const ML_API_URL = "http://127.0.0.1:5001";

const predictHeartDisease = async (patientData) => {
  try {
    const response = await axios.post(
      `${ML_API_URL}/predict/heart`,
      patientData,
    );

    return response.data;
  } catch (error) {
    console.error("ML API Error:", error.response?.data || error.message);

    throw new Error("Heart disease ML prediction failed");
  }
};

module.exports = {
  predictHeartDisease,
};
