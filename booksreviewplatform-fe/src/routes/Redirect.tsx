import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import BooksPage from '../pages/BooksPage';
import PaymentSuccess from '../components/PaymentSuccess';
import PaymentFailure from '../components/PaymentFailure';

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

// Protected Route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return isAuthenticated() ? <>{element}</> : <Navigate to="/" replace />;
};

// Route component to check if user is not authenticated
const PublicRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return !isAuthenticated() ? <>{element}</> : <Navigate to="/books" replace />;
};

const Redirect: React.FC = () => {
  return (
    <Routes>
      <Route path="/books" element={<ProtectedRoute element={<BooksPage />} />} />
      <Route path="/" element={<PublicRoute element={<AuthPage formType="signin" />} />} />
      <Route path="/signup" element={<PublicRoute element={<AuthPage formType="signup" />} />} />
      <Route path="/success" element={<ProtectedRoute element={<PaymentSuccess />} />} />
      <Route path="/failure" element={<ProtectedRoute element={<PaymentFailure />} />} />
    </Routes>
  );
};

export default Redirect;
