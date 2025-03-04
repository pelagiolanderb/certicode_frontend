import React from "react";
import { Link } from "react-router";

const LandingHeader = () => {
  return (
    <nav className="fixed z-2 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              CertiCode
            </Link>
          </div>
          <div className="flex-shrink-0 flex items-center">
            <div className="space-x-4">
              <Link to="/signin" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-600 hover:text-gray-800"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;
