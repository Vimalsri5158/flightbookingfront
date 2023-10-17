/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { backendUrl } from "../config";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    handleReset();
  };

  if (
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user"))
  ) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div style={{textAlign:'center',marginLeft:"10rem"}}>
      <h2
        style={{
          textAlign:'center',
          marginLeft: "21rem",
          color: "green",
      padding:'5px',
      textTransform:"uppercase",
        }}
      >
        Sign up
      </h2>

      <form onSubmit={handleSubmit} style={{ marginLeft: "20rem" }}>
        <div style={{ color: "green", padding: "10px",textAlign:"center" }}>
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

        <div style={{ color: "Green", padding: "10px" }}>
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
            color: "Green",
            padding: "10px",
            marginLeft: "-25px",
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
          <button
            type="submit"
            style={{
              marginLeft: "2rem",
              backgroundColor: "green",
              color: "white",
            }}
          >
            <b>Sign in</b>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
