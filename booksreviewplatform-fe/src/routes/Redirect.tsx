import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import BooksPage from '../pages/BooksPage';


const Redirect: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('accessToken');


  useEffect(() => {
    if (isLoggedIn) {
      navigate('/books');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
    <Routes>
          <Route path="/books" element={ <BooksPage/> } />
          <Route path="/" element={<AuthPage formType='signin' />} />
          <Route path="/signup" element={<AuthPage formType='signup' />} />
    </Routes>
    </>
  );
};

export default Redirect;