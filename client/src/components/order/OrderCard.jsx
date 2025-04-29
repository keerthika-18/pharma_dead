import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
      <h3>{order.name}</h3>
      <p>Status: {order.status}</p>
    </div>
  );
};

export default OrderCard;
