import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { 
  FaUser, FaShoppingCart, FaStore, FaEllipsisV, 
  FaBell, FaHeadset, FaAd, FaMobile, FaSearch 
} from 'react-icons/fa';
import { clearUser } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  // Parse the user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      dispatch(clearUser());
      dispatch(clearCart());
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-1' : 'bg-white shadow-sm py-2'}`}>
      <div className="container mx-auto px-4 pb-2">
        {/* Top Row - Logo, Search, User Actions */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
              alt="Flipkart Logo"
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-4 max-w-2xl">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                  <FaUser className="text-lg" />
                  <span className="hidden sm:inline">Account</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-medium">Welcome, {user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
              >
                <FaUser className="text-lg" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            <Link
              onClick={(e) =>  {e.preventDefault();navigate('/cart')}}
              className="flex items-center space-x-2 relative hover:text-blue-600 transition-colors"
            >
              <div className="relative">
                <FaShoppingCart className="text-lg" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </Link>

            <div className="relative group hidden md:block">
              <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <FaEllipsisV className="text-lg" />
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                <div className="py-1">
                  <Link
                    to="/notification-preferences"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaBell className="mr-3 text-gray-500" />
                    Notification Preferences
                  </Link>
                  <Link
                    to="/customer-care"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaHeadset className="mr-3 text-gray-500" />
                    Customer Care
                  </Link>
                  <Link
                    to="/advertise"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaAd className="mr-3 text-gray-500" />
                    Advertise
                  </Link>
                  <Link
                    to="/download-app"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaMobile className="mr-3 text-gray-500" />
                    Download App
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="md:hidden mt-2">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-md rounded-b-lg">
            <div className="flex flex-col space-y-3">
              {!user && (
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
                >
                  <span>Sign Up</span>
                </Link>
              )}
              <Link
                to="/become-seller"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
              >
                <FaStore className="text-gray-500" />
                <span>Become a Seller</span>
              </Link>
              <Link
                to="/notification-preferences"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
              >
                <FaBell className="text-gray-500" />
                <span>Notifications</span>
              </Link>
              <Link
                to="/customer-care"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
              >
                <FaHeadset className="text-gray-500" />
                <span>Customer Care</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;