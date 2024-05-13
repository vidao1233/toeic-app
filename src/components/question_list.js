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

function QuestionList(props) {
    const { title, ansA, ansB, ansC, ansD } = props
    const { onPress } = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 50,
                paddingTop: 20,
                paddingStart: 10,
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 5,
            }}>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 5,
                alignItems: 'center'
            }}>
                <Image
                    source={icons.goal}
                    style={{
                        height: 20,
                        width: 20,
                        alignSelf: 'center',
                    }} />
                <Text
                    numberOfLines={1}
                    style={{
                        width: 350,
                        color: colors.dark_primary,
                        fontSize: fontsizes.h3,
                        paddingLeft: 10,
                        fontWeight: 'bold',
                    }}>{`${title}`}</Text>

            </View>
            <View style={{
                backgroundColor: colors.dark_primary,
                height: 1,
            }} />

        </TouchableOpacity>)
}
export default QuestionList