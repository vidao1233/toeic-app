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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CourseItem, Header,  } from "../navigators"

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
        <Header title={'Courses Of VictoryU'}/>
        <View style={{ height: 120}}></View>
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
        <View>
        </View>
    </View>
}
export default CourseList