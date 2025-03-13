import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "../../components/header/UserDropdown";

const LandingHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  let token = localStorage.getItem("auth_token");
  let role = localStorage.getItem("role");

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-50 ${
        isHomePage ? "bg-transparent" : "bg-[#37547C]"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <Link to="/" className="text-white text-2xl font-bold">
          Certicode
        </Link>

        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/seminar-list" className="text-white hover:text-gray-300">
            Seminars
          </Link>
          {token && role === "user" ? (
            <UserDropdown />
          ) : (
            <div className="space-x-4">
              <Link to="/signin" className="text-white hover:text-gray-300">
                Sign In
              </Link>
              <Link to="/signup" className="text-white hover:text-gray-300">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;
