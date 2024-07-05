import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-4xl font-bold mb-4 text-green-800">Payment Successful!</h1>
      <p className="text-lg mb-8 text-green-700">Thank you for your purchase.</p>
      <Link to="/books" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Back to Books
      </Link>
    </div>
  );
};

export default PaymentSuccess;
