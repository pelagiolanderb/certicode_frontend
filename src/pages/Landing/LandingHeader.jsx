import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const LandingHeader = () => {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 transition-all duration-700 delay-200 z-50 ${
        scrolling ? "bg-[#063F78] shadow-lg" : "bg-transparent"
      }`} 
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <Link to="/">
            <img
              src={scrolling ? "/img/white_logo.png" : "/img/black_logo.png"}
              alt="Logo"
              className="w-32 md:w-40 transition-all duration-500"
            />
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`hover:underline transition-all duration-500 ${
              scrolling ? "text-white" : "text-black"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hover:underline transition-all duration-500 ${
              scrolling ? "text-white" : "text-black"
            }`}
          >
            Seminars
          </Link>
          <Link
            to="/contact"
            className={`hover:underline transition-all duration-500 ${
              scrolling ? "text-white" : "text-black"
            }`}
          >
            Back To Dashboard
          </Link>
        </nav>

            {/* Mobile Menu Button */}
            <button
            className="md:hidden text-2xl transition-all duration-500 "
            onClick={() => setMenuOpen(!menuOpen)}
            >
            {menuOpen ? (
                <i className="fa-solid fa-xmark text-black"></i> // Close icon
            ) : (
                <i
                className={`fa-solid fa-bars ${
                    scrolling ? "text-white" : "text-black"
                }`}
                ></i> 
            )}
            </button>
      </div>

      {/* Mobile Menu */}
        <div
            className={`absolute top-16 left-0 w-full bg-[#063F78] text-white transition-all duration-500 ${
            menuOpen ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
            } md:hidden`}
        >
            <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
                <Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>
                Home
                </Link>
            </li>
            <li>
                <Link to="/about" className="hover:underline" onClick={() => setMenuOpen(false)}>
                Seminars
                </Link>
            </li>
            <li>
                <Link to="/contact" className="hover:underline" onClick={() => setMenuOpen(false)}>
                Back To Dashboard
                </Link>
            </li>
            </ul>
        </div>
    </header>
  );
};

export default LandingHeader;
