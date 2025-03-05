import { Link } from "react-router";

const LandingHeader = () => {
  return (
    // <nav className="fixed z-2 w-full bg-white shadow-md">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex justify-between h-16">
    //       <div className="flex-shrink-0 flex items-center">
    //         <Link to="/" className="text-2xl font-bold text-gray-800">
    //           CertiCode
    //         </Link>
    //       </div>
    //       <div className="flex-shrink-0 flex items-center">
    //         <div className="space-x-4">
    //           <Link to="/signin" className="text-gray-600 hover:text-gray-800">
    //             Login
    //           </Link>
    //           <Link
    //             to="/signup"
    //             className="text-gray-600 hover:text-gray-800"
    //           >
    //             Register
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          // onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
        >
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

        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          Certicode
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/seminars" className="text-white hover:text-gray-300">
            Seminars
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About Us
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
          <div className="space-x-4">
            <Link to="/signin" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:text-gray-300">
              Register
            </Link>
          </div>
          {/* {user ? (
            <div className="relative group">
              <button className="text-white hover:text-gray-300">
                {user?.name || "User"} ▼
              </button>
              <div className="absolute hidden group-hover:block right-0 mt-2 bg-white text-black rounded shadow-lg w-40">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </div>
          )} */}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {/* {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-6 text-white text-2xl z-40">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            ✖
          </button>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/seminars" onClick={() => setMenuOpen(false)}>
            Seminars
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)}>
                Settings
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )} */}
    </nav>
  );
};

export default LandingHeader;
