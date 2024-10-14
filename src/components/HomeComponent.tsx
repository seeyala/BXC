"use client";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import {
  FaBars, FaUserCircle, FaSignOutAlt,
  FaClipboard, FaChevronDown, FaTimes,FaCoffee,
} from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import AdminTable from './AdminTable';
import MenuItem from './MenuItem';
import Warehouse from './Warehouse';
import bxcLogo from '../app/images/bxc.png';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>(""); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const menuItems = [
    { icon: <FaUserCircle size={30} />, label: "User", subItems: [] },
    { icon: <MdOutlineRestaurantMenu size={30} />, label: "Menu", subItems: [] },
    { icon: <AiOutlineStock size={30} />, label: "Revenue", subItems: [] },
    { icon: <FaClipboard size={30} />, label: "Warehouse", subItems: [] },
  ];

  const handleMenuClick = (label: SetStateAction<string>) => {
    setActiveMenu(label); 
    setIsMenuOpen(true); 
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Menu */}
      <nav
        className={`bg-gradient-to-b from-purple-700 to-blue-700 text-white w-65 min-h-screen ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transform transition-transform duration-300 ease-in-out fixed top-0 left-0 z-30 lg:translate-x-0 lg:static lg:h-auto flex flex-col`}
      >
        <div className="p-5 flex-grow relative">
          <div className="flex items-center justify-center mb-5">
            <Image
              src={bxcLogo}
              alt="Logo"
              width={250}
              height={250}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-5 lg:hidden"
            aria-label="Close menu"
          >
            <FaTimes className="text-white text-2xl" />
          </button>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => handleMenuClick(item.label)}
                  className={`flex flex-col items-center justify-center w-full text-center p-4 rounded transition-transform duration-200 text-lg bg-transparent hover:bg-blue-600 ${
                    activeMenu === item.label ? 'bg-purple-700' : ''
                  } active:translate-y-1 active:bg-purple-800`}
                  aria-haspopup={item.subItems.length > 0}
                  aria-expanded={item.subItems.length > 0}
                >
                  {item.icon}
                  <span className="mt-2">{item.label}</span>
                  {item.subItems.length > 0 && <FaChevronDown className="ml-auto" />}
                </button>
                {item.subItems.length > 0 && (
                  <ul className="ml-6 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <button className="text-sm hover:text-gray-300 transition-colors duration-200">
                          {subItem}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Profile and Logout */}
        <div className="p-1 mt-2 ml-6">
          <div className="flex items-center justify-between w-full">
            <button
              onClick={toggleProfile}
              className="flex items-center focus:outline-none"
              aria-label="Open user menu"
              aria-haspopup="true"
              aria-expanded={isProfileOpen}
            >
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="User"
                width={50}
                height={50}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="block px-4 py-2 text text-white">User</span>
            </button>
            <a href="#" className="block px-4 py-2 text text-white ml-4">
              <FaSignOutAlt className="inline-block mr-2" />
            </a>
          </div>
        </div>
      </nav>
      {/*Toggle Menu */}
      <div className="md:hidden ml-auto">
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-700 rounded-md outline-none"
                  aria-label="Toggle menu"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 hover:border-gray-600 transition-colors duration-200">
                    <FaBars size={24} />
                  </div>

                </button>
        </div>
        <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="p-4 w-full text-left">
          <h1 className="text-5xl font-bold text-purple-600 tracking-wider underline decoration-dotted flex items-center">Welcome to BXC 
          <FaCoffee className="ml-4 text-7xl text-brown-600" />
          </h1>
        </header>

        {/* User */}
        <div className="">
          {activeMenu === "User" && <AdminTable />} 
        </div>

         {/* Menu */}
         <div className="">
          {activeMenu === "Menu" && <MenuItem />} 
        </div>

        {/* Warehouse */}
        <div className="">
          {activeMenu === "Warehouse" && <Warehouse />} 
        </div>
      </div>
    </div>
  );
};

export default Home;
