"use client";
import { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';

// Utility function to format date in 'MMM-d-yy' format (like Sep-9-24)
const formatDate = (dateString) => {
  const options = { year: '2-digit', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date).replace(/\s/g, '-');
};

const WarehouseTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      productCode: 'P001',
      productName: 'Product 1',
      productUnit: 'kg',
      importDate: '2024-10-14',
      quantityImported: 100,
      exportDate: '2024-10-20',
      remainingQuantity: 40,
      notes: 'Regular shipment',
    },
    {
      id: 2,
      productCode: 'P002',
      productName: 'Product 2',
      productUnit: 'box',
      importDate: '2024-10-13',
      quantityImported: 200,
      exportDate: '2024-10-19',
      remainingQuantity: 150,
      notes: 'Special handling required',
    },
    // More products...
  ]);

  const [selectedInventory, setSelectedInventory] = useState('inventory1');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        {/* Dropdown Button for Inventories */}
        <div>
          <label className="mr-2 font-semibold text-gray-700">Select Inventory:</label>
          <select
            value={selectedInventory}
            onChange={(e) => setSelectedInventory(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            <option value="inventory1">Kitchen</option>
            <option value="inventory2">Bar</option>
          </select>
        </div>
        
        {/* Export Excel Button with Icon */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 flex items-center shadow"
        >
          <FaFileExcel size={20} className="mr-2" />
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-gray-800">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold uppercase tracking-wide text-gray-600">
              <th className="py-3 px-5">No.</th>
              <th className="py-3 px-5">ID</th>
              <th className="py-3 px-5">Name</th>
              <th className="py-3 px-5">Unit</th>
              <th className="py-3 px-5">Import Date</th>
              <th className="py-3 px-5">Quantity Imported</th>
              <th className="py-3 px-5">Export Date</th>
              <th className="py-3 px-5">Remaining Quantity</th>
              <th className="py-3 px-5">Notes</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-5 border-t">{index + 1}</td>
                <td className="py-4 px-5 border-t">{product.productCode}</td>
                <td className="py-4 px-5 border-t">{product.productName}</td>
                <td className="py-4 px-5 border-t">
                  <select
                    value={product.productUnit}
                    onChange={(e) =>
                      setProducts((prevProducts) =>
                        prevProducts.map((p) =>
                          p.id === product.id
                            ? { ...p, productUnit: e.target.value }
                            : p
                        )
                      )
                    }
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lit">lit</option>
                    <option value="can">can</option>
                    <option value="box">box</option>
                    <option value="pack">pack</option>
                  </select>
                </td>
                <td className="py-4 px-5 border-t">{formatDate(product.importDate)}</td>
                <td className="py-4 px-5 border-t">{product.quantityImported}</td>
                <td className="py-4 px-5 border-t">{formatDate(product.exportDate)}</td>
                <td className="py-4 px-5 border-t">{product.remainingQuantity}</td>
                <td className="py-4 px-5 border-t">{product.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseTable;
