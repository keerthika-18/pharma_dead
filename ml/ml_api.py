from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the saved model and encoder
model = joblib.load("expiry_risk_model.pkl")
encoder = joblib.load("risk_label_encoder.pkl")

@app.route('/api/expiry/predict', methods=['POST'])
def predict_expiry_risk():
    try:
        data = request.get_json()
        stock_age = data.get("stockAge")

        if stock_age is None:
            return jsonify({"error": "Missing stockAge value"}), 400

        # Convert stockAge to float
        stock_age = float(stock_age)

        # Predict risk
        prediction = model.predict(np.array([[stock_age]]))
        risk_label = encoder.inverse_transform(prediction)[0]

        return jsonify({"expiryRisk": risk_label})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
