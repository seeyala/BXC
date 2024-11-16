import React, { ChangeEvent, FormEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  newItem: {
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
  };
}

const MenuItemModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, handleInputChange, newItem }) => {
  if (!isOpen) return null;

  return (
    // Modal background covers the entire viewport
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Main modal content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Add New Menu Item</h2>
        <form onSubmit={onSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="name">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md p-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter item name"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md p-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter item description"
            />
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md p-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter price"
            />
          </div>

          {/* Category Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md p-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            >
              <option value="Cafe">Cafe</option>
              <option value="Cake">Cake</option>
              <option value="Combo">Combo</option>
            </select>
          </div>

          {/* Image Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="image">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={newItem.image}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md p-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter image URL"
            />
          </div>

          {/* Modal action buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemModal;
