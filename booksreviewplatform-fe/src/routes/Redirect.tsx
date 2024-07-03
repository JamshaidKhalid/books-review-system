import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';


const Redirect: React.FC = () => {
  const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem('authToken');


//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate('/dashboard');
//     } else {
//       navigate('/');
//     }
//   }, [navigate]);

  return (
    <>
    <Routes>
          {/* <Route path="/books" element={<AuthPage formType='signin' />} /> */}
          <Route path="/" element={<AuthPage formType='signin' />} />
          <Route path="/signup" element={<AuthPage formType='signup' />} />
    </Routes>
    </>
  );
};

export default Redirect;