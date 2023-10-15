/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { backendUrl  } from "../config";
import jwtDecode from "jwt-decode";
import { FaPlaneArrival, FaPlaneDeparture, FaChild } from 'react-icons/fa';
import { GiPerson } from 'react-icons/gi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const UserDialog = ({ handleDialog, fetchUsers, backendUrl }) => {
const { register, handleSubmit, formState: { errors } } = useForm();
const [formData, setFormData] = useState({
    tripType: 'round', 
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    adults: '',
    children: '',
    class: '',
    priceRange: '',
  });


  const [error, setError] = useState('');


  const handleFormSubmit = async (data) => {
    const { accessToken } = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch(`${backendUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': accessToken,
        },
        body: JSON.stringify(data),
      });

      console.log('Response:', response);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        await fetchUsers();
        handleDialog();
      } else {
        const errorData = await response.json();
        console.error('Error Data:', errorData);
        setError(errorData.msg);
      }
    } catch (error) {
      console.error('Error submitting user data:', error);
      setError('An error occurred while submitting the form.');
    }
  };


  return (
    <div className="dialog">
      <div className="dialog-root">

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <h3>Flight ticket booking application</h3>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '20px' }}>
            <input type="radio" {...register('tripType')} value="round" />
            <p className='text-xl font-bold'>Round trip</p>

            <input type="radio" {...register('tripType')} value="oneWay" />
            <p className='text-xl font-bold'>One Way</p>

            <input type="radio" {...register('tripType')} value="multiCity" />
            <p className='text-xl font-bold'>Multi-City</p>
          </div>
          {errors.tripType && <div style={{ textAlign: 'start', fontSize: '10px', color: 'red' }}>Error</div>}

          <div>
            <div>
              <div style={{ textAlign: 'start' }}>
                <p style={{ fontWeight: 'bold', textAlign: 'start', marginTop: '10px' }}>ARRIVAL</p>
                  <select {...register('departureAirport')} style={{textAlign:'center', width: '30rem', padding: '5px',position:'absolute' }}>
                    <option value='' disabled> --select Airport--</option>
                    <option value='ENIA'>England Newcastle International Airport</option>
                    <option value='INIA'>Italy Napels International Airport</option>
                    <option value='MMA'>Malaysia Mulu Airport</option>
                    <option value='KMA'>Kenya Malindi Airport</option>
                  </select>
                  <FaPlaneDeparture style={{ position: 'relative' }} />
              </div>
              {errors.departureAirport && <div style={{ textAlign: 'start', fontSize: '10px', color: 'red' }}>Error</div>}

              <div style={{ textAlign: 'start' }}>
                <p style={{ fontWeight: 'bold', textAlign: 'start', marginTop: '10px' }}>DEPARTURE</p>
                <select {...register('arrivalAirport')} style={{textAlign:'center', width: '30rem', padding: '5px',position:'absolute' }}>
                  <option value='' disabled> --select Airport--</option>
                  <option value='ENIA'>England Newcastle International Airport</option>
                  <option value='INIA'>Italy Napels International Airport</option>
                  <option value='MMA'>Malaysia Mulu Airport</option>
                  <option value='KMA'>Kenya Malindi Airport</option>
                </select>
                <FaPlaneArrival style={{ position: 'relative' }} />
              </div>
              {errors.arrivalAirport && <div style={{ textAlign: 'start', fontSize: '10px', color: 'red' }}>Error</div>}

              <div style={{ display: 'flex', marginTop: '10px' }}>
                <div style={{ marginRight: '10px' }}>
                  <p style={{ fontWeight: 'bold', textAlign: 'start' }}>DEPARTURE DATE</p>
                  <input type="date" {...register('departureDate')} style={{ width: '15rem', padding: '5px' }} />
                </div>
                {errors.departureDate && <div style={{ textAlign: 'start', fontSize: '10px', color: 'red' }}>Error</div>}

                <div>
                  <p style={{ fontWeight: 'bold', textAlign: 'start' }}>RETURN DATE</p>
                  <input type="date" {...register('returnDate')} style={{ width: '15rem', padding: '5px' }} />
                </div>
                {errors.returnDate && <div style={{ textAlign: 'start', fontSize: '10px', color: 'red' }}>Error</div>}
              </div>

              <div style={{ display: 'flex', marginTop: '10px' }}>
                <div style={{ marginRight: '155px', textAlign: 'start' }}>
                  <p style={{ fontWeight: 'bold', textAlign: 'start' }}>ADULT (18+)</p>
                  <select {...register('adults')} style={{textAlign:'center', width: '15rem', padding: '5px',position:'absolute' }}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <GiPerson style={{ position: 'relative' }} />
                </div>
                {errors.adults && <div style={{ textAlign: 'start', fontSize: '10px', color: 'red' }}>Error</div>}

                <div style={{ textAlign: 'start' }}>
                  <p style={{ fontWeight: 'bold' }}>CHILDREN (0-17)</p>
                  <select {...register('children')} style={{textAlign:'center', width: '15rem', padding: '5px',position:'absolute' }}>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <FaChild style={{ position: 'relative' }} />
                </div>
                {errors.children && <div style={{ textAlign: 'start', fontSize: '10px', color: 'red' }}>Error</div>}
              </div>

              <div style={{ display: 'flex', marginTop: '10px' }}>
                <div style={{ marginRight: '10px' }}>
                  <p style={{ fontWeight: 'bold', textAlign: 'start' }}>CLASS</p>
                  <select {...register('class')} style={{ width: '15rem', padding: '5px' }}>
                    <option value='economy'>ECONOMY</option>
                    <option value='business'>BUSINESS</option>
                  </select>
                </div>
                {errors.class && <div style={{ textAlign: 'start', fontSize: '10px', color: 'red' }}>Error</div>}

                <div>
                  <p style={{ fontWeight: 'bold', textAlign: 'start' }}>PRICE RANGE</p>
                  <select {...register('priceRange')} style={{ width: '15rem', padding: '5px' }}>
                    <option value='allPrices'>ALL PRICES</option>
                    <option value='1000'>$ 1000</option>
                    <option value='2000'>$ 2000</option>
                    <option value='3000'>$ 3000</option>
                    <option value='4000'>$ 4000</option>
                    <option value='5000'>$ 5000</option>
                  </select>
                </div>
                {errors.priceRange && <div style={{ textAlign: 'start', fontSize: '10px', color: 'red' }}>Error</div>}
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className='b1' style={{ backgroundColor: 'maroon', color: 'white' }}>FIND FLIGHT</button>
          </div>
        </form>
      </div>
    </div>
  );
};


function User() {
const navigate = useNavigate();
const [users, setUsers] = useState([]);
const [userRole, setRole] = useState('normal');
const [showDialog, setShowDialog] = useState(false);



const handleDialog = () => {
  setShowDialog(!showDialog);
};

const { accessToken } = JSON.parse(localStorage.getItem('user'));

const fetchUsers = async () => {
  try {
    const response = await fetch(`${backendUrl}/users`, {
      headers: {
        'auth-token': accessToken,
      },
    });

    if (response.status === 401) {
      console.error('Unauthorized access. Please log in again.');
      localStorage.removeItem('user');
      navigate('/login'); 
    } else if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else {
      console.error('Failed to fetch user data. Server responded with:', response.status);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


useEffect(() => {
  fetchUsers();
  const { accessToken } = JSON.parse(localStorage.getItem('user'));
  const { role } = jwtDecode(accessToken);
  setRole(role);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [accessToken]);

  return (
    <div>
      <h1>User Component</h1>
      <button onClick={handleDialog} className='b2'>Open Dialog</button>
      {showDialog && ( 
        <UserDialog
          handleDialog={handleDialog}
          fetchUsers={fetchUsers}
          accessToken={accessToken}
          backendUrl={backendUrl}
        />
      )}
    </div>
  );
}

export default User;
