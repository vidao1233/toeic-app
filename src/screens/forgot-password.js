import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import {colors, icons, fontsizes, envPath} from '../common';
import {Header} from '../components';
import { isValidEmail, isValidPassword, isValidPasswordConfirm } from '../untils/validations';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [OTP, setOTP] = useState('');

  const isValidationOK = () =>
    email.length > 0 && isValidEmail(email) == true;

  const handleSendForgotCode = async () => {
    if (!isValidationOK()) {
      return;
    }

    try {
      const response = await fetch(
        `${envPath.domain_url}Authen/SendForgotPasswordCode?email=${email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          }),
        },
      );

      const responseData = await response.json();

      if (response.ok) {
        // Xử lý dữ liệu trả về nếu cần
        Alert.alert('OTP sent to your email!');
      } else {
        // Xử lý lỗi nếu cần
        console.error('Request failed with status:', response.status);
        Alert.alert('Send failed. Please try again.');
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Request failed:', error);
      Alert.alert('An error occurred. Please try again later.');
    }
  };

  const handleForgotPass = async () => {
    if (!isValidPasswordConfirm(newPass, confirmPass)) {
      return;
    }

    try {
      const response = await fetch(
        `${envPath.domain_url}Authen/ForgotPassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: email,
            OTP: OTP,
            NewPassWord: newPass
          }),
        },
      );
      const responseData = await response.json();

      if (response.ok) {
        // Xử lý dữ liệu trả về nếu cần
        Alert.alert('Successful !');
      } else {
        // Xử lý lỗi nếu cần
        console.error('Request failed with status:', response.status);
        Alert.alert('Submit failed. Please try again.');
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Request failed:', error);
      Alert.alert('An error occurred. Please try again later.');
    }
  };

  return (
    <View>
      <Header title={'Forgot Password'} />
      <View
        style={{
          height: 150,
          width: 150,
          justifyContent: 'center',
          alignItems: 'center',
          marginStart: 125,
          marginTop: 30,
        }}>
        <Image
          style={{
            height: 150,
            width: 150,
            resizeMode: 'cover',
            tintColor: colors.dark_primary,
          }}
          source={icons.forgot_password}
        />
      </View>
      <View
        style={{
          height: 130,
          backgroundColor: 'white',
          marginHorizontal: 20,
          borderRadius: 20,
          marginTop: 30,
        }}>
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: fontsizes.h3,
              color: colors.dark_primary,
            }}>
            Recovery email:
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInput
              onChangeText={text => {
                setEmail(text);
              }}
              style={{
                color: 'black',
                fontSize: fontsizes.h3,
                width: 280,
              }}
              placeholder="Enter your email"
              placeholderTextColor={colors.placeHolder}
              fontSize={fontsizes.h3}
              underlineColorAndroid={colors.primary}
            />
            <TouchableOpacity 
            disabled={!isValidEmail(email)}
            onPress={handleSendForgotCode}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  padding: 10,
                  resizeMode: 'cover',
                  tintColor: isValidEmail(email) ? colors.dark_primary : colors.inactive,
                }}
                source={icons.send}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 370,
          backgroundColor: 'white',
          marginHorizontal: 20,
          borderRadius: 20,
          marginTop: 30,
          justifyContent: 'center'
        }}>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              fontSize: fontsizes.h3,
              color: colors.dark_primary,
            }}>
            OTP:
          </Text>
          <TextInput
            onChangeText={text => {
              setOTP(text);
            }}
            style={{
              color: 'black',
              fontSize: fontsizes.h3,
            }}
            placeholder="Enter OTP received"
            placeholderTextColor={colors.placeHolder}
            fontSize={fontsizes.h3}
            underlineColorAndroid={colors.primary}
          />
        </View>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: fontsizes.h3,
              color: colors.dark_primary,
            }}>
            New password:
          </Text>
          <TextInput
            onChangeText={text => {
              setNewPass(text);
            }}
            style={{
              color: 'black',
              fontSize: fontsizes.h3,
            }}
            placeholder="Enter your new password"
            placeholderTextColor={colors.placeHolder}
            fontSize={fontsizes.h3}
            underlineColorAndroid={colors.primary}
          />
        </View>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: fontsizes.h3,
              color: colors.dark_primary,
            }}>
            Confirm password:
          </Text>
          <TextInput
            onChangeText={text => {
              setConfirmPass(text);
            }}
            style={{
              color: 'black',
              fontSize: fontsizes.h3,
            }}
            placeholder="Enter your confirm password"
            placeholderTextColor={colors.placeHolder}
            fontSize={fontsizes.h3}
            underlineColorAndroid={colors.primary}
          />
        </View>
        <TouchableOpacity
            disabled={!isValidPassword(newPass) && !isValidPassword(confirmPass)}
          onPress={handleForgotPass()}
          style={{
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            alignSelf: 'center',
            width: '50%',
            borderRadius: 15,
          }}>
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              color: 'white',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  modalContainer: {
    height: 450,
    width: 350,
    marginHorizontal: 33,
    marginVertical: 200,
    backgroundColor: colors.dark_primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: 80,
  },
  closeButtonText: {
    fontSize: fontsizes.h3,
    color: 'white',
    alignSelf: 'center',
  },
});
export default ForgotPassword;
