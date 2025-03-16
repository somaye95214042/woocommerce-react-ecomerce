import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartSidebar from "./CartSidebar";
import { useCart } from "../Context/CartContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

const Header = () => {
  const { cart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const calculateTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchParams({ query });
    navigate(`/search?query=${query}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-16" />
            </Link>
          </div>

          {/* Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-[#1e3c72]">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-[#1e3c72]">
              Shop
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-[#1e3c72]">
              Blog
            </Link>

            {/* Dropdown */}
            <div className="relative group">
              {/* Dropdown Button */}
              <button className="text-gray-700 hover:text-[#1e3c72] flex items-center">
                Categories
                <svg
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Submenu */}
              <div
                className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10 hidden group-hover:block"
                onMouseEnter={(e) => e.currentTarget.classList.add("block")}
                onMouseLeave={(e) => e.currentTarget.classList.remove("block")}
              >
                <Link
                  to="/category/dress"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Clothing
                </Link>
                <Link
                  to="/category/accessories"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Accessories
                </Link>
                <Link
                  to="/category/shoes"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Shoes
                </Link>
              </div>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-[#1e3c72]">
              Contact
            </Link>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center space-x-6">
            {/* Search Bar (Hidden on mobile) */}
            <div className="relative w-64 hidden md:block">
              <input
                type="text"
                value={searchParams.get("query") || ""}
                onChange={handleSearchChange}
                className="w-full p-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Search..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {/* Cart Icon */}
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 text-gray-700 hover:text-[#1e3c72]"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.8 13.2a2 2 0 0 0 2 1.6h9.4a2 2 0 0 0 2-1.6L23 6H6"></path>
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {calculateTotalItems()}
                </span>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>

          <nav>
            {token ? (
              <div className="flex gap-4 items-center">
                {/* Dashboard Button */}
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                >
                  <UserIcon className="h-5 w-5 text-gray-700" />
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 transition"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            ) : (
              /* Login Button */
              <div className="flex">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 py-2 transition"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-700" />
                  <span className="text-gray-700">Login /</span>
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="flex items-center gap-2 pl-2 py-2 transition"
                >
                  <span className="text-gray-700">Register</span>
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden bg-white shadow-md absolute top-full left-0 w-full z-50 p-4 space-y-4">
            <Link to="/" className="block text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-gray-700 hover:text-blue-600"
            >
              Shop
            </Link>
            <Link
              to="/category/clothing"
              className="block text-gray-700 hover:text-blue-600"
            >
              Clothing
            </Link>
            <Link
              to="/category/accessories"
              className="block text-gray-700 hover:text-blue-600"
            >
              Accessories
            </Link>
            <Link
              to="/category/shoes"
              className="block text-gray-700 hover:text-blue-600"
            >
              Shoes
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>
          </nav>
        )}
      </header>

      <CartSidebar
        cart={cart}
        isOpen={isCartOpen}
        toggleCart={() => setIsCartOpen(false)}
        removeFromCart={removeFromCart}
      />

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Header;
