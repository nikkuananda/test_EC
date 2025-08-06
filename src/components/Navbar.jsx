import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    updateLoginStatus();

    window.addEventListener("storage", updateLoginStatus);
    window.addEventListener("loginStatusChanged", updateLoginStatus);

    return () => {
      window.removeEventListener("storage", updateLoginStatus);
      window.removeEventListener("loginStatusChanged", updateLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("loginStatusChanged"));
    setDropdownOpen(false);
    setIsOpen(false);
    navigate("/login");
  };

  const showHomeLink =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/users/");

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold hover:text-yellow-300">
          Cit Cat
        </Link>

        {/* Desktop  */}
        <div className="hidden md:flex items-center relative">
          {showHomeLink && (
            <Link
              to="/"
              className="mr-4 hover:text-yellow-300 text-lg font-medium"
              onClick={() => setDropdownOpen(false)}
            >
              Home
            </Link>
          )}

          {/* Icon Menu */}
          <button
            onClick={toggleDropdown}
            className="p-2 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-label="User menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.36 0 4.572.629 6.623 1.699M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-36 bg-white text-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
              role="menu"
            >
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-blue-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-blue-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-blue-100"
                  type="button"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-3 font-medium">
          {showHomeLink && (
            <Link
              to="/"
              className="block hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block hover:text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block hover:text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block hover:text-yellow-300 w-full text-left"
              type="button"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
