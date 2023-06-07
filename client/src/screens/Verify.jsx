import React from 'react'
import Loader from '../components/Loader'
import { useEffect } from "react";
import { useAuthToken } from '../AuthTokenContext';
import { useNavigate } from "react-router-dom";
import axios
 from 'axios';
const Verify = () => {
    const navigate = useNavigate();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function verifyUser() {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/verify-user`, null, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
      
          const user = response.data;
      
          if (user.auth0Id) {
            navigate('/');
          }
        } catch (error) {
          console.error('Error during verifyUser:', error);
        }
      }

    if (accessToken) {
      verifyUser();
    }
  }, [accessToken]);

  return (
    <>
    <Loader/>
    </>
  )
}

export default Verify