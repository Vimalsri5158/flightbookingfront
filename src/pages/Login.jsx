/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { backendUrl } from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData={
      email,
      password,
    }

    const loginResponse = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await loginResponse.json();

    if (loginResponse.status === 401) {
      alert("Invalid Email id and password");
    } else {
      alert("Login success");
      localStorage.setItem("user", JSON.stringify(data));
      handleReset();
      navigate("/");
    }
  };

  if (
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user"))
  ) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div
      style={{
        marginLeft: "42rem",
        fontStyle: "times",
      }}
    >
      <h2
        style={{
          color: "white",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Login Page
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ color: "lightgreen", padding: "10px" }}>
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
          style={{ color: "lightgreen", padding: "10px", marginLeft: "-20px" }}
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

        <div
          style={{
            display: "flex",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <button
            type="submit"
            style={{
              marginLeft: "-10px",
            }}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{
              marginLeft: "20px",
            }}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
