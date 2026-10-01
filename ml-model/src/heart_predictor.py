import pandas as pd
import joblib


# ==========================================
# Load saved model components
# ==========================================

model = joblib.load("models/heart_model.pkl")
imputer = joblib.load("models/heart_imputer.pkl")
scaler = joblib.load("models/heart_scaler.pkl")


# ==========================================
# Prediction function
# ==========================================

def predict_heart_disease(patient_data):

    # Convert patient input into DataFrame
    patient = pd.DataFrame([patient_data])

    # Handle missing values
    patient = pd.DataFrame(
        imputer.transform(patient),
        columns=patient.columns
    )

    # Scale input
    patient_scaled = scaler.transform(patient)

    # Prediction
    prediction = model.predict(patient_scaled)[0]

    # Probability
    probability = model.predict_proba(patient_scaled)[0]

    # Result
    if prediction == 1:
        result = "Heart Disease"
    else:
        result = "No Heart Disease"

    return {
        "prediction": int(prediction),
        "result": result,
        "no_disease_probability": round(
            float(probability[0]) * 100, 2
        ),
        "disease_probability": round(
            float(probability[1]) * 100, 2
        )
    }