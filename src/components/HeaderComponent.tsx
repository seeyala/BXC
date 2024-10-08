"use client";
import '../styles/global.css';
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaBars, FaUser, FaCog, FaSignOutAlt,  FaUserCircle, 
  FaChartBar, FaEnvelope, FaClipboard, FaChevronDown
} from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { MdOutlineRestaurantMenu, MdOutlineClose } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const [navbar, setNavbar] = useState(false);

  const menuItems = [
    { icon: <FaUserCircle />, label: "User", subItems: [] },
    { icon: <MdOutlineRestaurantMenu />, label: "Menu", subItems: [] },
    { icon: <AiOutlineStock />, label: "Revenue", subItems: [] },
    { icon: <FaClipboard />, label: "Warehouse", subItems: [] },
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      const results = ["User", "Menu", "Revenue", "Warehouse"]
        .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
      setAutocompleteResults(results);
    } else {
      setAutocompleteResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Menu */}
      <nav
        className={`bg-[#6f4e37] text-white w-64 min-h-screen ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transform transition-transform duration-300 ease-in-out fixed top-0 left-0 z-30 lg:translate-x-0 lg:static lg:h-auto flex flex-col`}
      >
        <div className="p-5 flex-grow">
          <div className="flex items-center mb-5">
            <Image
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
              alt="Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <h2 className="text-2xl font-semibold ml-3">Name</h2>
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <button
                  className="flex items-center w-full text-left hover:bg-gray-700 p-2 rounded transition-colors duration-200 text-lg"
                  aria-haspopup={item.subItems.length > 0}
                  aria-expanded={item.subItems.length > 0}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
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
        
        {/* Profile and Logout*/}
        <div className="p-1">
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
                width={32}
                height={32}
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
      <div className="md:hidden ml-auto">
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-700 rounded-md outline-none"
                  aria-label="Toggle menu"
                >
                  {navbar ? (
                     <MdOutlineClose size={24} />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 hover:border-gray-600 transition-colors duration-200">
                    <FaBars size={24} />
                  </div>
                  )}
                </button>
        </div>
    </div>
  );
};

export default Header;
