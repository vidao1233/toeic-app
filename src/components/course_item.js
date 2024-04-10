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
                height: 150,
                paddingTop: 20,
                paddingStart: 10,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 10
            }}>
            <Image
                style={{
                    height: 100,
                    width: 100,
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
                }}>Name: {`${name}`.toUpperCase()}</Text>
                <View style={{ height: 1, backgroundColor: 'black' }}></View>
                <Text style={{
                    color: 'black',
                    fontSize: fontsizes.h3,
                }}>Description: {description}</Text>
            </View>
        </TouchableOpacity>)
}
export default CourseItem