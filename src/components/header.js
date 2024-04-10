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

function Header(props){
    const{title} = props
    return <View style={{
        backgroundColor: colors.dark_primary,
        justifyContent: 'center',
        height: 60
    }}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 7

        }}>
            <Image
                source={icons.logo}
                style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    width: 48,
                    height: 48,
                    tintColor: 'white'
                }}
            />
            <Text style={{
                color: 'white',
                fontSize: 18,
                fontStyle: 'italic'
            }}>{title}</Text>
        </View>
    </View>
}
export default Header