"use client";
import { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';

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
    <div className="p-5">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <label htmlFor="inventory-select" className="mr-2 font-semibold text-gray-700">Select Inventory:</label>
          <select
            id="inventory-select"
            value={selectedInventory}
            onChange={(e) => setSelectedInventory(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          >
            <option value="inventory1">Kitchen</option>
            <option value="inventory2">Bar</option>
          </select>
        </div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 active:bg-green-700 transition duration-200 flex items-center shadow-md active:scale-95 focus:outline-none"
              >
                <FaFileExcel size={24} className="mr-1" />
                Export to Excel
              </button>
        </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left text-sm text-gray-700 uppercase">
              <th className="py-3 px-4">No.</th>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Unit</th>
              <th className="py-3 px-4">Import Date</th>
              <th className="py-3 px-4">Quantity Imported</th>
              <th className="py-3 px-4">Export Date</th>
              <th className="py-3 px-4">Remaining Quantity</th>
              <th className="py-3 px-4">Notes</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr 
                key={product.id} 
                className={`transition duration-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                <td className="py-3 px-4 text-gray-700">{product.productCode}</td>
                <td className="py-3 px-4 text-gray-700">{product.productName}</td>
                <td className="py-3 px-4">
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
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lit">lit</option>
                    <option value="can">can</option>
                    <option value="box">box</option>
                    <option value="pack">pack</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-gray-700">{product.importDate}</td>
                <td className="py-3 px-4 text-gray-700">{product.quantityImported}</td>
                <td className="py-3 px-4 text-gray-700">{product.exportDate}</td>
                <td className="py-3 px-4 text-gray-700">{product.remainingQuantity}</td>
                <td className="py-3 px-4 text-gray-700">{product.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseTable;
