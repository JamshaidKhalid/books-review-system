import React, { useEffect, useState } from 'react';
import { fetchListUsers, followUser } from '../services/auth.service';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const SuggestedUsersModal: React.FC<ModalProps> = ({ show, onClose }) => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = parseInt(localStorage.getItem('userId') || '0');
  const [followingState, setFollowingState] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (show && userId) {
      setLoading(true);
      fetchListUsers(userId)
        .then((data) => {
          setSuggestedUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [show, userId]);

  const handleFollow = async (userToFollowId: number) => {
    try {
      await followUser(userId, userToFollowId);
      setFollowingState({ ...followingState, [userToFollowId]: true });
      toast.success('Followed successfully!');
    } catch (error) {
      toast.error('Failed to follow. Please try again.');
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
            <h3 className="text-lg leading-6 font-medium text-gray-900">Suggested Users</h3>
            <div className="mt-2">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <ClipLoader color={"#4A90E2"} loading={loading} size={50} />
                </div>
              ) : (
                suggestedUsers.map((user: any) => (
                  <div key={user.id} className="mb-2 flex justify-between items-center">
                    {user.username}
                    {followingState[user.id] ? (
                      <span className="text-green-500">Following</span>
                    ) : (
                      <button
                        onClick={() => handleFollow(user.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                ))
              )}
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

export default SuggestedUsersModal;
