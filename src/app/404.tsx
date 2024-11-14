"use client";

import { FaCoffee } from "react-icons/fa"; // Importing the coffee icon
import Link from "next/link"; // For linking to the homepage

const Custom404: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-coffee-100 py-12 px-6">
      <div className="text-center space-y-8 max-w-lg w-full">
        {/* Coffee Icon with Steaming Effect */}
        <div className="flex justify-center mb-8 relative">
          {/* Steam Animation */}
          <div className="absolute top-0 animate-steam h-12 w-12 opacity-75">
            <div className="w-3 h-3 bg-white rounded-full animate-steam-bubble delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-steam-bubble delay-200"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-steam-bubble delay-300"></div>
          </div>
          <FaCoffee className="h-20 w-20 text-[#f3e5ab] md:h-24 md:w-24 lg:h-28 lg:w-28" />
        </div>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-coffee-700 tracking-wider mb-4">
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-coffee-600 text-opacity-80 mb-8">
          It seems like the page you're looking for is unavailable. But don't worry, you can always return to our homepage.
        </p>

        {/* Button to navigate back to the homepage */}
        <Link href="/" passHref>
          <button className="relative inline-flex items-center px-10 py-5 bg-coffee-500 text-[#f3e5ab] font-semibold rounded-lg shadow-2xl hover:bg-coffee-700 focus:outline-none focus:ring focus:ring-[#d7ccc8] transition duration-300 ease-in-out transform hover:scale-105">
            Go to Homepage
          </button>
        </Link>

        {/* Optional text */}
        <p className="text-coffee-600 text-opacity-80 mt-6 animate-bounce">
          Maybe the coffee spilled, or the page got lost. Let's try again!
        </p>
      </div>
    </div>
  );
};

export default Custom404;
