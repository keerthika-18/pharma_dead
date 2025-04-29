import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      fetchOrders(); // Refresh list
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/ordermanagement/edit/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Medicine</th>
              <th>Batch No</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>{order.medicineName}</td>
                <td>{order.batchNo}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <button onClick={() => handleEdit(order._id)} style={{ marginRight: '6px' }}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
