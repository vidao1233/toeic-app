import React, { useState, useEffect } from "react"
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Image
} from "react-native"
import { colors, icons, images, fontsizes, envPath, } from "../common"
import { CourseItem, Header, Footer, LessonList } from "../components"
import { WebView } from 'react-native-webview'
import HTMLView from 'react-native-htmlview'
import Tts from 'react-native-tts';

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
                //backgroundColor: "black",
                marginHorizontal: 15,
            }}>
                {/* <TouchableOpacity
                onPress={() => {
                    Tts.speak(content);
                  }}>
                <Image
                source={icons.speaker}
                style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    width: 48,
                    height: 48,
                    tintColor: 'white'
                }}
            />
                </TouchableOpacity> */}
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
                    backgroundColor: colors.dark_primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                    marginEnd: 10,
                    alignSelf: 'flex-end',
                    width: '30%',
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