import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Alert,
    TextInput,
    KeyboardAvoidingView
} from "react-native"
import { colors, icons, images } from "../common"
import { isValidUsername, isValidPassword } from "../untils/validations"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Login(props) {
    //state to validate
    const [errorUsername, setErrorUsername] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    //state to store email/password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const isValidationOK = () => username.length > 0 && password.length > 0
        && isValidUsername(username) == true
        && isValidPassword(password) == true
    return <KeyboardAwareScrollView
        style={{
            flex: 100,
            backgroundColor: 'white'
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
                }}>Already have an account?</Text>
            <Image
                source={images.login}
                style={{
                    width: 190,
                    height: 190,
                    marginEnd: 5,
                    alignSelf: 'center'
                }}
            />
        </View>
        <View style={{
            height: 200,
        }}>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        fontSize: 20,
                        color: colors.primary
                    }}>Username:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorUsername(isValidUsername(text) == true ?
                            '' : 'Username must have at least 5 character!')
                        setUsername(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: 18
                    }}
                    placeholder="Enter your username"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={18}
                    underlineColorAndroid={colors.primary}
                />
                <Text style={{
                    color: colors.error_message,
                    fontSize: 10
                }}>{errorUsername}</Text>
            </View>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        fontSize: 20,
                        color: colors.primary
                    }}>Password:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorPassword(isValidPassword(text) == true ?
                            '' : 'Password must be at least 5 characters')
                        setPassword(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: 18
                    }}
                    secureTextEntry={true}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={18}
                    underlineColorAndroid={colors.primary}
                />
                <Text style={{
                    color: colors.error_message,
                    fontSize: 10
                }}>{errorPassword}</Text>
            </View>
        </View>
        <View
            style={{
                height: 150,
            }}
        >
            <TouchableOpacity
                disabled={isValidationOK() == false}
                onPress={() => {
                    Alert.alert(`Username: ${username}, password: ${password}`)
                }}
                style={{
                    backgroundColor: isValidationOK() == true
                        ? colors.primary : colors.inactive,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    alignSelf: 'center',
                    width: '50%',
                    borderRadius: 15
                }}>
                <Text style={{
                    padding: 10,
                    fontSize: 18,
                    color: 'white'
                }}
                >Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert('Register pressed!')
                }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 5
                }}
            >
                <Text style={{
                    padding: 5,
                    fontSize: 15,
                    color: colors.primary,
                    alignSelf: 'center'
                }}
                >New user? Register now</Text>
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
                    alignItems: 'center'
                }}>
                <View style={{ height: 1, backgroundColor: colors.dark_primary, flex: 1 }} />
                <Text style={{
                    padding: 5,
                    fontSize: 15,
                    color: colors.dark_primary,
                    alignSelf: 'center',
                    marginHorizontal: 10
                }}
                >Use other methods ?</Text>
                <View style={{ height: 1, backgroundColor: colors.dark_primary, flex: 1 }} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <Image source={icons.google}
                    style={{
                        height: 40,
                        width: 40
                    }} />
                <View style={{ width: 15 }} />
                <Image source={icons.facebook_circle}
                    style={{
                        height: 40,
                        width: 40
                    }} />
            </View>
        </View>
    </KeyboardAwareScrollView>
}
export default Login