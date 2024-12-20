"use client";
import { useState } from 'react';
import { FaFileExcel, FaPlusCircle, FaTimesCircle } from 'react-icons/fa';

type Product = {
  id: number;
  productCode: string;
  productName: string;
  productUnit: string;
  importDate: string;
  quantityImported: number;
  exportDate: string;
  remainingQuantity: number;
  notes: string;
};

type Products = Record<'kitchen' | 'bar', Product[]>;

const initialProductState = (): Product => ({
  id: 0, // Temporary ID, you'll want to handle this based on your logic
  productCode: '',
  productName: '',
  productUnit: 'kg',
  importDate: '',
  quantityImported: 0,
  exportDate: '',
  remainingQuantity: 0,
  notes: '',
});

const WarehouseTable = () => {
  const [products, setProducts] = useState<Products>({
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
    ],
  });

  const [selectedInventory, setSelectedInventory] = useState<'kitchen' | 'bar'>('kitchen');
  const [newProduct, setNewProduct] = useState<Product>(initialProductState());
  const [isAdding, setIsAdding] = useState(false);

  

  const handleAddProduct = () => {
    if (!newProduct.productCode || !newProduct.productName) {
      alert("Product Code and Product Name are required.");
      return;
    }

    setProducts((prevProducts) => ({
      ...prevProducts,
      [selectedInventory]: [
        ...prevProducts[selectedInventory],
      ],
    }));    
    
    setNewProduct(initialProductState());
    setIsAdding(false);
    scrollToBottom(); 
};


  const handleCancel = () => {
    setNewProduct(initialProductState());
    setIsAdding(false);
  };

  const handleUnitChange = (id: number, value: string) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [selectedInventory]: prevProducts[selectedInventory].map((product) =>
        product.id === id ? { ...product, productUnit: value } : product
      ),
    }));
  };

  const scrollToBottom = () => {
    const table = document.getElementById('product-table');
    if (table) {
      table.scrollTop = table.scrollHeight; // Scroll to the bottom of the table
    }
  };


  return (
    <div className="p-5">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <select
            id="inventory-select"
            value={selectedInventory}
            onChange={(e) => setSelectedInventory(e.target.value as 'kitchen' | 'bar')}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
          >
            <option value="kitchen">Kitchen</option>
            <option value="bar">Bar</option>
          </select>

          {isAdding ? (
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 active:bg-red-700 transition duration-200 flex items-center shadow-md active:scale-95 focus:outline-none"
            >
              <FaTimesCircle size={16} className="mr-2" />
              Cancel
            </button>
          ) : (
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
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 active:bg-green-700 transition duration-200 flex items-center shadow-md active:scale-95 focus:outline-none"
        >
          <FaFileExcel size={20} className="mr-2" />
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto" id="product-table">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">
          <thead className="bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-2 border-b">No.</th>
              <th className="py-3 px-2 border-b">ID</th>
              <th className="py-3 px-2 border-b">Name</th>
              <th className="py-3 px-2 border-b">Unit</th>
              <th className="py-3 px-2 border-b">Import Date</th>
              <th className="py-3 px-2 border-b">Quantity Imported</th>
              <th className="py-3 px-2 border-b">Export Date</th>
              <th className="py-3 px-2 border-b">Remaining Quantity</th>
              <th className="py-3 px-2 border-b">Notes</th>
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
                    placeholder="ID"
                    className="w-12 border border-gray-300 p-2 sm:p-1 md:p-2 lg:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="text"
                    value={newProduct.productName}
                    onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                    placeholder="Name"
                    className="w-24 border border-gray-300 p-2 sm:p-1 md:p-2 lg:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <select
                    value={newProduct.productUnit}
                    onChange={(e) => setNewProduct({ ...newProduct, productUnit: e.target.value })}
                    className="w-20 border border-gray-300 p-2 sm:p-1 md:p-2 lg:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
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
                    className="w-40 border border-gray-300 p-2 sm:p-1 md:p-2 lg:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="number"
                    value={newProduct.quantityImported}
                    onChange={(e) => setNewProduct({ ...newProduct, quantityImported: Number(e.target.value) })}
                    className="w-20 border border-gray-300 p-2 sm:p-1 md:p-2 lg:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="date"
                    value={newProduct.exportDate}
                    onChange={(e) => setNewProduct({ ...newProduct, exportDate: e.target.value })}
                    className="w-40 border border-gray-300 p-2 sm:p-1 md:p-2 lg:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="number"
                    value={newProduct.remainingQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, remainingQuantity: Number(e.target.value) })}
                    className="w-20 border border-gray-300 p-2 sm:p-1 md:p-2 lg:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
                <td className="py-3 px-2 border-b">
                  <input
                    type="text"
                    value={newProduct.notes}
                    onChange={(e) => setNewProduct({ ...newProduct, notes: e.target.value })}
                    placeholder="Notes"
                    className="w-48 border border-gray-300 p-2 sm:p-1 md:p-2 lg:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 active:bg-green-700 transition duration-200 flex items-center shadow-md active:scale-95 focus:outline-none"
          >
            Add Product
          </button>
        </div>
      )}
    </div>
  );
};

export default WarehouseTable;
