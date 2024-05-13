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
import {
  storeJwtToken,
  getRememberedCredentials,
  storeRememberedCredentials,
  removeRememberedCredentials,
} from '../untils/jwt-storage';
import CheckBox from '@react-native-community/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login(props) {
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const credentials = await getRememberedCredentials();
      if (credentials) {
        setUsername(credentials.username);
        setPassword(credentials.password);
      }
    };
    fetchData();
  }, []);

  const isValidationOK = () =>
    username.length > 0 &&
    password.length > 0 &&
    isValidUsername(username) &&
    isValidPassword(password);

  const handleLogin = async () => {
    if (!isValidationOK()) {
      return;
    }

    try {
      const response = await fetch(`${envPath.domain_url}Authen/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        if (rememberMe) {
          removeRememberedCredentials();
          storeRememberedCredentials(username, password);
        }
        storeJwtToken(
          responseData.emailConfirmed.toString(),
          responseData.expiration,
          responseData.freeTest.toString(),
          responseData.token,
        );
        Alert.alert('Login successful.');
        navigate('UITab');
      } else if (response.status == 404) {
        Alert.alert(
          "Account doesn't exist. Please register or check email to confirm.",
        );
      }
    } catch (error) {
      console.error('Request failed:', error);
      Alert.alert('An error occurred. Please try again later.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //navigation
  const {navigation, route} = props;
  //function of navigate to/back
  const {navigate, go_back} = navigation;
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 100,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          height: 300,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            color: '#5881c1',
            fontSize: 28,
            fontWeight: 'bold',
            marginStart: 5,
            width: '50%',
          }}>
          Already have an account?
        </Text>
        <Image
          source={images.login}
          style={{
            width: 190,
            height: 190,
            marginEnd: 5,
            alignSelf: 'center',
          }}
        />
      </View>
      <View
        style={{
          height: 200,
        }}>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.primary,
            }}>
            Username:
          </Text>
          <TextInput
            onChangeText={text => {
              handleRemember();
              setErrorUsername(
                isValidUsername(text) == true
                  ? ''
                  : 'Username must have at least 5 character!',
              );
              setUsername(text);
            }}
            style={{
              color: 'black',
              fontSize: 18,
            }}
            placeholder="Enter your username"
            value={username}
            placeholderTextColor={colors.placeHolder}
            fontSize={18}
            underlineColorAndroid={colors.primary}
          />
          <Text
            style={{
              color: colors.error_message,
              fontSize: 10,
            }}>
            {errorUsername}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: colors.primary,
            }}>
            Password:
          </Text>
            <View style={{flexDirection: 'row'}}>
            <TextInput
            onChangeText={text => {
              setErrorPassword(
                isValidPassword(text) == true
                  ? ''
                  : 'Password must be at least 5 characters',
              );
              setPassword(text);
            }}
            style={{
              color: 'black',
              fontSize: 18,
              width: 350,
            }}
            secureTextEntry={!showPassword}
            placeholder="Enter your password"
            value={password}
            placeholderTextColor={colors.placeHolder}
            fontSize={18}
            underlineColorAndroid={colors.primary}
          />
          <TouchableOpacity
            onPress={toggleShowPassword}
            style={{position: 'absolute', right: 5, top: 10}}>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
            </View>
          <Text
            style={{
              color: colors.error_message,
              fontSize: 10,
            }}>
            {errorPassword}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 30,
        }}>
        <CheckBox
          style={{
            borderColor: rememberMe ? colors.dark_primary : 'black',
            borderWidth: 1,
          }}
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text
          disabled={false}
          style={{
            padding: 5,
            fontSize: 15,
            color: colors.primary,
            alignSelf: 'center',
          }}>
          Remember me ?
        </Text>
      </View>
      <View
        style={{
          height: 150,
        }}>
        <TouchableOpacity
          disabled={isValidationOK() == false}
          onPress={handleLogin}
          style={{
            backgroundColor:
              isValidationOK() == true ? colors.dark_primary : colors.inactive,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
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
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('ForgotPassword');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 5,
          }}>
          <Text
            style={{
              padding: 5,
              fontSize: 15,
              color: colors.primary,
              alignSelf: 'center',
            }}>
            Forgot password ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('Register');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 5,
          }}>
          <Text
            style={{
              padding: 5,
              fontSize: 15,
              color: colors.primary,
              alignSelf: 'center',
            }}>
            New user? Register now !
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 150,
          marginHorizontal: 30,
        }}>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{height: 1, backgroundColor: colors.dark_primary, flex: 1}}
          />
          <Text
            style={{
              padding: 5,
              fontSize: 15,
              color: colors.dark_primary,
              alignSelf: 'center',
              marginHorizontal: 10,
            }}>
            Use other methods ?
          </Text>
          <View
            style={{height: 1, backgroundColor: colors.dark_primary, flex: 1}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Image
            source={icons.google}
            style={{
              height: 40,
              width: 40,
            }}
          />
          <View style={{width: 15}} />
          <Image
            source={icons.facebook_circle}
            style={{
              height: 40,
              width: 40,
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default Login;
