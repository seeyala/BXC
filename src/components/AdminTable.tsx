import React, { useState } from 'react';
// Import các icon như bạn đã có
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
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ username: '', password: '', store: 'Store 1', role: 'User' });

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

  return (
    <div className="p-4">
      {/* Các nút thêm và lọc */}
      <div className="flex space-x-4 mb-2">
        <button 
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={handleCreate}
        >
          <FaPlusCircle className="mr-2" /> Create
        </button>

        <div className="relative">
          <button 
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <TbAdjustmentsHorizontal className="mr-2" /> Filter
          </button>
          {/* Filter Dropdown */}
          {filterVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {/* Filter logic */}
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
              <td className="px-4 py-2 text-sm text-gray-700 text-left">*******</td>
              <td className="px-4 py-2 text-sm text-gray-700 text-left">{item.role}</td>
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
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(filteredData.length / rowsPerPage)}
        >
          Next Page
        </button>
      </div>

      {/* Modal for Adding New Entry */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreate} 
        newEntry={newEntry} 
      />
    </div>
  );
};

export default AdminTable;
