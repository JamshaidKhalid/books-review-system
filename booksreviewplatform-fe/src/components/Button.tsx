import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white hover:bg-black hover:text-white text-black font-normal mx-1 py-1 px-2 border border-black rounded transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
