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
import { colors, icons, images, fontsizes, envPath, styles } from "../common"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CourseItem, Header, Footer } from "../components"

function LessonByCourse(props) {
    const {id} = props
    const [lessons, setLessons] = useState([])
    useEffect(() => {
        fetch(`${envPath.domain_url}Lesson/GetAllLessonByCourse/${id}`)
            .then(response => response.json())
            .then(data => {
                // data sẽ là mảng các đối tượng lesson từ API
                setLessons(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const [course, setCourse] = useState([])
    useEffect(() => {
        fetch(`${envPath.domain_url}Course/GetCourseById/${id}`)
            .then(response => response.json())
            .then(data => {
                // data sẽ là đối tượng course từ API
                setCourse(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return <View style={{
        backgroundColor: colors.primary,
        flex: 100
    }}>
        <Header title={`${course.nametoUpperCase()}`} />
        <View style={{
            height: 120,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text
                numberOfLines={2}
                style={{
                    width: 260,
                    color: colors.dark_primary,
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>CHOOSE A COURSE TO START !</Text>
        </View>
        <ScrollView>
            {lessons.map(lesson => {
                return (
                    <View key={lesson.idLesson}>
                        <CourseItem
                            onPress={() => {
                                Alert.alert(`Pressed course's name ${lesson.title} !`)
                            }}
                            name={course.name}
                            description={course.description} />
                    </View>)
            })}
        </ScrollView>
    </View>
}
export default LessonByCourse