import React, { useEffect, useState } from 'react';
import { fetchFollowing, unfollowUser } from '../services/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const FollowingModal: React.FC<ModalProps> = ({ show, onClose }) => {
  const [following, setFollowing] = useState([]);
  const userId = parseInt(localStorage.getItem('userId') || '0');

  useEffect(() => {
    if (show && userId) {
      fetchFollowing(userId).then(setFollowing).catch(console.error);
    }
  }, [show, userId]);

  const handleUnfollow = async (userToUnfollowId: number) => {
    try {
      await unfollowUser(userId, userToUnfollowId);
      fetchFollowing(userId).then(setFollowing);
      toast.success('Unfollowed successfully!');
    } catch (error) {
      toast.error('Failed to unfollow. Please try again.');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Following</h3>
            <div className="mt-2">
              {following.map((follow: any) => (
                <div key={follow.id} className="mb-2 flex justify-between items-center">
                  {follow.username}
                  <button
                    onClick={() => handleUnfollow(follow.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
            <div className="items-center px-4 py-3">
              <button
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingModal;
