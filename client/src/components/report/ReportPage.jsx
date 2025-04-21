import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReportPage.css';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';

const ReportsPage = () => {
  const [annualProfit, setAnnualProfit] = useState(0);
  const [expiredVsSold, setExpiredVsSold] = useState({ expired: 0, sold: 0 });
  const [turnoverData, setTurnoverData] = useState({totalSold: 0,
    averageInventory: 0,
    stockTurnover: 0});
  const [riskInput, setRiskInput] = useState({
    batchNo: '',
    manufactureDate: '',
    expiryDate: '',
    stockAge: ''
  });
  const [riskPrediction, setRiskPrediction] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);
// Pie chart data for expired vs sold
const pieData = [
  { name: 'Expired', value: expiredVsSold.expired },
  { name: 'Sold', value: expiredVsSold.sold }
];

const COLORS = ['#FF8042', '#0088FE']; // For pie chart colors

// Bar chart data for sales vs cost
const barData = [
  {
    name: 'Annual',
    Sales: parseFloat((annualProfit / 0.4).toFixed(2)), // Sales = Profit / 0.4 (from estimated cost 60%)
    Cost: parseFloat(((annualProfit / 0.4) * 0.6).toFixed(2))
  }
];

// Simulated stock turnover trend (can replace later with real data)
const turnoverTrend = [
  { month: 'Jan', turnover: 1.2 },
  { month: 'Feb', turnover: 1.5 },
  { month: 'Mar', turnover: 1.0 },
  { month: 'Apr', turnover: 2.1 },
];

  const fetchReports = async () => {
    try {
      const profitRes = await axios.get('http://localhost:5000/api/reports/annual-profit');
const salesRes = await axios.get('http://localhost:5000/api/reports/expired-vs-sold');
const turnoverRes = await axios.get('http://localhost:5000/api/reports/stock-turnover');
setTurnoverData(turnoverRes.data || []);

      setAnnualProfit(profitRes.data.annualProfit);
      setExpiredVsSold(salesRes.data);
      
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  const handlePredict = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/expiry/predict', riskInput, {
        headers: { 'Content-Type': 'application/json' }
      });
      setRiskPrediction(res.data.riskLevel);
    } catch (err) {
      console.error(err);
      alert('Error predicting expiry risk');
    }
  };

  return (
    <div className="report-container">
      <h1>Reports Dashboard</h1>

      <div className="report-section">
        <h2>Annual Profit</h2>
        <p>₹{annualProfit}</p>
      </div>
      <div className="report-section">
  <h2>Annual Sales vs Cost (Bar Chart)</h2>
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={barData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Sales" fill="#82ca9d" />
      <Bar dataKey="Cost" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
</div>

      <div className="report-section">
        <h2>Expired vs Sold Stock</h2>
        <p><strong>Expired:</strong> {expiredVsSold.expired} units</p>
        <p><strong>Sold:</strong> {expiredVsSold.sold} units</p>
      </div>
      <div className="report-section">
  <h2>Expired vs Sold Pie Chart</h2>
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>

      <div className="report-section">
      <h2>Stock Turnover</h2>
  <p><strong>Total Sold:</strong> {turnoverData.totalSold} units</p>
  <p><strong>Average Inventory:</strong> {turnoverData.averageInventory}</p>
  <p><strong>Stock Turnover:</strong> {turnoverData.stockTurnover}</p>
        {/* <h2>Stock Turnover (Monthly)</h2>
        <ul>
          {turnoverData.map((entry, i) => (
            <li key={i}>{entry.month}: {entry.turnover} units</li>
          ))}
        </ul> */}
      </div>
      <div className="report-section">
  <h2>Stock Turnover Trend (Line Chart)</h2>
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={turnoverTrend}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="turnover" stroke="#ff7300" />
    </LineChart>
  </ResponsiveContainer>
</div>

      <div className="report-section">
        <h2>Expiry Risk Prediction (Logistic Regression)</h2>
        <input type="text" placeholder="Batch No" value={riskInput.batchNo}
               onChange={(e) => setRiskInput({ ...riskInput, batchNo: e.target.value })} />
        <input type="date" value={riskInput.manufactureDate}
               onChange={(e) => setRiskInput({ ...riskInput, manufactureDate: e.target.value })} />
        <input type="date" value={riskInput.expiryDate}
               onChange={(e) => setRiskInput({ ...riskInput, expiryDate: e.target.value })} />
        <input type="number" placeholder="Stock Age in days" value={riskInput.stockAge}
               onChange={(e) => setRiskInput({ ...riskInput, stockAge: e.target.value })} />
        <button onClick={handlePredict}>Predict Risk</button>
        {riskPrediction && <p><strong>Predicted Risk:</strong> {riskPrediction}</p>}
      </div>
    </div>
  );
};

export default ReportsPage;
