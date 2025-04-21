

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WarehouseForm.css'; // Import the separate CSS file

const WarehouseForm = () => {
  const [formData, setFormData] = useState({
    warehouseId: '',
    location: '',
    medicineName: '',
    batchNo: '',
    stockQuantity: '',
    receivedDate: '',
    expiryDate: '',
    expiryRisk: 'Low',
    supplierName: '',
  });

  // Auto-generate warehouseId like WH001
  useEffect(() => {
    const generateId = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/warehouse');
        const count = res.data.length + 1;
        const newId = `WH${String(count).padStart(3, '0')}`;
        setFormData((prev) => ({ ...prev, warehouseId: newId }));
      } catch (err) {
        console.error('Error generating warehouseId:', err);
      }
    };
    generateId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'stockQuantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/warehouse', formData);
      alert('Warehouse data added successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Error adding warehouse data');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Add Warehouse Record</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Warehouse ID</label>
          <input type="text" name="warehouseId" value={formData.warehouseId} disabled />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Medicine Name</label>
          <input type="text" name="medicineName" value={formData.medicineName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Batch Number</label>
          <input type="text" name="batchNo" value={formData.batchNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Stock Quantity</label>
          <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Received Date</label>
          <input type="date" name="receivedDate" value={formData.receivedDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Expiry Risk</label>
          <select name="expiryRisk" value={formData.expiryRisk} onChange={handleChange} required>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Supplier Name</label>
          <input type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} required />
        </div>
      </div>
      <button type="submit" className="submit-btn">Add Record</button>
    </form>
  );
};

export default WarehouseForm;
