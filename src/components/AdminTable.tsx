"use client";
import '../styles/global.css';
import '../styles/mobile.css';
import React from 'react';

const AdminTable = () => {
  const data = [
    { no: 1, store: "Store 1", username: "user1", password: "pass1", role: "Admin" },
    { no: 2, store: "Store 2", username: "user2", password: "pass2", role: "User" },
    { no: 3, store: "Store 3", username: "user3", password: "pass3", role: "Manager" },
  ];

  return (
    <div className="p-6 overflow-x-auto">
      <table className="max-w-full table-auto w-full">
        <thead>
          <tr className="bg-gray-300">
            <th className="text-left text-sm font-semibold text-gray-700 w-[200px]">No.</th>
            <th className="text-left text-sm font-semibold text-gray-700 w-[200px]">Store</th>
            <th className="text-left text-sm font-semibold text-gray-700 w-[200px]">Username</th>
            <th className="text-left text-sm font-semibold text-gray-700 w-[200px]">Password</th>
            <th className="text-left text-sm font-semibold text-gray-700 w-[200px]">Role</th>
            <th className="text-left text-sm font-semibold text-gray-700 w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 border">{item.no}</td>
              <td className="px-4 py-2 border">{item.store}</td>
              <td className="px-4 py-2 border">{item.username}</td>
              <td className="px-4 py-2 border">{item.password}</td>
              <td className="px-4 py-2 border">{item.role}</td>
              <td className="px-4 py-2 border">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600 transition">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
