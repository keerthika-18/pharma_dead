// server/controllers/expiryPredictionController.js

const axios = require('axios');

exports.predictExpiryRisk = async (req, res) => {
  try {
    const flaskApiUrl = 'http://localhost:5001/api/expiry/predict';

    const flaskResponse = await axios.post(flaskApiUrl, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Flask response:', flaskResponse.data); // Add this

    res.status(200).json({ riskLevel: flaskResponse.data.expiryRisk }); // Fix here
  } catch (error) {
    console.error('Error calling Flask ML API:', error.message);
    console.error('Full error:', error); // Add this for details
    res.status(500).json({ error: 'Failed to get risk prediction from ML API' });
  }
};
