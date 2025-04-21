import React from 'react';
import WarehouseForm from './WarehouseForm';
import WarehouseList from './WarehouseList';
import ExpiryCalender from './ExpiryCalender';
import './WarehouseDashboard.css'; // Import the plain CSS file

const WarehouseDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Pharma Warehouse Dashboard</h1>

      {/* Warehouse Form */}
      <div className="section-card">
        <WarehouseForm />
      </div>

      {/* Dashboard Grid: List & Calendar side-by-side on large screens */}
      <div className="dashboard-grid">
        {/* Warehouse List */}
        <div className="section-card">
          <WarehouseList />
        </div>

        {/* Expiry Calendar */}
        <div className="section-card">
          <h2 className="calendar-title">Medicine Expiry Calendar</h2>
          <ExpiryCalender />
        </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;
