"use client";
import '../styles/global.css';
import '../styles/mobile.css';
import React, { useState } from 'react';
import { FaPlusCircle, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import Modal from './Modal'; // Ensure to import your Modal component

const AdminTable = () => {
  const initialData = [
    { no: 1, store: "Store 1", username: "user1", password: "pass1password", role: "Admin" },
    { no: 2, store: "Store 2", username: "user2", password: "pass2", role: "User" },
    { no: 3, store: "Store 3", username: "user3", password: "pass3", role: "Manager" },
  ];

  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [newEntry, setNewEntry] = useState({ username: '', password: '', store: 'Store 1', role: 'User' });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = data.filter(item =>
    item.store.toLowerCase().includes(filter.toLowerCase()) ||
    item.username.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreate = () => {
    setIsModalOpen(true); // Open the modal
  };

  const togglePasswordVisibility = (no) => {
    setPasswordVisibility(prevState => ({
      ...prevState,
      [no]: !prevState[no]  // Toggle the visibility of the password for the row
    }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prevEntry => ({
      ...prevEntry,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newData = {
      no: data.length + 1,
      ...newEntry // Spread the new entry data
    };
    setData([...data, newData]); // Update the data state with the new entry
    setNewEntry({ username: '', password: '', store: 'Store 1', role: 'User' }); // Reset form
    handleModalClose(); // Close the modal
  };

  return (
    <div className="p-6">
      {/* Create and Filter Buttons */}
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
          {/* Create Button */}
          <button 
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={handleCreate}
          >
            <FaPlusCircle className="mr-2" /> Create
          </button>

          {/* Filter Button (Currently a placeholder) */}
          <button 
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={handleFilterChange}
          >
            <TbAdjustmentsHorizontal className="mr-2" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-300">
            <th className="text-left text-sm font-semibold text-gray-700 py-2 px-4">No.</th>
            <th className="text-left text-sm font-semibold text-gray-700 py-2 px-4">Store</th>
            <th className="text-left text-sm font-semibold text-gray-700 py-2 px-4">Username</th>
            <th className="text-left text-sm font-semibold text-gray-700 py-2 px-4">Password</th>
            <th className="text-left text-sm font-semibold text-gray-700 py-2 px-4">Role</th>
            <th className="text-left text-sm font-semibold text-gray-700 py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 border">{item.no}</td>
              <td className="px-4 py-2 border">{item.store}</td>
              <td className="px-4 py-2 border">{item.username}</td>
              {/* Password Box */}
              <td className="px-4 py-2 border relative min-w-[60px] max-w-[100px]">
                <div className="relative flex items-center">
                  <span
                    className="truncate"
                    style={{
                      display: 'inline-block',
                      maxWidth: 'calc(100% - 2.5rem)', // Adjust for the button's width
                      minWidth: '20ch', // Minimum width to accommodate 20 characters
                      overflow: 'hidden', // Hide overflow text
                      whiteSpace: 'nowrap', // Prevent line breaks
                    }}
                    title={passwordVisibility[item.no] ? item.password : '*****'} // Tooltip for full password visibility
                  >
                    {passwordVisibility[item.no] ? item.password : '*****'}
                  </span>
                  <button 
                    onClick={() => togglePasswordVisibility(item.no)} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 transition hover:bg-gray-200 rounded-full" 
                    aria-label="Toggle password visibility" // Accessibility improvement
                  >
                    {passwordVisibility[item.no] ? (
                      <FaEyeSlash className="text-gray-700" />
                    ) : (
                      <FaEye className="text-gray-700" />
                    )}
                  </button>
                </div>
              </td>
              <td className="px-4 py-2 border">{item.role}</td>
              {/* Actions */}
              <td className="px-4 py-2 border flex justify-center items-center">
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" aria-label="Edit">
                  <FaEdit />
                </button>
                <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition ml-2" aria-label="Delete">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding New Entry */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSubmit={handleFormSubmit} 
        handleInputChange={handleInputChange}
        newEntry={newEntry} // Pass the new entry state to the Modal
      />
    </div>
  );
};

export default AdminTable;
