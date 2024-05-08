import React, { useState, useEffect } from "react"
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
} from "react-native"
import { colors, icons, images, fontsizes, envPath, } from "../common"
import { CourseItem, Header, Footer, LessonList } from "../components"
import { WebView } from 'react-native-webview'
import HTMLView from 'react-native-htmlview'

function LessonContent(props) {
    const { title, content, idLesson } = props.route.params;
//navigation
const { navigation, route } = props
//function of navigate to/back
const { navigate, go_back } = navigation
    return (
        <View style={{ flex: 1 }}>
            <Header title={title} />
            <ScrollView style={{
                backgroundColor: "white",
                flex: 1,
            }}>
                <HTMLView
                    textComponentProps={{
                        style: {
                            color: colors.dark_primary,
                        }
                    }}
                    value={content}
                />
                <TouchableOpacity            
                onPress={() => {                    
                    navigate('Quiz',{
                        idLesson: idLesson
                    })
                }}
                style={{
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    alignSelf: 'center',
                    width: '50%',
                    borderRadius: 15,
                    flex: 1
                }}>
                <Text style={{
                    padding: 10,
                    fontSize: 18,
                    color: 'white'
                }}
                >Go Quiz ?</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
export default LessonContent