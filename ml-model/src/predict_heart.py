from heart_predictor import predict_heart_disease


patient = {
    "age": 55,
    "sex": 1,
    "cp": 2,
    "trestbps": 140,
    "chol": 250,
    "fbs": 0,
    "restecg": 1,
    "thalach": 150,
    "exang": 0,
    "oldpeak": 1.0,
    "slope": 2,
    "ca": 0,
    "thal": 3
}


result = predict_heart_disease(patient)


print("===== HEART DISEASE PREDICTION =====")

print(f"Prediction : {result['result']}")

print(
    f"Probability of No Disease : "
    f"{result['no_disease_probability']:.2f}%"
)

print(
    f"Probability of Disease    : "
    f"{result['disease_probability']:.2f}%"
)