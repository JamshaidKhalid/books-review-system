import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          BooksReview
        </Link>
        <div className="relative">
          {email ? (
            <div className="relative">
              <button 
                className="text-white focus:outline-none hover:text-gray-400 flex items-center"
                onClick={toggleDropdown}
              >
                {email} <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Link to="/signin" className="text-white mr-4 hover:text-gray-400">
                Sign In
              </Link>
              <Link to="/signup" className="text-white hover:text-gray-400">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
