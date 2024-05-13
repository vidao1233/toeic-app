import React, {useState, useEffect} from 'react';
import {
  Text,
} from 'react-native';
import {envPath} from '../common';
import {getJwtToken} from '../untils/jwt-storage';
import "core-js/stable/atob";

export const fetchToken = async () => {
    const jwt = await getJwtToken();
    if (jwt) {
        console.log(`context ${jwt.token}`)
        return jwt.token;
      } else {
        console.warn('Không tìm thấy JWT trong AsyncStorage.');
        return null;
      }
  }

  export const getCurrentUserInfo = async () => {
    try {
      const response = await fetch(`${envPath.domain_url}Authen/CurrentUserInfo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(fetchToken())}`,
        }
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

// export const resendConfirmEmail = (props) => {
//   const { username } = props; // Destructure username from props

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${envPath.domain_url}Authen/ResendConfirmEmail?username=${username}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.status === 200) {
//           // Handle success
//           Alert.alert('We have sent EmailConfirm to email. Verified your email to Login!');
//         } else if (response.status === 403) {
//           // Handle account not existing
//           Alert.alert('Account doesn\'t exist. Please register.');
//         } else {
//           // Handle other status codes
//           Alert.alert('An error occurred. Please try again later.');
//         }
//       } catch (error) {
//         // Handle network errors
//         console.error('Request failed:', error);
//         Alert.alert('An error occurred. Please try again later.');
//       }
//     };

//     fetchData(); // Call the fetchData function
//   }, [username]); // Make sure to include username as a dependency
// };  
