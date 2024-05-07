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
import {isValidPasswordConfirm} from '../untils/validations';
import {getJwtToken} from '../untils/jwt-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function ChangePassword(props) {
  const [username, setUsername] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorConfirmPass, setErrorConfirmPass] = useState('');

  //navigation
  const {navigation, route} = props;
  //function of navigate to/back
  const {navigate, go_back} = navigation;

  async function fetchData() {
    const getJWT = await getJwtToken();
    console.log(getJWT.token); // Sử dụng giá trị của getJWT ở đây
    return getJWT.token;
  }

  const handleChangePass = async () => {
    if (!isValidPasswordConfirm(newPass, confirmPass)) {
      return;
    }

    try {
      const response = await fetch(
        `${envPath.domain_url}Authen/ChangePassword`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${(await fetchData()).toString()}`,
          },
          body: JSON.stringify({
            username: username,
            currentPassword: currentPass,
            newPassword: newPass,
            confirmPassword: confirmPass,
          }),
        },
      );
      const responseData = await response.json();
      console.log(responseData)

      if (response.ok) {
        // Xử lý dữ liệu trả về nếu cần
        Alert.alert('Successful !');
        setTimeout(() => {
            navigate('UITab');
          }, 2000);
      } else if (response.status == '404'){
        // Xử lý lỗi nếu cần
        console.error('Request failed with status:', response.status);
        Alert.alert('Incorrect username !');
      }
      else if (response.status == '500'){
        // Xử lý lỗi nếu cần
        console.error('Request failed with status:', response.status);
        Alert.alert('Incorrect password !');
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Request failed:', error);
      Alert.alert('An error occurred. Please try again later.');
    }
  };
  return (
    <View>
      <Header title={'Change Password'} />
      <KeyboardAwareScrollView>
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
            source={icons.padlock}
          />
        </View>
        <View
          style={{
            height: 480,
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
              Username:
            </Text>
            <TextInput
              onChangeText={text => {
                setUsername(text);
              }}
              style={{
                color: 'black',
                fontSize: fontsizes.h3,
              }}
              placeholder="Enter username"
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
              Current password:
            </Text>
            <TextInput
              onChangeText={text => {
                setCurrentPass(text);
              }}
              style={{
                color: 'black',
                fontSize: fontsizes.h3,
              }}
              placeholder="Enter your current password"
              //value={}
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
                setErrorConfirmPass(
                  isValidPasswordConfirm(currentPass, newPass) == true
                    ? ''
                    : 'ConfirmPassword does not match !',
                );
                setConfirmPass(text)
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
            <Text
            style={{
              color: colors.error_message,
              fontSize: 10,
            }}>
            {errorConfirmPass}
          </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
                handleChangePass();                
              }}
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
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
export default ChangePassword;
