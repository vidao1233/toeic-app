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

function VocabularyItem(props) {
    const { idTopic, engWord, pronunciation, wordType, meaning } = props
    const { onPress } = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 130,
                paddingTop: 10,
                paddingStart: 10,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 10,
                marginHorizontal: 10,
                marginVertical: 10
            }}>
            <Image
                style={{
                    height: 60,
                    width: 60,
                    resizeMode: 'cover',
                    marginVertical: 25
                }}
                source={icons.vocab_icon} />
            <View style={{
                flex: 1,
                marginHorizontal: 15,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: fontsizes.h3,
                    fontWeight: 'bold'
                }}>{engWord} ({wordType})</Text>
                <View style={{ height: 1, backgroundColor: 'black' }}></View>
                <Text style={{
                    color: 'black',
                    fontSize: fontsizes.h3,
                }}>Pronun: {pronunciation}</Text>
                <Text style={{
                    color: 'black',
                    fontSize: fontsizes.h3,
                }}>Mean: {meaning}</Text>
            </View>
        </TouchableOpacity>)
}
export default VocabularyItem