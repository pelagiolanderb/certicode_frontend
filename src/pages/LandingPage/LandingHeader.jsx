"use client"

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
    <nav className={`fixed top-0 left-0 w-full z-50 ${navColor} transition-all duration-1000 `}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <Link to="/" className="relative flex items-center h-10 w-32">
          {/* Using a crossfade technique with z-index instead of absolute positioning */}
          <img
            src={white_logo || "/placeholder.svg"}
            alt="Certicode White Logo"
            className={`h-10 w-auto object-contain transition-opacity duration-500 absolute left-0 ${
              isHomePage && !isScrolled ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={black_logo || "/placeholder.svg"}
            alt="Certicode Black Logo"
            className={`h-10 w-auto object-contain transition-opacity duration-500 absolute left-0 ${
              isHomePage && !isScrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className={` hover:text-gray-300 ${navTextColor}`}>
            Home
          </Link>
          <Link to="/seminar-list" className={`${navTextColor} hover:text-gray-300`}>
            Seminars
          </Link>
          {token && role === "admin" ? (
            <div className="space-x-4">
              <Link to="/dashboard" className={`${navTextColor} hover:text-gray-300`}>
                Back to Dashboard
              </Link>
            </div>
          ) : token && role === "user" ? (
            <UserDropdown />
          ) : (
            <div className="space-x-4">
              <Link to="/signin" className={`${navTextColor} hover:text-gray-300`}>
                Sign In
              </Link>
              <Link to="/signup" className={`${navTextColor} hover:text-gray-300`}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default LandingHeader

