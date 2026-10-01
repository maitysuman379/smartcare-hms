const { predictHeartDisease } = require("./services/mlService");

const patientData = {
  age: 55,
  sex: 1,
  cp: 2,
  trestbps: 140,
  chol: 250,
  fbs: 0,
  restecg: 1,
  thalach: 150,
  exang: 0,
  oldpeak: 1.0,
  slope: 2,
  ca: 0,
  thal: 3,
};

const testMlConnection = async () => {
  try {
    const result = await predictHeartDisease(patientData);

    console.log("===== ML API RESPONSE =====");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Test failed:", error.message);
  }
};

testMlConnection();
