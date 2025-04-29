import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    let url = 'http://localhost:5000/api/orders';
    if (filterStatus) {
      url += `?status=${filterStatus}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('❌ Failed to fetch orders:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      alert(data.message);
      fetchOrders();
    } catch (error) {
      console.error('❌ Failed to delete order:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/ordermanagement/edit/${id}`);
  };

  const handleCreate = () => {
    navigate(`/ordermanagement/new`);
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order Management</h2>

      {/* Search + Filter + Create */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by customer or order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '6px', width: '250px' }}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '6px' }}
        >
          <option value="">All</option>
          <option value="Delivered">Delivered</option>
          <option value="Undelivered">Undelivered</option>
        </select>

        <button onClick={handleCreate} style={{ padding: '6px 12px', backgroundColor: '#28a745', color: '#fff' }}>
          + Create New Order
        </button>
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead style={{ backgroundColor: '#f0f0f0' }}>
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
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
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
                  <button onClick={() => handleEdit(order._id)} style={{ marginRight: '5px' }}>
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
            ))
          ) : (
            <tr>
              <td colSpan="9" align="center">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;