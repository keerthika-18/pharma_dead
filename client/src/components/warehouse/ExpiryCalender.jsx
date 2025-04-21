import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './ExpiryCalender.css'; // Optional: for custom styling

const ExpiryCalender = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expiryData, setExpiryData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/warehouse');
        setExpiryData(res.data);
      } catch (error) {
        console.error('Error fetching expiry data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selected = selectedDate.toISOString().split('T')[0];
    const filteredList = expiryData.filter(
      (item) => item.expiryDate?.split('T')[0] === selected
    );
    setFiltered(filteredList);
  }, [selectedDate, expiryData]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const isExpiring = expiryData.some(
        (item) => item.expiryDate?.split('T')[0] === dateString
      );
      return isExpiring ? 'expiring-day' : null;
    }
  };

  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      <h3 className="mt-3">Expiring on: {selectedDate.toDateString()}</h3>
      {filtered.length > 0 ? (
        <ul>
          {filtered.map((item, index) => (
            <li key={index}>
              <strong>{item.medicineName}</strong> (Batch: {item.batchNo}) — Supplier: {item.supplierName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No medicines expiring on this date.</p>
      )}
    </div>
  );
};

export default ExpiryCalender;
