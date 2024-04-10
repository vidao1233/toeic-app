import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from "react-native"
import { colors, icons, images, fontsizes, envPath } from "../common"

function Footer(props) {
    return <View style={{
        flexDirection: 'row',
        height: 60,
        backgroundColor: colors.dark_primary,
        justifyContent: 'center'
    }}>
        <TouchableOpacity style={{
            marginHorizontal: 20
        }}>
            <Image source={icons.home}
                style={{
                    height: 40,
                    width: 40,
                    tintColor: 'white',
                    marginTop: 10
                }} />
        </TouchableOpacity>
        <TouchableOpacity style={{
            marginHorizontal: 20
        }}>
            <Image source={icons.online_course}
                style={{
                    height: 40,
                    width: 40,
                    tintColor: 'white',
                    marginTop: 10
                }} />
        </TouchableOpacity>
        <TouchableOpacity style={{
            marginHorizontal: 20
        }}>
            <Image source={icons.vocabularies}
                style={{
                    height: 40,
                    width: 40,
                    tintColor: 'white',
                    marginTop: 10
                }} />
        </TouchableOpacity>
        <TouchableOpacity style={{
            marginHorizontal: 20
        }}>
            <Image source={icons.test}
                style={{
                    height: 40,
                    width: 40,
                    tintColor: 'white',
                    marginTop: 10
                }} />
        </TouchableOpacity>
        <TouchableOpacity style={{
            marginHorizontal: 20
        }}>
            <Image source={icons.setting}
                style={{
                    height: 40,
                    width: 40,
                    tintColor: 'white',
                    marginTop: 10
                }} />
        </TouchableOpacity>
    </View>
}
export default Footer