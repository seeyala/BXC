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
        {/* Dropdown Button for Cafes */}
        <div>
          <label className="mr-2 font-semibold">Select Inventory:</label>
          <select
            value={selectedInventory}
            onChange={(e) => setSelectedInventory(e.target.value)}
            className="border border-gray-300 p-2 rounded "
          >
            <option value="inventory1">Kitchen 1</option>
            <option value="inventory2">Kitchen 2</option>
            <option value="inventory3">Kitchen 3</option>
          </select>
        </div>
        
        {/* Export Excel Button with Icon */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 flex items-center"
        >
          <FaFileExcel size={24} className="" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
              <th className="py-2 px-4 border">No.</th>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Unit</th>
              <th className="py-2 px-4 border">Import Date</th>
              <th className="py-2 px-4 border">Quantity Imported</th>
              <th className="py-2 px-4 border">Export Date</th>
              <th className="py-2 px-4 border">Remaining Quantity</th>
              <th className="py-2 px-4 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-t">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{product.productCode}</td>
                <td className="py-2 px-4 border">{product.productName}</td>
                <td className="py-2 px-4 border">
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
                    className="border border-gray-300 p-2 rounded"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lit">lit</option>
                    <option value="can">can</option>
                    <option value="box">box</option>
                    <option value="pack">pack</option>
                  </select>
                </td>
                <td className="py-2 px-4 border">{product.importDate}</td>
                <td className="py-2 px-4 border">{product.quantityImported}</td>
                <td className="py-2 px-4 border">{product.exportDate}</td>
                <td className="py-2 px-4 border">{product.remainingQuantity}</td>
                <td className="py-2 px-4 border">{product.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseTable;