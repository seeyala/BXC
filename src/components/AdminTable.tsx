"use client";
import '../styles/global.css';
import '../styles/mobile.css';
import React, { useState } from 'react';
import { FaPlusCircle, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import Modal from './Modal';

const AdminTable = () => {
  const initialData = [
    { no: 1, store: "Store 1", username: "BXC PINN", password: "pass1password", role: "Admin" },
    { no: 2, store: "Store 2", username: "BXC HauPhoMai", password: "pass2", role: "User" },
    { no: 3, store: "Store 3", username: "BXC NgheuHapThai", password: "pass3", role: "Manager" },
    { no: 4, store: "Store 1", username: "BXC TomHumAlaska", password: "pass1password", role: "Manager" },
    { no: 5, store: "Store 2", username: "BXC CaHapXa", password: "pass2", role: "User" },
    { no: 6, store: "Store 3", username: "Mata", password: "pass3", role: "Admin" },
    { no: 7, store: "Store 1", username: "Hyde", password: "pass3", role: "User" },
    { no: 8, store: "Store 2", username: "BXC CaHapXa", password: "pass8", role: "User" },
    { no: 9, store: "Store 1", username: "BXC TomHumAlaska", password: "pass9", role: "Manager" },
    { no: 10, store: "Store 3", username: "BXC NgheuHapThai", password: "pass10", role: "Manager" },
    { no: 11, store: "Store 2", username: "BXC HauPhoMai", password: "pass11", role: "User" },
    { no: 12, store: "Store 1", username: "BXC PINN", password: "pass12", role: "Admin" },
    { no: 13, store: "Store 3", username: "Mata", password: "pass13", role: "Admin" },
    { no: 14, store: "Store 1", username: "BXC PINN", password: "pass1password", role: "Admin" },
    { no: 15, store: "Store 3", username: "Mata", password: "pass13", role: "Admin" },
    // Add more data as needed
  ];
  type PasswordVisibilityState = {
    [key: number]: boolean;  // Keys are numbers, values are booleans
  };

  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState<PasswordVisibilityState>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ username: '', password: '', store: 'Store 1', role: 'User' });
    
  // Toggle filter dropdown visibility
  const toggleFilterDropdown = () => {
    setFilterVisible(!filterVisible);
  };

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Tính toán dữ liệu hiển thị cho trang hiện tại
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Chuyển sang trang tiếp theo
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Quay lại trang trước
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
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
      setFilterType("");
      setSelectedStore("");
      setSelectedRole("");
    };


  // Tạo modal và thêm hàng mới
  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const togglePasswordVisibility = (no: number) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [no]: !prevState[no]
    }));
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEntry(prevEntry => ({
      ...prevEntry,
      [name]: value
    }));
  };
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = {
      no: data.length > 0 ? data[data.length - 1].no + 1 : 1,
      ...newEntry
    };
    setData([...data, newData]);
    setNewEntry({ username: '', password: '', store: 'Store 1', role: 'User' });
    handleModalClose();
  };

  return (
    <div className="p-4">
      {/* Create and Filter Buttons */}
      <div className="flex space-x-4 mb-2">
        {/* Create and Filter Buttons */}
        <button 
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={handleCreate}
        >
          <FaPlusCircle className="mr-2" /> Create
        </button>
         {/* Filter Button */}
        <div className="relative">
          <button 
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={toggleFilterDropdown}
          >
            <TbAdjustmentsHorizontal className="mr-2" /> Filter
          </button>
          {/* Filter Dropdown */}
          {filterVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <p className="px-4 py-2 font-semibold text-gray-600">Filter by:</p>
  
              <button 
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                onClick={() => setFilterType("username")}
              >
                Username (A-Z)
              </button>
  
              <div className="border-t my-1"></div>
  
              <div className="px-4 py-2 text-sm">
                <span className="font-semibold">Store</span>
                <div className="mt-1 space-y-1">
                  <button 
                    className={`block w-full text-left px-2 py-1 rounded ${selectedStore === "Store 1" ? 'bg-gray-100' : ''} hover:bg-gray-100 transition`} 
                    onClick={() => setSelectedStore("Store 1")}
                  >
                    Store 1
                  </button>
                  <button 
                    className={`block w-full text-left px-2 py-1 rounded ${selectedStore === "Store 2" ? 'bg-gray-100' : ''} hover:bg-gray-100 transition`} 
                    onClick={() => setSelectedStore("Store 2")}
                  >
                    Store 2
                  </button>
                  <button 
                    className={`block w-full text-left px-2 py-1 rounded ${selectedStore === "Store 3" ? 'bg-gray-100' : ''} hover:bg-gray-100 transition`} 
                    onClick={() => setSelectedStore("Store 3")}
                  >
                    Store 3
                  </button>
                </div>
              </div>
  
              <div className="border-t my-1"></div>
  
              <div className="px-4 py-2 text-sm">
                <span className="font-semibold">Role</span>
                <div className="mt-1 space-y-1">
                  <button 
                    className={`block w-full text-left px-2 py-1 rounded ${selectedRole === "Admin" ? 'bg-gray-100' : ''} hover:bg-gray-100 transition`} 
                    onClick={() => setSelectedRole("Admin")}
                  >
                    Admin
                  </button>
                  <button 
                    className={`block w-full text-left px-2 py-1 rounded ${selectedRole === "Manager" ? 'bg-gray-100' : ''} hover:bg-gray-100 transition`} 
                    onClick={() => setSelectedRole("Manager")}
                  >
                    Manager
                  </button>
                  <button 
                    className={`block w-full text-left px-2 py-1 rounded ${selectedRole === "User" ? 'bg-gray-100' : ''} hover:bg-gray-100 transition`} 
                    onClick={() => setSelectedRole("User")}
                  >
                    User
                  </button>
                </div>
              </div>
  
              <div className="border-t my-1"></div>
  
              <div className="px-4 py-2 flex justify-between">
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={applyFilter}
                >
                  Apply
                </button>
                <button 
                  className="text-red-600 hover:underline"
                  onClick={resetFilter}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-center text-sm font-semibold text-gray-700 py-3 px-4 w-12">No.</th>
            <th className="text-center text-sm font-semibold text-gray-700 py-2 px-4">Store</th>
            <th className="text-center text-sm font-semibold text-gray-700 py-2 px-4">Username</th>
            <th className="text-center text-sm font-semibold text-gray-700 py-2 px-4">Password</th>
            <th className="text-center text-sm font-semibold text-gray-700 py-2 px-4">Role</th>
            <th className="text-center text-sm font-semibold text-gray-700 py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-sm text-gray-700 text-left">{item.no}</td>
              <td className="px-4 py-2 text-sm text-gray-700 text-left">{item.store}</td>
              <td className="px-4 py-2 text-sm text-gray-700 text-left">{item.username}</td>
              {/* Password Box */}
              <td className="px-4 py-2 text-sm text-gray-700 text-left relative min-w-[60px] max-w-[100px]">
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
                    title={passwordVisibility[item.no] ? item.password : '***********'}
                  >
                    {passwordVisibility[item.no] ? item.password : '***********'}
                  </span>
                  <button 
                    onClick={() => togglePasswordVisibility(item.no)} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition focus:outline-none" 
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
              <td className="px-4 py-2 text-sm text-gray-700 text-left">{item.role}</td>
              {/* Actions */}
              <td className="px-4 py-2 flex justify-center items-center space-x-2">
                <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition focus:outline-none">
                  <FaEdit />
                </button>
                <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition focus:outline-none">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button 
          className={`px-4 py-2 rounded transition ${
            currentPage === 1 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        
        <button 
          className={`px-4 py-2 rounded transition ${
            currentPage >= Math.ceil(filteredData.length / rowsPerPage) 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(filteredData.length / rowsPerPage)}
        >
          Next Page
        </button>
      </div>

      {/* Modal for Adding New Entry */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleFormSubmit} handleInputChange={handleInputChange}  newEntry={newEntry} />
    </div>
  );
};

export default AdminTable;
