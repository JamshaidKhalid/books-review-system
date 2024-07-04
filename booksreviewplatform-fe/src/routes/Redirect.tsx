import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import BooksPage from '../pages/BooksPage';

const Redirect: React.FC = () => {



  return (
    <Routes>
      <Route path="/books" element={<BooksPage />} />
      <Route path="/" element={<AuthPage formType="signin" />} />
      <Route path="/signup" element={<AuthPage formType="signup" />} />
    </Routes>
  );
};

export default Redirect;
