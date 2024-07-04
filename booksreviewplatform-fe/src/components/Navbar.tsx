import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FollowersModal from './FollowersModal';
import FollowingModal from './FollowingModal';
import SuggestedUsersModal from './SuggestedUsersModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showSuggestedUsers, setShowSuggestedUsers] = useState(false);

  const handleLogout = async () => {
    localStorage.clear();
    toast.success('Logged out successfully!');
    navigate('/signin');
  };

  return (
    <>
      <ToastContainer />
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">
            BooksReview
          </Link>
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
                <button
                  onClick={() => setShowFollowers(true)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Followers
                </button>
                <button
                  onClick={() => setShowFollowing(true)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Following
                </button>
                <button
                  onClick={() => setShowSuggestedUsers(true)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Suggested Users
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
      </nav>
      <FollowersModal show={showFollowers} onClose={() => setShowFollowers(false)} />
      <FollowingModal show={showFollowing} onClose={() => setShowFollowing(false)} />
      <SuggestedUsersModal show={showSuggestedUsers} onClose={() => setShowSuggestedUsers(false)} />
    </>
  );
};

export default Navbar;
