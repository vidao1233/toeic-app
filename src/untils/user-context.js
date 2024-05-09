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
import AsyncStorage from '@react-native-async-storage/async-storage';
import "core-js/stable/atob";

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

export  const loginContext = async (token) => {
    const token_decode = decodeJWT(token);
    const {
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": username,
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": role,
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
        idUser,
    } = token_decode;
    setUser((user) => ({
      username: username,
      role: role,
      auth: true,
      idUser: idUser,
      token: token,
    }));
    await AsyncStorage.setItem("jwt", token);
  };
