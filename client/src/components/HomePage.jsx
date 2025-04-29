import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import warehouse from "../assets/warehouse-inventory-check-concept-illustration_114360-30596.jpg";
const HomePage = () => {
  return (
    <div className="homepage-wrapper">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo">PharmaStock</div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/barcode">Scan</Link>
          <Link to="/ordermanagement">Orders</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="homepage-hero fade-in">
        <h1>Welcome to Pharma Stock Manager</h1>
        <p>Manage your stock, predict expiry risk, and streamline pharmacy operations.</p>
        <div className="hero-buttons">
          <Link to="/dashboard" className="hero-button">Explore Dashboard</Link>
          <Link to="/reports" className="hero-button">View Reports</Link>
        </div>
      </header>

     {/* About + Image Section */}
<section className="about-image-section fade-in">
  <div className="about-text">
    <h2>About Us</h2>
    <p>
      PharmaStock is dedicated to revolutionizing inventory management for the healthcare sector.
      We help pharmacies, warehouses, and distributors manage medicines, predict expiry risks using machine learning,
      and reduce dead stock. Our solution ensures timely distribution, zero wastage, and smarter stock control.
    </p>
  </div>
  <div className="about-image">
    <img src={warehouse} alt="Warehouse" className="warehouse-image" />
  </div>
</section>

         
      {/* Footer Section */}
      <footer className="homepage-footer fade-in delay2">
        <h3>Contact Us</h3>
        <p>Email: support@pharmastock.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Location: Chennai, India</p>
        <p>© 2025 PharmaStock Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
