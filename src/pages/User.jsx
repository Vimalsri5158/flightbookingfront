/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { backendUrl } from "../config";
import jwtDecode from "jwt-decode";
import { FaPlaneArrival, FaPlaneDeparture, FaChild } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const UserDialog = ({ handleDialog, fetchUsers, backendUrl }) => {
  const navigate = useNavigate();
  const {
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    flightNumber: "",
    bookingSeats: "",
    departureDate: "",
    returnDate: "",
    children: "",
    class: "",
    priceRange: "",
    adult: "",
    departure: "",
    arrival: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    localStorage.setItem(
      "formData",
      JSON.stringify({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const { accessToken } = JSON.parse(localStorage.getItem("user"));

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
        const { accessToken } = JSON.parse(localStorage.getItem("user"));
        handleDialog();
        alert("Your ticket has been successfully booked, Thank you!");
        history.push("/login");
        return <Navigate to={"/"} replace />;
      } else {
        const errorData = await response.json();
        console.log(errorData);

        alert("Error occurred in ticket booking. Please try again");
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
              gap: "1.5rem",
            }}
          >
            <input
              type="radio"
              name="tripType"
              value="round"
              onChange={handleInputChange}
              checked={formData.tripType === "round"}
            />
            <p>
              <b>Round trip</b>
            </p>

            <input
              type="radio"
              name="tripType"
              value="oneWay"
              onChange={handleInputChange}
              checked={formData.tripType === "oneWay"}
            />
            <p>
              <b>One Way</b>
            </p>

            <input
              type="radio"
              name="tripType"
              value="multiCity"
              onChange={handleInputChange}
              checked={formData.tripType === "multiCity"}
            />
            <p>
              <b>Multi-City</b>
            </p>
          </div>
          {errors.tripType && (
            <div
              style={{
                textAlign: "start",
                color: "red",
              }}
            >
              Error
            </div>
          )}

          <div style={{ marginTop: "5px" }}>
            <div style={{ textAlign: "start" }}>
              <p>FlightNumber</p>
              <select
                name="flightNumber"
                id="flightNumber"
                value={formData.flightNumber}
                onChange={handleInputChange}
                style={{
                  width: "30rem",
                  padding: "5px",
                  marginLeft: "5px",
                  textAlign: "center",
                }}
              >
                <option value="" disabled>
                  {" "}
                  --Flight Number--
                </option>
                <option value="A1234">A1234</option>
                <option value="B4321">B4321</option>
                <option value="C0987">C0987</option>
                <option value="D6543">D6543</option>
                <option value="E1997">E1997</option>
                <option value="F1998">F1998</option>
              </select>
            </div>

            <div style={{ textAlign: "start", paddingRight: "10px" }}>
              <p>Booking Seats</p>
              <select
                name="bookingSeats"
                id="bookingSeats"
                value={formData.bookingSeats}
                onChange={handleInputChange}
                style={{
                  width: "30rem",
                  padding: "5px",
                  marginLeft: "5px",
                  textAlign: "center",
                }}
              >
                <option value="" disabled>
                  {" "}
                  --Booking Seats--
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <div style={{ textAlign: "start" }}>
                <p>ARRIVAL</p>
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
                  <option value="ENGLAND">
                    England Newcastle International Airport
                  </option>
                  <option value="ITALY">
                    Italy Napels International Airport
                  </option>
                  <option value="MALASIYA">Malaysia Mulu Airport</option>
                  <option value="KENYA">Kenya Malindi Airport</option>
                </select>
                <FaPlaneDeparture style={{ position: "relative" }} />
              </div>
              {errors.departureAirport && (
                <div
                  style={{
                    textAlign: "start",
                    color: "red",
                  }}
                >
                  Error
                </div>
              )}

              <div style={{ textAlign: "start", paddingTop: "10px" }}>
                <p>DEPARTURE</p>
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
                  <option value="ENGLAND">
                    England Newcastle International Airport
                  </option>
                  <option value="ITALY">
                    Italy Napels International Airport
                  </option>
                  <option value="MALASIYA">Malaysia Mulu Airport</option>
                  <option value="KENYA">Kenya Malindi Airport</option>
                </select>
                <FaPlaneArrival style={{ position: "relative" }} />
              </div>
              {errors.arrivalAirport && (
                <div
                  style={{
                    textAlign: "start",

                    color: "red",
                  }}
                >
                  Error
                </div>
              )}

              <div style={{ display: "flex", paddingTop: "10px" }}>
                <div style={{ width: "15rem", textAlign: "start" }}>
                  <p>DEPARTURE DATE</p>
                  <input
                    type="date"
                    name="departureDate"
                    style={{
                      textAlign: "center",
                      width: "14rem",
                      padding: "4px",
                    }}
                    value={formData.departureDate}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.departureDate && (
                  <div
                    style={{
                      textAlign: "start",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}

                <div>
                  <p>RETURN DATE</p>
                  <input
                    type="date"
                    name="returnDate"
                    style={{
                      textAlign: "center",
                      width: "14rem",
                      padding: "4px",
                      marginLeft: "10px",
                    }}
                    value={formData.returnDate}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.returnDate && (
                  <div
                    style={{
                      textAlign: "start",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ width: "15rem", textAlign: "start" }}>
                  <p>ADULT'S</p>
                  <select
                    name="adult"
                    value={formData.adult}
                    style={{
                      textAlign: "center",
                      width: "15rem",
                      padding: "6px",
                      position: "absolute",
                    }}
                    onChange={handleInputChange}
                  >
                    {" "}
                    --select--
                    <option value="0">0</option>
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
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}

                <div
                  style={{
                    width: "15rem",
                    paddingLeft: "12px",
                    textAlign: "start",
                  }}
                >
                  <p>CHILDREN'S</p>
                  <select
                    name="children"
                    value={formData.children}
                    style={{
                      width: "15rem",
                      padding: "5px",
                    }}
                    onChange={handleInputChange}
                  >
                    {" "}
                    --select--
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                {errors.children && (
                  <div
                    style={{
                      textAlign: "start",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px" }}>
                  <p>CLASS</p>
                  <select
                    name="class"
                    value={formData.class}
                    style={{ width: "15rem", padding: "5px" }}
                    onChange={handleInputChange}
                  >
                    {" "}
                    --select--
                    <option value="allClass">ALL CLASS</option>
                    <option value="Economy">ECONOMY</option>
                    <option value="Business">BUSINESS</option>
                  </select>
                </div>
                {errors.class && (
                  <div
                    style={{
                      textAlign: "start",
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}

                <div>
                  <p>PRICE RANGE</p>
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
                      color: "red",
                    }}
                  >
                    Error
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const confirmSubmit = window.confirm(
                "Are you sure you want to submit?"
              );

              if (confirmSubmit) {
                handleFormSubmit(e);
                navigate(-2);
              }
            }}
            style={{
              display: "inline-block",
              padding: "5px",
              margin: "10px",
              border: "none",
            }}
          >
            Submit
          </button>
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
  const [accessToken, setAccessToken] = useState("");

  /**handle dialog */
  const handleDialog = () => {
    if (showDialog) {
      setShowDialog(false);
    } else {
      setShowDialog(true);
    }
  };
  const storedUser = localStorage.getItem("user");

  /**UseEffect */
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedUser) {
          const { accessToken } = JSON.parse(storedUser);
          const { role } = jwtDecode(accessToken);
          setRole(role);
          setAccessToken(accessToken);
          await fetchUsers(accessToken);
        } else {
          console.error("Stored user data is undefined or null");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };
    fetchData();
  }, []);

  /*Fetch user data*/
  const fetchUsers = async (accessToken) => {
    try {
      const response = await fetch(`${backendUrl}/users`, {
        headers: {
          "auth-token": accessToken,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("formData");
        navigate("/login");
      } else if (response.ok) {
        const data = await response.json();

        setUsers(data);
      } else {
        console.error(
          "Failed to fetch user data. Server responded with:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  /**Delete request method */
  const deleteUser = async (userId) => {
    const response = await fetch(`${backendUrl}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "auth-token": accessToken,
      },
    });
    await response.json();
    setUsers(users.filter((user) => user.id !== userId));
  };

  const confirmDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteUser(userId);
      alert("Deleted!");
    }
  };

  return (
    <>
      <div className="b2">
        <div className="booking">
          <button
            onClick={handleDialog}
            className="btn5"
            style={{
              backgroundColor: "green",
              fontWeight: "bold",
              marginRight: "70rem",
              padding: "10px",
              marginLeft: "-80px",
            }}
          >
            <FontAwesomeIcon icon={faCalendarCheck} />
            &nbsp;&nbsp;Booking Form
          </button>
          <button
            className="btn5"
            onClick={() => {
              const confirmLogout = window.confirm(
                "Are you sure you want to exit?"
              );
              if (confirmLogout) {
                localStorage.removeItem("user");
                localStorage.removeItem("formData");
              }
            }}
            style={{
              backgroundColor: "green",
              fontWeight: "bold",
              display: "inline-block",
              padding: "10px",
            }}
          >
            <i className="fa fa-sign-out" aria-hidden="true" />

            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
        <h5>LIST OF BOOKING TICKETS</h5>
        <br></br>
        <div className="user-table">
          <table className="table">
            <thead>
              <tr>
                <th>Flight number</th>
                <th>Booking seats</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Departure date</th>
                <th>Return date</th>
                <th>Class</th>
                <th>Adult</th>
                <th>Children</th>
                <th>Price Range</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.flightNumber}</td>
                  <td>{user.bookingSeats}</td>
                  <td>{user.departure}</td>
                  <td>{user.arrival}</td>
                  <td>{user.departureDate}</td>
                  <td>{user.returnDate}</td>
                  <td>{user.class}</td>
                  <td>{user.adult}</td>
                  <td>{user.children}</td>
                  <td>{user.priceRange}</td>
                  <td>
                    <button onClick={() => confirmDelete(user.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showDialog && (
          <UserDialog
            handleDialog={handleDialog}
            fetchUsers={fetchUsers}
            backendUrl={backendUrl}
            storedUser={storedUser}
          />
        )}
      </div>
    </>
  );
}

export default User;
