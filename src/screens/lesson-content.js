import React, { useState, useEffect } from "react"
import {
    View,
    ScrollView,
    StyleSheet,
} from "react-native"
import { colors, icons, images, fontsizes, envPath, } from "../common"
import { CourseItem, Header, Footer, LessonList } from "../components"
import { WebView } from 'react-native-webview'
import HTMLView from 'react-native-htmlview'

function LessonContent(props) {
    const { title, content } = props.route.params;

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
            </ScrollView>
        </View>
    );
}
export default LessonContent