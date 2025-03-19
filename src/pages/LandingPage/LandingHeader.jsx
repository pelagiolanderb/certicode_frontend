

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import UserDropdown from "../../components/header/UserDropdown"
import white_logo from "../../assets/images/white_logo.png"
import black_logo from "../../assets/images/black_logo.png"

const LandingHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const token = localStorage.getItem("auth_token")
  const role = localStorage.getItem("role")

  const isHomePage = location.pathname === "/"

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50) // Change when scrolled 50px down
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  
  const navColor = isHomePage ? (isScrolled ? "bg-[#063F78] shadow-m" : "bg-transparent") : "bg-[#37547C]"
  const navTextColor = isHomePage ? (isScrolled ? "text-white" : "tex-gray-800") : "text-white"

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${navColor} transition-all duration-1000`}>
    <div 
    className="flex justify-between items-center w-full
    lg:px-6 lg:py-4 
    md:pr-10 pt-5 pl-4
    ">
      {/* Burger Button for Mobile */}
      <button onClick={() => setMenuOpen(!menuOpen)} 
      className="lg:hidden
      md:pl-4 md:hidden
      "  
      >
        <svg
          className="w-8 h-8 
        lg:text-white 
          md:text-[#063F78]
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Logo */}
      <Link to="/" 
      className="relative flex items-center h-10 w-32
   
      ">
        <img
          src={white_logo || "/placeholder.svg"}
          alt="Certicode White Logo"
          className={`h-10 w-auto object-contain transition-opacity duration-500 absolute left-0  ${
            isHomePage && !isScrolled ? "opacity-0" : "opacity-100"
          }
      
          `}
        />
        <img
          src={black_logo || "/placeholder.svg"}
          alt="Certicode Black Logo"
          className={`h-10 w-auto object-contain transition-opacity duration-500 absolute left-0 ${
            isHomePage && !isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden space-x-6 items-center
      lg:flex 
      md:flex
      ">
        <Link to="/" className={`hover:text-gray-300 ${navTextColor}`}>Home</Link>
        <Link to="/seminar-list" className={`${navTextColor} hover:text-gray-300`}>Seminars</Link>
        {token && role === "admin" ? (
          <div className="space-x-4">
            <Link to="/dashboard" className={`${navTextColor} hover:text-gray-300`}>Back to Dashboard</Link>
          </div>
        ) : token && role === "user" ? (
          <UserDropdown />
        ) : (
          <div className="space-x-4">
            <Link to="/signin" className={`${navTextColor} hover:text-gray-300`}>Sign In</Link>
            <Link to="/signup" className={`${navTextColor} hover:text-gray-300`}>Sign Up</Link>
          </div>
        )}
      </div>
    </div>

    {/* Mobile Menu */}
    <div
      className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 transform ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="bg-white w-64 h-full shadow-md p-6">
        {/* Close Button */}
        <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4">
          <svg
            className="w-8 h-8 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-4 mt-10">
          <Link to="/" className="text-black hover:text-gray-500" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/seminar-list" className="text-black hover:text-gray-500" onClick={() => setMenuOpen(false)}>Seminars</Link>
          {token && role === "admin" ? (
            <Link to="/dashboard" className="text-black hover:text-gray-500" onClick={() => setMenuOpen(false)}>Back to Dashboard</Link>
          ) : token && role === "user" ? (
            <UserDropdown />
          ) : (
            <>
              <Link to="/signin" className="text-black hover:text-gray-500" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" className="text-black hover:text-gray-500" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  </nav>
  )
}

export default LandingHeader

