import React, { useState } from 'react';
import axios from 'axios';

const ExpiryPredictionDashboard = () => {
  const [formData, setFormData] = useState({
    manufactureDate: '',
    expiryDate: '',
  });

  const [risk, setRisk] = useState(null);

  const calculateStockAge = () => {
    const mDate = new Date(formData.manufactureDate);
    const eDate = new Date(formData.expiryDate);
    const diffInMs = eDate - mDate;
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert ms to days
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockAge = calculateStockAge();

    try {
      const res = await axios.post('http://localhost:5001/api/expiry/predict', {
        stockAge,
      });
      setRisk(res.data.risk);
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };

  return (
    <div className="expiry-dashboard">
      <h2>Expiry Risk Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Manufacture Date:
          <input
            type="date"
            value={formData.manufactureDate}
            onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
            required
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            required
          />
        </label>
        <button type="submit">Predict</button>
      </form>

      {risk && (
        <div className="result">
          <h3>Predicted Risk: <span>{risk}</span></h3>
        </div>
      )}
    </div>
  );
};

export default ExpiryPredictionDashboard;
