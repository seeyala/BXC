"use client";
import '../styles/global.css';
import '../styles/mobile.css';
import React, { useState } from 'react';
import { FaPlusCircle, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import Modal from './Modal'; // Ensure to import your Modal component

const AdminTable = () => {
  const initialData = [
    { no: 1, store: "Store 1", username: "A", password: "pass1password", role: "Admin" },
    { no: 2, store: "Store 2", username: "B", password: "pass2", role: "User" },
    { no: 3, store: "Store 3", username: "C", password: "pass3", role: "Manager" },
    { no: 4, store: "Store 1", username: "A", password: "pass1password", role: "Admin" },
    { no: 5, store: "Store 2", username: "B", password: "pass2", role: "User" },
    { no: 6, store: "Store 3", username: "C", password: "pass3", role: "Manager" },
  ];

  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [filterVisible, setFilterVisible] = useState(false); // To toggle filter dropdown visibility
  const [filterType, setFilterType] = useState(""); // Track the selected filter type
  const [selectedStore, setSelectedStore] = useState(""); // For filtering by store
  const [selectedRole, setSelectedRole] = useState(""); // For filtering by role
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ username: '', password: '', store: 'Store 1', role: 'User' });

  // Toggle filter dropdown visibility
  const toggleFilterDropdown = () => {
    setFilterVisible(!filterVisible);
  };

  // Apply filter logic based on the selected filter type and value
  const applyFilter = () => {
    let filtered = [...data];
    if (filterType === "username") {
      filtered.sort((a, b) => a.username.localeCompare(b.username));
    } else if (filterType === "store") {
      filtered = filtered.filter(item => item.store === selectedStore);
    } else if (filterType === "role") {
      filtered = filtered.filter(item => item.role === selectedRole);
    }
    setFilteredData(filtered);
  };

  // Reset filters to original data
  const resetFilter = () => {
    setFilteredData(initialData);
    setFilterType(""); // Clear filter type
    setSelectedStore(""); // Clear selected store
    setSelectedRole(""); // Clear selected role
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const togglePasswordVisibility = (no) => {
    setPasswordVisibility(prevState => ({
      ...prevState,
      [no]: !prevState[no]
    }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
      ...newEntry
    };
    setData([...data, newData]);
    setNewEntry({ username: '', password: '', store: 'Store 1', role: 'User' });
    handleModalClose();
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

          {/* Filter Button */}
          <button 
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={toggleFilterDropdown}
          >
            <TbAdjustmentsHorizontal className="mr-2" /> Filter
          </button>
        </div>
      </div>

      {/* Filter Dropdown */}
      {filterVisible && (
        <div className="bg-gray-200 p-4 rounded shadow-lg mb-4">
          <p className="font-semibold mb-2">Filter by:</p>
          <div className="flex flex-col space-y-2">
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={() => setFilterType("username")}
            >
              Username (A-Z)
            </button>
            <div className="flex flex-col">
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={() => setFilterType("store")}
              >
                Store
              </button>
              {filterType === "store" && (
                <div className="ml-4 mt-2 space-y-1">
                  <button 
                    className={`px-4 py-2 rounded ${selectedStore === "Store 1" ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 transition`} 
                    onClick={() => setSelectedStore("Store 1")}
                  >
                    Store 1
                  </button>
                  <button 
                    className={`px-4 py-2 rounded ${selectedStore === "Store 2" ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 transition`} 
                    onClick={() => setSelectedStore("Store 2")}
                  >
                    Store 2
                  </button>
                  <button 
                    className={`px-4 py-2 rounded ${selectedStore === "Store 3" ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 transition`} 
                    onClick={() => setSelectedStore("Store 3")}
                  >
                    Store 3
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <button 
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                onClick={() => setFilterType("role")}
              >
                Role
              </button>
              {filterType === "role" && (
                <div className="ml-4 mt-2 space-y-1">
                  <button 
                    className={`px-4 py-2 rounded ${selectedRole === "Admin" ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 transition`} 
                    onClick={() => setSelectedRole("Admin")}
                  >
                    Admin
                  </button>
                  <button 
                    className={`px-4 py-2 rounded ${selectedRole === "Manager" ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 transition`} 
                    onClick={() => setSelectedRole("Manager")}
                  >
                    Manager
                  </button>
                  <button 
                    className={`px-4 py-2 rounded ${selectedRole === "User" ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 transition`} 
                    onClick={() => setSelectedRole("User")}
                  >
                    User
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Apply and Reset Filter Buttons */}
          <div className="mt-4">
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
              onClick={applyFilter}
            >
              Apply Filter
            </button>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={resetFilter}
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}

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
                      maxWidth: 'calc(100% - 2.5rem)', 
                      minWidth: '20ch',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                    title={passwordVisibility[item.no] ? item.password : '*****'} 
                  >
                    {passwordVisibility[item.no] ? item.password : '*****'}
                  </span>
                  <button 
                    onClick={() => togglePasswordVisibility(item.no)} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 transition hover:bg-gray-200 rounded-full" 
                    aria-label="Toggle password visibility"
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
        newEntry={newEntry} 
      />
    </div>
  );
};

export default AdminTable;
