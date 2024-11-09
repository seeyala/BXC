// src/app/reload.tsx
"use client";

import { useState } from "react";
import { FaCoffee } from "react-icons/fa";  // Import FaCoffee from react-icons

const CoffeeReload: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Simulate loading time
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#6f4e37] to-[#f3e5ab] py-10 px-5">
      <div className="text-center space-y-6 max-w-lg w-full">
        {/* Coffee Icon using FaCoffee */}
        <div className="flex justify-center mb-4">
          <FaCoffee className="h-16 w-16 text-[#f3e5ab] md:h-20 md:w-20 lg:h-24 lg:w-24" />
        </div>

        <h1 className="text-5xl font-extrabold text-[#f3e5ab] tracking-wide mb-4">
          Oops, Something Went Wrong
        </h1>
        
        <p className="text-lg text-[#f3e5ab] text-opacity-80 mb-6">
          It seems this page is temporarily unavailable. This could be due to a technical issue that we are currently resolving. Please try reloading the page to continue.
        </p>

        <button
          onClick={handleReload}
          className="relative inline-flex items-center px-8 py-4 bg-[#6f4e37] text-[#f3e5ab] font-semibold rounded-lg shadow-xl hover:bg-[#8d6e63] focus:outline-none focus:ring focus:ring-[#d7ccc8] transition duration-300 ease-in-out"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="inline-flex items-center">
              <svg
                className="animate-spin h-6 w-6 text-[#d7ccc8] mr-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span>Reloading...</span>
            </div>
          ) : (
            <span>Reload Page</span>
          )}
        </button>

        {isLoading && (
          <p className="text-[#f3e5ab] text-opacity-80 mt-4 animate-pulse">
            Please wait while we reload the page...
          </p>
        )}
      </div>
    </div>
  );
};

export default CoffeeReload;
