import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailure: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-4xl font-bold mb-4 text-red-800">Payment Failed</h1>
      <p className="text-lg mb-8 text-red-700">Something went wrong with your payment. Please try again.</p>
      <Link to="/books" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Back to Books
      </Link>
    </div>
  );
};

export default PaymentFailure;
