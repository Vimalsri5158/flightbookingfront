/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../config";
import jwtDecode from "jwt-decode";
import { FaPlaneArrival, FaPlaneDeparture, FaChild } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { useForm } from "react-hook-form";

const UserDialog = ({ handleDialog, fetchUsers }) => {
  const {
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    tripType: "round",
    departure: "",
    arrival: "",
    departureDate: "",
    returnDate: "",
    adult: "",
    children: "",
    class: "",
    priceRange: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const { accessToken } = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(`${backendUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        await fetchUsers();
        handleDialog();
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  return (
    <div className="dialog">
      <div className="dialog-root">
        <form onSubmit={handleFormSubmit}>
          <div>
            <h3>Flight ticket booking application</h3>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "20px",
            }}
          >
            <input
              type="radio"
              name="tripType"
              value="round"
              onChange={handleInputChange}
              checked={formData.tripType === "round"}
            />
            <p className="text-xl font-bold">Round trip</p>

            <input
              type="radio"
              name="tripType"
              value="oneWay"
              onChange={handleInputChange}
              checked={formData.tripType === "oneWay"}
            />
            <p className="text-xl font-bold">One Way</p>

            <input
              type="radio"
              name="tripType"
              value="multiCity"
              onChange={handleInputChange}
              checked={formData.tripType === "multiCity"}
            />
            <p className="text-xl font-bold">Multi-City</p>
          </div>
          {errors.tripType && (
            <div
              style={{
                textAlign: "start",
                fontSize: "10px",
                color: "red",
              }}
            >
              Error
            </div>
          )}

          <div>
            <div>
              <div style={{ textAlign: "start" }}>
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "start",
                    marginTop: "10px",
                  }}
                >
                  ARRIVAL
                </p>
                <select
                  name="arrival"
                  value={formData.arrival}
                  style={{
                    textAlign: "center",
                    width: "30rem",
                    padding: "5px",
                    position: "absolute",
                  }}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    {" "}
                    --select Airport--
                  </option>
                  <option value="ENIA">
                    England Newcastle International Airport
                  </option>
                  <option value="INIA">
                    Italy Napels International Airport
                  </option>
                  <option value="MMA">Malaysia Mulu Airport</option>
                  <option value="KMA">Kenya Malindi Airport</option>
                </select>
                <FaPlaneDeparture style={{ position: "relative" }} />
              </div>
              {errors.departureAirport && (
                <div
                  style={{
                    textAlign: "start",
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  Error
                </div>
              )}

              <div style={{ textAlign: "start" }}>
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "start",
                    marginTop: "10px",
                  }}
                >
                  DEPARTURE
                </p>
                <select
                  name="departure"
                  value={formData.departure}
                  style={{
                    textAlign: "center",
                    width: "30rem",
                    padding: "5px",
                    position: "absolute",
                  }}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    {" "}
                    --select Airport--
                  </option>
                  <option value="ENIA">
                    England Newcastle International Airport
                  </option>
                  <option value="INIA">
                    Italy Napels International Airport
                  </option>
                  <option value="MMA">Malaysia Mulu Airport</option>
                  <option value="KMA">Kenya Malindi Airport</option>
                </select>
                <FaPlaneArrival style={{ position: "relative" }} />
              </div>
              {errors.arrivalAirport && (
                <div
                  style={{
                    textAlign: "start",
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  Error
                </div>
              )}

              <div style={{ display: "flex", marginTop: "10px" }}>
                <div style={{ marginRight: "10px" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      textAlign: "start",
                    }}
                  >
                    DEPARTURE DATE
                  </p>
                  <input
                    type="date"
                    name="departureDate"
                    style={{ width: "15rem", padding: "5px" }}
                    value={formData.departureDate}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.departureDate && (
                  <div
                    style={{
                      textAlign: "start",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}

                <div>
                  <p style={{ fontWeight: "bold", textAlign: "start" }}>
                    RETURN DATE
                  </p>
                  <input
                    type="date"
                    name="returnDate"
                    style={{ width: "15rem", padding: "5px" }}
                    value={formData.returnDate}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.returnDate && (
                  <div
                    style={{
                      textAlign: "start",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}
              </div>

              <div style={{ display: "flex", marginTop: "10px" }}>
                <div style={{ marginRight: "155px", textAlign: "start" }}>
                  <p style={{ fontWeight: "bold", textAlign: "start" }}>
                    ADULT (18+)
                  </p>
                  <select
                    name="adult"
                    value={formData.adult}
                    style={{
                      textAlign: "center",
                      width: "15rem",
                      padding: "5px",
                      position: "absolute",
                    }}
                    onChange={handleInputChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <GiPerson style={{ position: "relative" }} />
                </div>
                {errors.adult && (
                  <div
                    style={{
                      textAlign: "start",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}

                <div style={{ textAlign: "start" }}>
                  <p style={{ fontWeight: "bold" }}>CHILDREN (0-17)</p>
                  <select
                    name="children"
                    value={formData.children}
                    style={{
                      textAlign: "center",
                      width: "15rem",
                      padding: "5px",
                      position: "absolute",
                    }}
                    onChange={handleInputChange}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <FaChild style={{ position: "relative" }} />
                </div>
                {errors.children && (
                  <div
                    style={{
                      textAlign: "start",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}
              </div>

              <div style={{ display: "flex", marginTop: "10px" }}>
                <div style={{ marginRight: "10px" }}>
                  <p style={{ fontWeight: "bold", textAlign: "start" }}>
                    CLASS
                  </p>
                  <select
                    name="class"
                    value={formData.class}
                    style={{ width: "15rem", padding: "5px" }}
                    onChange={handleInputChange}
                  >
                    <option value="economy">ECONOMY</option>
                    <option value="business">BUSINESS</option>
                  </select>
                </div>
                {errors.class && (
                  <div
                    style={{
                      textAlign: "start",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}

                <div>
                  <p style={{ fontWeight: "bold", textAlign: "start" }}>
                    PRICE RANGE
                  </p>
                  <select
                    name="priceRange"
                    value={formData.priceRange}
                    style={{ width: "15rem", padding: "5px" }}
                    onChange={handleInputChange}
                  >
                    <option value="allPrices">ALL PRICES</option>
                    <option value="1000">$ 1000</option>
                    <option value="2000">$ 2000</option>
                    <option value="3000">$ 3000</option>
                    <option value="4000">$ 4000</option>
                    <option value="5000">$ 5000</option>
                  </select>
                </div>
                {errors.priceRange && (
                  <div
                    style={{
                      textAlign: "start",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="b1"
              style={{
                backgroundColor: "maroon",
                color: "white",
              }}
            >
              FIND FLIGHT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function User() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userRole, setRole] = useState("normal");
  const [showDialog, setShowDialog] = useState(false);

  const handleDialog = () => {
    if (showDialog) {
      setShowDialog(false);
    } else {
      setShowDialog(true);
    }
  };

  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    try {
      if (storedUser) {
        const { accessToken } = JSON.parse(storedUser);
        const { role } = jwtDecode(accessToken);
        setRole(role);
        fetchUsers(accessToken);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const fetchUsers = async (accessToken) => {
    try {
      const response = await fetch(`${backendUrl}/users`, {
        headers: {
          "auth-token": accessToken,
        },
      });

      if (response.status === 401) {
        console.error("Unauthorized access. Please log in again.");
        localStorage.removeItem("user");
        navigate("/login");
        alert("ticket successfully  booked")
      } else if (response.ok) {
        const data = await response.json();
        setUsers(data);
    
      } else {
        console.error(
          "Failed to fetch user data. Server responded with:",
          response.status,
          alert("ticket booked error")
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("ticket booked error")
    }
  };

  return (
    <div>
    <div className="b2">
    <h1>User Component</h1>
    <button onClick={handleDialog} className="btn5">Open Dialog</button>
    {showDialog && (
      <UserDialog
        handleDialog={handleDialog}
        fetchUsers={fetchUsers}
      />
    )}

      </div>



    </div>
  );
}

export default User;
