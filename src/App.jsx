/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import User from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserAuthentication = () => {
      const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(userIsLoggedIn);
    };
    setTimeout(checkUserAuthentication, 1000);

    return () => clearTimeout(checkUserAuthentication);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Use PrivateRoute for authenticated routes */}
        <Route
          path="/User"
          element={
            isLoggedIn ? (
              <PrivateRoute element={<User />} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Public routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
