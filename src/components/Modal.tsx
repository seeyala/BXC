import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">New Entry</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="store">
              Store
            </label>
            <select id="store" className="border border-gray-300 rounded-md p-2 w-full">
              <option value="Store 1">Store 1</option>
              <option value="Store 2">Store 2</option>
              <option value="Store 3">Store 3</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="role">
              Role
            </label>
            <select id="role" className="border border-gray-300 rounded-md p-2 w-full">
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" className="mr-2 bg-gray-300 text-gray-700 rounded px-4 py-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
