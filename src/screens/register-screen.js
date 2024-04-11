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
import { colors, icons, images, fontsizes } from "../common"
import { isValidUsername, isValidPassword, isValidFullname, isValidEmail } from "../untils/validations"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Register(props) {
    //state to validate
    const [errorUsername, setErrorUsername] = useState('')
    const [errorFullname, setErrorFullname] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    //state to store email/password
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isValidationOK = () => username.length > 0 && password.length > 0
        && isValidUsername(username) == true
        && isValidPassword(password) == true
    //navigation
    const {navigation, route} = props
    //function of navigate to/back
    const {navigate, go_back} = navigation
    return <KeyboardAwareScrollView
        style={{
            flex: 100,
            backgroundColor: colors.primary
        }}>
        <View
            style={{
                height: 200,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Text
                style={{
                    color: 'white',
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginStart: 5,
                    width: '50%',
                }}>Here's your first step with us !</Text>
            <Image
                source={images.register}
                style={{
                    width: 190,
                    height: 190,
                    marginEnd: 5,
                    alignSelf: 'center'
                }}
            />
        </View>
        <View style={{
            height: 460,
            backgroundColor: 'white',
            marginHorizontal: 20,
            borderRadius: 20
        }}>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: fontsizes.h3,
                        color: colors.primary
                    }}>Fullname:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorFullname(isValidFullname(text) == true ?
                            '' : 'Fullname cannot null !')
                        setFullname(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: fontsizes.h3
                    }}
                    placeholder="Enter your fullname"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary}
                />
                <Text style={{
                    color: colors.error_message,
                    fontSize: fontsizes.h4
                }}>{errorFullname}</Text>
            </View>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        fontSize: fontsizes.h3,
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
                        fontSize: fontsizes.h3
                    }}
                    placeholder="Enter your username"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary}
                />
                <Text style={{
                    color: colors.error_message,
                    fontSize: fontsizes.h4
                }}>{errorUsername}</Text>
            </View>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        fontSize: fontsizes.h3,
                        color: colors.primary
                    }}>Email:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setErrorEmail(isValidEmail(text) == true ?
                            '' : 'Email is incorrect format!')
                        setEmail(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: fontsizes.h3
                    }}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary}
                />
                <Text style={{
                    color: colors.error_message,
                    fontSize: fontsizes.h4
                }}>{errorEmail}</Text>
            </View>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        fontSize: fontsizes.h3,
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
                        fontSize: fontsizes.h3
                    }}
                    secureTextEntry={true}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary}
                />
                <Text style={{
                    color: colors.error_message,
                    fontSize: fontsizes.h4
                }}>{errorPassword}</Text>
            </View>
            <TouchableOpacity
                //disabled={isValidationOK() == false}
                onPress={() => {
                    navigate("Login")
                }}
                style={{
                    backgroundColor: colors.primary,
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
                >Register</Text>
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
                <View style={{ height: 1, backgroundColor: 'white', flex: 1 }} />
                <Text style={{
                    padding: 5,
                    fontSize: 15,
                    color: 'white',
                    alignSelf: 'center',
                    marginHorizontal: 10
                }}
                >Use other methods ?</Text>
                <View style={{ height: 1, backgroundColor: 'white', flex: 1 }} />
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
export default Register