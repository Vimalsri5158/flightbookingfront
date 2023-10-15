/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import User from './pages/User';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
