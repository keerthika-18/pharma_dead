import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Order Details</h2>
      <p>Details for order ID: {id}</p>
    </div>
  );
};

export default OrderDetails;
