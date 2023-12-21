/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { backendUrl } from "../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
    alert("You are Successfull register!");
    return <Navigate to={"/login"} replace={true} />;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReset = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("User has been Sign in successfully");
    handleReset();
  };

  if (
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user"))
  ) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div className="register">
      <h2>REGISTER</h2>

      <form onSubmit={handleSubmit} className="form">
        <div style={{ color: "lightgreen", textAlign: "center" }}>
          <label>
            <b>Name:</b>
          </label>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div style={{ color: "lightGreen", padding: "10px" }}>
          <label>
            <b>Email:</b>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div
          style={{
            color: "lightGreen",
            padding: "10px",
            marginLeft: "-30px",
            marginBottom: "20px",
          }}
        >
          <label>
            <b>Password:</b>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div>
          <button type="submit" onClick={handleSignInClick}>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
