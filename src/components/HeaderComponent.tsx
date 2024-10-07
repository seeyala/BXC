"use client";
import '../styles/global.css';
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaBars, FaSearch, FaUser, FaCog, FaSignOutAlt,  FaUserCircle, 
  FaChartBar, FaEnvelope, FaClipboard, FaChevronDown
} from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

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
        className={`bg-gray-800 text-white w-64 min-h-screen ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transform transition-transform duration-300 ease-in-out fixed top-0 left-0 z-30 lg:translate-x-0 lg:static lg:h-auto`}
      >
        <div className="p-5">
          <div className="flex flex-col items-center justify-center mb-5">
            <Image
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
              alt="Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <h2 className="text-2xl font-semibold mt-2">LOGO</h2>
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <button
                  className="flex items-center w-full text-left hover:bg-gray-700 p-2 rounded transition-colors duration-200"
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
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-20">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none focus:text-gray-800 lg:hidden"
              aria-label="Toggle menu"
            >
              <FaBars size={24} />
            </button>
            <Image
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
              alt="Logo"
              width={40}
              height={40}
              className="h-8 w-auto ml-4"
            />
          </div>

          <div className="relative mx-4 flex-grow max-w-xs md:max-w-xl"> 
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 py-1 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
          <FaSearch className="absolute right-2 top-1.5 text-gray-400" />
          {autocompleteResults.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded-md w-full mt-1 shadow-lg">
              {autocompleteResults.map((result, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(result);
                    setAutocompleteResults([]);
                  }}
                >
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>
          <div className="relative">
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
              <span className="ml-2 text-gray-700">User</span>
              <FaChevronDown className="ml-2 text-gray-600" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaUser className="inline-block mr-2" /> Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaCog className="inline-block mr-2" /> Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaSignOutAlt className="inline-block mr-2" /> Logout
                </a>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
