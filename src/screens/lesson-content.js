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
    ScrollView,
    FlatList,
    LayoutAnimation
} from "react-native"
import { colors, icons, images, fontsizes, envPath, styles } from "../common"
import { CourseItem, Header, Footer, LessonList } from "../components"

function LessonContent(props) {
    const {title, content} = props    
    
    return <View >
        <Header title={title}/>
        <ScrollView style={{flex: 1}}>
            <Text style={{color: colors.dark_primary}}>
                {content}
            </Text>
        </ScrollView>
    </View>
}
export default LessonContent