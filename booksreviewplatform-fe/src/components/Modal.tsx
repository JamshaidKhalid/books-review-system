// Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto rounded-lg shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900"
        >
          Close
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
