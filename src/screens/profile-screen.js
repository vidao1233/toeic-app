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
    Modal,
    StyleSheet
} from "react-native"
import { colors, icons, images, fontsizes, envPath, styles } from "../common"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CourseItem, Header, Footer, LessonList } from "../components"
import CalendarPicker from "react-native-calendar-picker"
import Icon from 'react-native-vector-icons/dist/FontAwesome'

function Profile(props) {

    //state to store email/password
    const [fullname, setFullname] = useState('Dao Thi Thanh Vi')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('0376294216')
    const [birthDay, setBirthDay] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const onDateChange = (date) => {
        setBirthDay(date);
    };
    return <View>
        <Header title={'User profile'} />
        <View style={{
            borderRadius: 70,
            backgroundColor: colors.inactive,
            height: 150,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
            marginStart: 125,
            marginTop: 30
        }}>
            <Image
                style={{
                    height: 150,
                    width: 150,
                    resizeMode: 'cover',
                    borderRadius: 70
                }}
                source={icons.profile_avatar} />
        </View>
        <Text style={{
            color: colors.dark_primary,
            fontSize: fontsizes.h2,
            marginTop: 10,
            justifyContent: 'center',
            alignSelf: 'center'
        }}>Đào Vi</Text>
        <View style={{
            height: 460,
            backgroundColor: 'white',
            marginHorizontal: 20,
            borderRadius: 20,
            marginTop: 30
        }}>
            <View style={{
                marginHorizontal: 30,
                marginTop: 20
            }}>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: fontsizes.h3,
                        color: colors.primary
                    }}>Fullname:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setFullname(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: fontsizes.h3
                    }}
                    placeholder="Enter your fullname"
                    value={fullname}
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary}
                />
            </View>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: fontsizes.h3,
                        color: colors.primary
                    }}>Phone number:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setPhone(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: fontsizes.h3
                    }}
                    placeholder="01234567 ..."
                    value={phone}
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary}
                />
            </View>
            <View style={{
                marginHorizontal: 30,
            }}>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: fontsizes.h3,
                        color: colors.primary
                    }}>Gender:</Text>
                <TextInput
                    onChangeText={(text) => {
                        setGender(text)
                    }}
                    style={{
                        color: 'black',
                        fontSize: fontsizes.h3
                    }}
                    placeholder="Enter your username"
                    placeholderTextColor={colors.placeHolder}
                    fontSize={fontsizes.h3}
                    underlineColorAndroid={colors.primary} />
            </View>
            <View style={{ marginHorizontal: 30 }}>
                <Text style={{ marginTop: 10, fontSize: fontsizes.h3, color: colors.primary }}>Birthday:</Text>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TextInput
                        onChangeText={(text) => {
                            setBirthDay(text);
                        }}
                        value={birthDay}
                        style={{ color: 'black', fontSize: fontsizes.h3, flex: 1 }}
                        secureTextEntry={true}
                        placeholder="mm/dd/yyyy"
                        placeholderTextColor={colors.placeHolder}
                        fontSize={fontsizes.h3}
                        underlineColorAndroid={colors.primary}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(true)}
                        style={{
                            marginTop: 10
                        }}>
                        <Icon name="calendar" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}>
                    <View
                        style={style.modalContainer}>
                        <CalendarPicker
                            onDateChange={onDateChange}
                            selectedDate={birthDay}
                            width={300} // Độ rộng của CalendarPicker
                            height={300} // Độ cao của CalendarPicker
                            textStyle={{ fontSize: fontsizes.h3, color: 'white' }}
                            selectedDayStyle={{ backgroundColor: colors.primary }}
                        />
                        <TouchableOpacity onPress={() => {
                            setModalVisible(false)}} 
                            style={style.closeButton}>
                            <Text style={style.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(`Update success !`)
                }}
                style={{
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    alignSelf: 'center',
                    width: '50%',
                    borderRadius: 15
                }}>
                <Text style={{
                    padding: 10,
                    fontSize: 18,
                    color: 'white'
                }}
                >Update</Text>
            </TouchableOpacity>
        </View>
    </View>

}
const style = StyleSheet.create({
    modalContainer: {
        height: 450,
        width: 350,
        marginHorizontal: 33,
        marginVertical: 200,
        backgroundColor: colors.dark_primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 5,
        width: 80
    },
    closeButtonText: {
        fontSize: fontsizes.h3,
        color: 'white',
        alignSelf: 'center'
    },
});
export default Profile