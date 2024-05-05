import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Alert
} from "react-native"
import { colors, fontsizes, envPath, icons } from "../common"
import { Header, Search } from "../components"

function TestList(props) {
    const [types, setTypes] = useState([])
    const [lessons, setLessons] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    useEffect(() => {
        fetch(`${envPath.domain_url}TestType/GetAllTestTypes`)
            .then(response => response.json())
            .then(data => {
                // data sẽ là mảng các đối tượng type từ API
                setTypes(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    // Render mỗi mục trong FlatListType
    const renderItemType = ({ item }) => (
        <View key={item.idTestType}>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(`Pressed topic's name ${item.typeName} !`)
                }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 85,
                    left: 15,
                }}>
                <Image
                    style={{
                        height: 50,
                        width: 50,
                        margin: 10,
                    }}
                    source={icons.voctopic_icon} />
                <Text
                    numberOfLines={1}
                    style={{
                        width: 60,
                        color: colors.dark_primary,
                        fontSize: fontsizes.h4,
                    }}>{item.typeName}</Text>
            </TouchableOpacity>
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
        <Header title={'Tests Of VictoryU'} />
        <Search />
        <View style={{
            flexDirection: 'row',
            height: 100,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'center',
            marginHorizontal: 10,
            alignItems: 'center'
        }}>
            <Text
                numberOfLines={2}
                style={{
                    width: 170,
                    color: colors.dark_primary,
                    fontSize: fontsizes.h3,
                    fontWeight: 'bold',
                    left: 10
                }}>Select type of test</Text>
            <View style={{ height: 80, width: 2, backgroundColor: colors.dark_primary }} />
            <FlatList
                style={{ width: 300 }}
                horizontal={true}
                data={types}
                renderItem={renderItemType}
                keyExtractor={item => item.idTestType.toString()}
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
export default TestList