/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { backendUrl } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

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

    const userData = {
      email,
      password,
    };

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
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
      handleReset();
      navigate("/");
      return <Navigate to={"/"} replace />;
    }
  };
  // if (

  // ) {
  //
  // }

  return (
    <div className="login">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "lightgreen",
          color: "black",
          padding: "5px",
          borderRadius: "10px",
        }}
      >
        LOGIN
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
          style={{ color: "lightgreen", padding: "10px", marginLeft: "-30px" }}
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
            Login &nbsp;&nbsp;
            <FontAwesomeIcon icon={faSignInAlt} />
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{
              marginLeft: "50px",
            }}
          >
            Sign in &nbsp;&nbsp;
            <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
