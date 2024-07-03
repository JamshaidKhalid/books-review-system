import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          MyApp
        </Link>
        <div className="relative">
          {email ? (
            <div className="relative">
              <button className="text-white focus:outline-none">
                {email}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/signin" className="text-white mr-4">
                Sign In
              </Link>
              <Link to="/signup" className="text-white">
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
