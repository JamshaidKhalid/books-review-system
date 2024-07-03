import { Route, Routes } from 'react-router-dom';
import './App.css';
import Redirect from './routes/Redirect';

function App() {

  return (
    <Routes>
      <Route path="*" element={<Redirect/>} />
    </Routes>
  )
}

export default App