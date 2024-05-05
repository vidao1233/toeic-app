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

function Search(props){
    const [searchText, setSearchText] = useState('')
    return <View style={{
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }}>
        <Image
            source={icons.search}
            style={{
                height: 30,
                width: 30,
                position: 'absolute',
                top: 5,
                left: 5
            }}
        />
        <TextInput
            autoCorrect={false}
            onChangeText={(text) => {
                setSearchText(text)
            }}
            style={{
                color: colors.dark_primary,
                backgroundColor: 'white',
                height: 40,
                flex: 1,
                borderRadius: 5,
                opacity: 0.8,
                paddingStart: 40
            }} />
    </View>
}
export default Search