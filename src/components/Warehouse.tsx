"use client";
import { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';

const WarehouseTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'A',
      unit: 'kg',
      dateReceived: '2023-09-21',
      quantityReceived: 100,
      dateIssued: '2023-09-28',
      quantityIssued: 50,
      quantityInStock: 50,
      notes: 'ád',
    },
    {
      id: 2,
      name: 'A',
      unit: 'kg',
      dateReceived: '2023-09-21',
      quantityReceived: 122,
      dateIssued: '2023-09-28',
      quantityIssued: 50,
      quantityInStock: 60,
      notes: 'ád',
    },
    // More products...
  ]);

  const [selectedCafe, setSelectedCafe] = useState('cafe1');

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-5">
      <div className="mb-4 flex justify-between items-center">
        {/* Dropdown for Cafes */}
        <div>
          <label className="mr-2 font-semibold text-gray-700">Select Cafe:</label>
          <select
            value={selectedCafe}
            onChange={(e) => setSelectedCafe(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="cafe1">Cafe 1</option>
            <option value="cafe2">Cafe 2</option>
            <option value="cafe3">Cafe 3</option>
          </select>
        </div>
        
        {/* Export Excel Button */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 flex items-center shadow-lg"
        >
          <FaFileExcel size={24} />
          <span className="ml-2">Export to Excel</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
              <th className="py-3 px-6">No.</th>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Unit</th>
              <th className="py-3 px-6">Date Received</th>
              <th className="py-3 px-6">Quantity Received</th>
              <th className="py-3 px-6">Date Issued</th>
              <th className="py-3 px-6">Quantity Issued</th>
              <th className="py-3 px-6">Quantity in Stock</th>
              <th className="py-3 px-6">Notes</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-100 transition duration-150">
                <td className="py-4 px-6 border-t">{index + 1}</td>
                <td className="py-4 px-6 border-t">{product.id}</td>
                <td className="py-4 px-6 border-t">{product.name}</td>
                <td className="py-4 px-6 border-t">
                  <select
                    value={product.unit}
                    onChange={(e) =>
                      setProducts((prevProducts) =>
                        prevProducts.map((p) =>
                          p.id === product.id
                            ? { ...p, unit: e.target.value }
                            : p
                        )
                      )
                    }
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lit">lit</option>
                    <option value="can">can</option>
                    <option value="box">box</option>
                    <option value="pack">pack</option>
                  </select>
                </td>
                <td className="py-4 px-6 border-t">{formatDate(product.dateReceived)}</td>
                <td className="py-4 px-6 border-t">{product.quantityReceived}</td>
                <td className="py-4 px-6 border-t">{formatDate(product.dateIssued)}</td>
                <td className="py-4 px-6 border-t">{product.quantityIssued}</td>
                <td className="py-4 px-6 border-t">{product.quantityInStock}</td>
                <td className="py-4 px-6 border-t">{product.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseTable;
