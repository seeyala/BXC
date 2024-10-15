import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit, handleInputChange, newEntry }) => {
  if (!isOpen) return null;

  return (
    // Modal background covers the entire viewport
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Main modal content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">New Entry</h2>
        <form onSubmit={onSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={newEntry.username}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md p-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={newEntry.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md p-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
            />
          </div>

          {/* Store Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="store">
              Store
            </label>
            <select
              id="store"
              name="store"
              value={newEntry.store}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md p-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            >
              <option value="Store 1">Store 1</option>
              <option value="Store 2">Store 2</option>
              <option value="Store 3">Store 3</option>
            </select>
          </div>

          {/* Role Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={newEntry.role}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md p-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
