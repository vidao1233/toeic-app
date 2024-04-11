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
import { colors, icons, images, fontsizes, envPath } from "../common"

function CourseItem(props) {
    const { name, description } = props
    const { onPress } = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 140,
                width: 350,
                paddingStart: 10,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5
            }}>
            <Image
                style={{
                    height: 70,
                    width: 70,
                    resizeMode: 'cover'
                }}
                source={icons.course_icon} />
            <View style={{
                flex: 1,
                marginHorizontal: 15,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: fontsizes.h3,
                    fontWeight: 'bold'
                }}>{`${name}`.toUpperCase()}</Text>
                <View style={{ height: 1, backgroundColor: 'black' }}></View>
                <Text
                    numberOfLines={2}
                    style={{
                        width: 250,
                        color: 'black',
                        fontSize: fontsizes.h4,
                    }}>{description}</Text>
            </View>
        </TouchableOpacity>)
}
export default CourseItem