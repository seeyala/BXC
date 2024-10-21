"use client";
import { useState } from 'react';
import { FaFileExcel, FaPlusCircle } from 'react-icons/fa';

const WarehouseTable = () => {
  const [products, setProducts] = useState({
    kitchen: [
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
      // More kitchen products...
    ],
    bar: [
      {
        id: 1,
        productCode: 'B001',
        productName: 'Product A',
        productUnit: 'bottle',
        importDate: '2024-10-10',
        quantityImported: 50,
        exportDate: '2024-10-18',
        remainingQuantity: 30,
        notes: 'Chilled storage',
      },
      {
        id: 2,
        productCode: 'B002',
        productName: 'Product B',
        productUnit: 'can',
        importDate: '2024-10-12',
        quantityImported: 100,
        exportDate: '2024-10-15',
        remainingQuantity: 70,
        notes: 'Must be shaken before serving',
      },
      // More bar products...
    ],
  });

  const [selectedInventory, setSelectedInventory] = useState('kitchen');
  const [newProduct, setNewProduct] = useState(initialProductState());
  const [isAdding, setIsAdding] = useState(false);

  function initialProductState() {
    return {
      productCode: '',
      productName: '',
      productUnit: 'kg',
      importDate: '',
      quantityImported: '',
      exportDate: '',
      remainingQuantity: '',
      notes: '',
    };
  }

  const handleAddProduct = () => {
    // Simple validation
    if (!newProduct.productCode || !newProduct.productName) {
      alert("Product Code and Product Name are required.");
      return;
    }

    setProducts((prevProducts) => ({
      ...prevProducts,
      [selectedInventory]: [
        ...prevProducts[selectedInventory],
        { id: prevProducts[selectedInventory].length + 1, ...newProduct },
      ],
    }));
    setNewProduct(initialProductState());
    setIsAdding(false);
  };

  const handleCancel = () => {
    setNewProduct(initialProductState());
    setIsAdding(false);
  };

  const handleUnitChange = (id, value) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [selectedInventory]: prevProducts[selectedInventory].map((product) =>
        product.id === id ? { ...product, productUnit: value } : product
      ),
    }));
  };

  return (
    <div className="p-5">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <select
            id="inventory-select"
            value={selectedInventory}
            onChange={(e) => setSelectedInventory(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
          >
            <option value="kitchen">Kitchen</option>
            <option value="bar">Bar</option>
          </select>

          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 active:bg-green-700 transition duration-200 flex items-center shadow-md active:scale-95 focus:outline-none"
            >
              <FaPlusCircle size={16} className="mr-2" />
              Add
            </button>
          )}
        </div>

        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 active:bg-gray-900 transition duration-200 flex items-center shadow-md active:scale-95 focus:outline-none"
        >
          <FaFileExcel size={20} className="mr-2" />
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-2 border-b" style={{ width: '50px' }}>No.</th>
              <th className="py-3 px-2 border-b" style={{ width: '100px' }}>ID</th>
              <th className="py-3 px-2 border-b" style={{ width: '200px' }}>Name</th>
              <th className="py-3 px-2 border-b" style={{ width: '100px' }}>Unit</th>
              <th className="py-3 px-2 border-b" style={{ width: '100px' }}>Import Date</th>
              <th className="py-3 px-2 border-b" style={{ width: '150px' }}>Quantity Imported</th>
              <th className="py-3 px-2 border-b" style={{ width: '100px' }}>Export Date</th>
              <th className="py-3 px-2 border-b" style={{ width: '150px' }}>Remaining Quantity</th>
              <th className="py-3 px-2 border-b" style={{ width: '200px' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {products[selectedInventory].map((product, index) => (
              <tr
                key={product.id}
                className={`transition duration-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="py-3 px-2 text-gray-700 border-b">{index + 1}</td>
                <td className="py-3 px-2 text-gray-700 border-b">{product.productCode}</td>
                <td className="py-3 px-2 text-gray-700 border-b">{product.productName}</td>
                <td className="py-3 px-2 border-b">
                  <select
                    value={product.productUnit}
                    onChange={(e) => handleUnitChange(product.id, e.target.value)}
                    className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  >
                    {['kg', 'g', 'lit', 'can', 'box', 'pack', 'bottle'].map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-2 text-gray-700 border-b">{product.importDate}</td>
                <td className="py-3 px-2 text-gray-700 border-b">{product.quantityImported}</td>
                <td className="py-3 px-2 text-gray-700 border-b">{product.exportDate}</td>
                <td className="py-3 px-2 text-gray-700 border-b">{product.remainingQuantity}</td>
                <td className="py-3 px-2 text-gray-700 border-b">{product.notes}</td>
              </tr>
            ))}
            {isAdding && (
              <tr>
                <td className="py-3 px-2 text-gray-700 border-b">{products[selectedInventory].length + 1}</td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="text"
                    value={newProduct.productCode}
                    onChange={(e) => setNewProduct({ ...newProduct, productCode: e.target.value })}
                    placeholder="New ID"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="text"
                    value={newProduct.productName}
                    onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                    placeholder="New Name"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <select
                    value={newProduct.productUnit}
                    onChange={(e) => setNewProduct({ ...newProduct, productUnit: e.target.value })}
                    className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  >
                    {['kg', 'g', 'lit', 'can', 'box', 'pack', 'bottle'].map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="date"
                    value={newProduct.importDate}
                    onChange={(e) => setNewProduct({ ...newProduct, importDate: e.target.value })}
                    className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="number"
                    value={newProduct.quantityImported}
                    onChange={(e) => setNewProduct({ ...newProduct, quantityImported: e.target.value })}
                    placeholder="Quantity"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="date"
                    value={newProduct.exportDate}
                    onChange={(e) => setNewProduct({ ...newProduct, exportDate: e.target.value })}
                    className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="number"
                    value={newProduct.remainingQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, remainingQuantity: e.target.value })}
                    placeholder="Remaining"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="text"
                    value={newProduct.notes}
                    onChange={(e) => setNewProduct({ ...newProduct, notes: e.target.value })}
                    placeholder="Notes"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition duration-200 mr-2"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 active:bg-red-700 transition duration-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default WarehouseTable;
