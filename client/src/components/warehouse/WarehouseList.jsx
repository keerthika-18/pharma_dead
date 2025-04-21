import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/warehouse');
      setWarehouses(res.data);
    } catch (err) {
      console.error('Error fetching warehouses:', err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Warehouse Inventory</h2>
      <div className="overflow-auto">
        <table className="table-auto w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Warehouse ID</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Medicine Name</th>
              <th className="border px-4 py-2">Batch No</th>
              <th className="border px-4 py-2">Stock Qty</th>
              <th className="border px-4 py-2">Received Date</th>
              <th className="border px-4 py-2">Expiry Date</th>
              <th className="border px-4 py-2">Expiry Risk</th>
              <th className="border px-4 py-2">Supplier Name</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((wh) => (
              <tr key={wh._id}>
                <td className="border px-4 py-2">{wh.warehouseId}</td>
                <td className="border px-4 py-2">{wh.location}</td>
                <td className="border px-4 py-2">{wh.medicineName}</td>
                <td className="border px-4 py-2">{wh.batchNo}</td>
                <td className="border px-4 py-2">{wh.stockQuantity}</td>
                <td className="border px-4 py-2">{wh.receivedDate?.substring(0, 10)}</td>
                <td className="border px-4 py-2">{wh.expiryDate?.substring(0, 10)}</td>
                <td className="border px-4 py-2">{wh.expiryRisk}</td>
                <td className="border px-4 py-2">{wh.supplierName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseList;
