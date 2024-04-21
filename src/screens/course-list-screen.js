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
    LessonContent
} from "react-native"
import { colors, icons, images, fontsizes, envPath, styles } from "../common"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CourseItem, Header, Footer, LessonList } from "../components"

function CourseList(props) {
    const [courses, setCourses] = useState([])
    const [lessons, setLessons] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState(null);
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

    useEffect(() => {
        if (selectedCourseId !== null) {
            // Gọi API để lấy danh sách các bài học của khóa học có idCourse là selectedCourseId
            fetch(`${envPath.domain_url}Lesson/GetAllLessonByCourse/${selectedCourseId}`)
                .then(response => response.json())
                .then(data => {
                    setLessons(data);
                })
                .catch(error => {
                    console.error('Error fetching lesson data:', error);
                });
        }
    }, [selectedCourseId]);
    //handle pressed course
    const handleCoursePress = (courseId) => {
        setSelectedCourseId(courseId); // Lưu idCourse được chọn
    };
    // Render mỗi mục trong FlatListLeson
    const renderItemLesson = ({ item }) => (
        <View key={item.idLesson}>
            <LessonList
                onPress={() => {
                    navigate('LessonContent',
                        {
                            title: item.title,
                            content: item.content,
                            id: item.idLesson
                        })
                }}
                title={item.title} />
        </View>);
    // Render mỗi mục trong FlatListCourse
    const renderItemCourse = ({ item }) => (
        <View key={item.idCourse}>
            <CourseItem
                onPress={() => {
                    handleCoursePress(item.idCourse)
                }}
                name={item.name}
                description={item.description} />
        </View>);
    //navigation
    const { navigation, route } = props
    //function of navigate to/back
    const { navigate, go_back } = navigation
    return <View style={{
        backgroundColor: colors.primary,
        flex: 1,
        flexDirection: 'column'
    }}>
        <Header title={'Courses Of VictoryU'} />
        <View style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text
                numberOfLines={2}
                style={{
                    width: 260,
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>CHOOSE A COURSE TO START !</Text>
        </View>
        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                horizontal={true}
                data={courses}
                renderItem={renderItemCourse}
                keyExtractor={item => item.idCourse.toString()}
            />
        </View>
        <View style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text
                numberOfLines={2}
                style={{
                    width: 250,
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>Lesson list</Text>
        </View>
        <View style={{
            height: 430,
            backgroundColor: 'white',
            borderRadius: 30,
            marginHorizontal: 15

        }}>
            {selectedCourseId !== null && lessons.length > 0 ? (
                <FlatList
                    data={lessons}
                    renderItem={renderItemLesson}
                    keyExtractor={item => item.idLesson.toString()}
                />
            ) : <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: fontsizes.h3
                }}>No lesson found</Text>
            </View>}
        </View>
    </View>
}
export default CourseList