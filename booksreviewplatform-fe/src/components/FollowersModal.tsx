import React, { useEffect, useState } from 'react';
import { fetchFollowers } from '../services/auth.service';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const FollowersModal: React.FC<ModalProps> = ({ show, onClose }) => {
  const [followers, setFollowers] = useState([]);
  const userId = parseInt(localStorage.getItem('userId') || '0');

  useEffect(() => {
    if (show && userId) {
      fetchFollowers(userId).then(setFollowers).catch(console.error);
    }
  }, [show, userId]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Followers</h3>
          <div className="mt-2">
            {followers.map((follower: any) => (
              <div key={follower.id} className="mb-2">
                {follower.username}
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
  );
};

export default FollowersModal;