from flask import Flask, request, jsonify

from src.heart_predictor import predict_heart_disease


# ==========================================
# Create Flask application
# ==========================================

app = Flask(__name__)


# ==========================================
# Health Check
# ==========================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "status": "success",
        "message": "SmartCare HMS ML API is running"
    })


# ==========================================
# Heart Disease Prediction
# ==========================================

@app.route("/predict/heart", methods=["POST"])
def predict_heart():

    try:

        # Get JSON data
        data = request.get_json()

        # Check whether data exists
        if not data:
            return jsonify({
                "status": "error",
                "message": "Request body is required"
            }), 400

        # Required features
        required_fields = [
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
            "thal"
        ]

        # Check missing fields
        missing_fields = [
            field
            for field in required_fields
            if field not in data
        ]

        if missing_fields:

            return jsonify({
                "status": "error",
                "message": "Missing required fields",
                "missing_fields": missing_fields
            }), 400

        # Create patient data
        patient_data = {
            field: data[field]
            for field in required_fields
        }

        # Make prediction
        result = predict_heart_disease(patient_data)

        # Return response
        return jsonify({
            "status": "success",
            "disease": "heart_disease",
            "result": result
        })

    except Exception as error:

        return jsonify({
            "status": "error",
            "message": str(error)
        }), 500


# ==========================================
# Start Flask Server
# ==========================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )