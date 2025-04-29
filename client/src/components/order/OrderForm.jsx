import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    customerName: '',
    medicineName: '',
    batchNo: '',
    quantity: '',
    orderDate: '',
    status: '',
    totalAmount: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch data for editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/orders/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            ...data,
            orderDate: data.orderDate ? data.orderDate.slice(0, 10) : ''
          });
        })
        .catch(err => console.error('Failed to fetch order:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `http://localhost:5000/api/orders/${id}`
        : `http://localhost:5000/api/orders`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        navigate('/ordermanagement');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Failed to submit order:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{id ? 'Edit Order' : 'Create New Order'}</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', display: 'grid', gap: '10px' }}>
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={formData.orderId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          value={formData.medicineName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="batchNo"
          placeholder="Batch No"
          value={formData.batchNo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="orderDate"
          placeholder="Order Date"
          value={formData.orderDate}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Status --</option>
          <option value="Delivered">Delivered</option>
          <option value="Undelivered">Undelivered</option>
        </select>
        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={formData.totalAmount}
          onChange={handleChange}
          required
        />
        <button type="submit">{id ? 'Update Order' : 'Create Order'}</button>
      </form>
    </div>
  );
};

export default OrderForm;
