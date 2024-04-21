import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    TextInput,
    StyleSheet
} from "react-native"
import { colors, icons, fontsizes, } from "../common"
import { Header, } from "../components"

function ChangePassword(props) {
    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    return <View>
        <Header title={'Change Password'} />
        <View style={{
            height: 150,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
            marginStart: 125,
            marginTop: 30
        }}>
            <Image
                style={{
                    height: 150,
                    width: 150,
                    resizeMode: 'cover',
                    tintColor: colors.dark_primary,
                }}
                source={icons.padlock} />
        </View>
        <View style={{
            height: 400,
            backgroundColor: 'white',
            marginHorizontal: 20,
            borderRadius: 20,
            marginTop: 30
        }}>
            <View style={{
                marginHorizontal: 30,
                marginTop: 20
            }}>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: fontsizes.h3,
                        color: colors.dark_primary
                    }}>Current password:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setCurrentPass(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: fontsizes.h3
                    }}
                    placeholder="Enter your current password"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary}
                />
            </View>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: fontsizes.h3,
                        color: colors.dark_primary
                    }}>New password:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setNewPass(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: fontsizes.h3
                    }}
                    placeholder="Enter your new password"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary}
                />
            </View>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: fontsizes.h3,
                        color: colors.dark_primary
                    }}>Confirm password:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setConfirmPass(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: fontsizes.h3
                    }}
                    placeholder="Enter your confirm password"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary} />
            </View>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(`Update success !`)
                }}
                style={{
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    alignSelf: 'center',
                    width: '50%',
                    borderRadius: 15
                }}>
                <Text style={{
                    padding: 10,
                    fontSize: 18,
                    color: 'white'
                }}
                >Update</Text>
            </TouchableOpacity>
        </View>
    </View>

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
        alignItems: 'center'
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 5,
        width: 80
    },
    closeButtonText: {
        fontSize: fontsizes.h3,
        color: 'white',
        alignSelf: 'center'
    },
});
export default ChangePassword