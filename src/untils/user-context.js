import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {colors, icons, images, envPath} from '../common';
import {isValidUsername, isValidPassword} from '../untils/validations';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {storeJwtToken, getJwtToken} from '../untils/jwt-storage';
import {jwtDecode} from 'jwt-decode';

export const fetchData = async () => {
    const jwt = await getJwtToken();
    if (jwt) {
        return jwt.token;
      } else {
        console.warn('Không tìm thấy JWT trong AsyncStorage.');
        return null;
      }
  }

export const decodeJWT = async () => {
    try {
      const jwt = await fetchData();
      if (jwt) {
        const decoded = jwtDecode(jwt);
        console.log(decoded)
        return decoded;
      } else {
        console.warn('Không tìm thấy JWT trong AsyncStorage.');
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi decode JWT từ AsyncStorage:', error);
      return null;
    }
  };

export const useFetchUser = () => {
    const [user, setUser] = useState([]);
    const tokenDecoded = decodeJWT()    
  
    useEffect(() => {
      const fetchTestTypes = async () => {
        try {
          const response = await fetch(`${envPath.domain_url}Authen/GetProfile?id=${tokenDecoded.id}`,
          {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${(await fetchData()).toString()}`,
              },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setTestTypes(data);
        } catch (error) {
          console.error('Error fetching test types:', error);
        }
      };
  
      fetchTestTypes();
    }, []);
  
    return user;
  };
