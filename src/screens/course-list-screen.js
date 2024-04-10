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

function CourseList(props) {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch(`${envPath.domain_url}Course/GetAllCourses`)
            .then(response => response.json())
            .then(data => {
                // data sẽ là mảng các đối tượng course từ API
                setCourses(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return <View style={{
        backgroundColor: colors.primary,
        flex: 100
    }}>
        <Header title={'Courses Of VictoryU'} />
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
            {courses.map(course => {
                return (
                    <View key={course.idCourse}>
                        <CourseItem
                            onPress={() => {
                                Alert.alert(`Pressed course's name ${course.name} !`)
                            }}
                            name={course.name}
                            description={course.description} />
                    </View>)
            })}
        </ScrollView>
    </View>
}
export default CourseList