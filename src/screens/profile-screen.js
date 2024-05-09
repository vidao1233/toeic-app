import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
  Switch,
  Modal,
  StyleSheet,
} from 'react-native';
import {colors, icons, images, fontsizes, envPath, styles} from '../common';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CourseItem, Header, Footer, LessonList} from '../components';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import { getJwtToken,  } from '../untils/jwt-storage';
import { loginContext } from '../untils/user-context';

async function Profile(props) {
  //state to store email/password
  const [fullname, setFullname] = useState('Dao Thi Thanh Vi');
  const [selectedGender, setSelectedGender] = useState('');
  const [phone, setPhone] = useState('0376294216');
  const [birthDay, setBirthDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const jwt = await getJwtToken();
  const loginInfo = await loginContext(jwt.token);

  // useEffect(() => {
  //   if (testTypeSelected !== null) {
  //     setIsLoading(true);
  //     fetch(`${envPath.domain_url}Authen/Update-Profile/${loginInfo.idUser}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //         body: 
  //         {
  //           FullName:fullname,
  //           dateOfBirth:birthDay,
  //           Gender: selectedGender,
  //           PhoneNumber:phone,            
  //           Enable2FA: isEnabled,
  //           //NewImage:,
  //           //OldImage:,
  //         }
  //       }
  //     )
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         return response.json();
  //       })
  //       .then(data => {
  //         setTests(data);
  //         setIsLoading(false);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching tests:', error);
  //         setIsLoading(false);
  //       });
  //   }
  // }, [testTypeSelected]);

  const genders = ['Male', 'Female'];
  const onDateChange = date => {
    // Đảm bảo tháng và ngày được hiển thị dưới dạng hai chữ số
    const formattedMonth =
      date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const formattedDay =
      date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const formattedDate = `${formattedMonth}/${formattedDay}/${date.getFullYear()}`;
    setBirthDay(formattedDate);
  };
  return (
    <KeyboardAwareScrollView>
      <Header title={'User profile'} />
      <TouchableOpacity>
      <View
        style={{
          borderRadius: 70,
          backgroundColor: colors.inactive,
          height: 150,
          width: 150,
          justifyContent: 'center',
          alignItems: 'center',
          marginStart: 125,
          marginTop: 30,
        }}>
        <Image
          style={{
            height: 150,
            width: 150,
            resizeMode: 'cover',
            borderRadius: 70,
          }}
          source={icons.profile_avatar}
        />
      </View>
      </TouchableOpacity>
      <Text
        style={{
          color: colors.dark_primary,
          fontSize: fontsizes.h2,
          marginTop: 10,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        Đào Vi
      </Text>
      <View
        style={{
          height: 500,
          backgroundColor: 'white',
          marginHorizontal: 20,
          borderRadius: 20,
          marginTop: 30,
        }}>
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: fontsizes.h3,
              color: colors.primary,
            }}>
            Fullname:
          </Text>
          <TextInput
            onChangeText={text => {
              setFullname(text);
            }}
            style={{
              color: 'black',
              fontSize: fontsizes.h3,
            }}
            placeholder="Enter your fullname"
            value={fullname}
            placeholderTextColor={colors.placeHolder}
            fontSize={fontsizes.h3}
            underlineColorAndroid={colors.primary}
          />
        </View>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: fontsizes.h3,
              color: colors.primary,
            }}>
            Phone number:
          </Text>
          <TextInput
            onChangeText={text => {
              setPhone(text);
            }}
            style={{
              color: 'black',
              fontSize: fontsizes.h3,
            }}
            placeholder="01234567 ..."
            value={phone}
            placeholderTextColor={colors.placeHolder}
            fontSize={fontsizes.h3}
            underlineColorAndroid={colors.primary}
          />
        </View>
        <View style={{marginHorizontal: 30}}>
          <Text
            style={{
              marginTop: 10,
              fontSize: fontsizes.h3,
              color: colors.primary,
            }}>
            Birthday:
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInput
              onChangeText={text => {
                setBirthDay(text);
              }}
              value={birthDay ? birthDay.toString() : ''}
              style={{color: 'black', fontSize: fontsizes.h3, flex: 1}}
              placeholder="mm/dd/yyyy"
              placeholderTextColor={colors.placeHolder}
              fontSize={fontsizes.h3}
              underlineColorAndroid={colors.primary}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                marginTop: 10,
              }}>
              <Icon name="calendar" size={30} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={style.modalContainer}>
              <CalendarPicker
                onDateChange={onDateChange}
                selectedDate={birthDay ? new Date(birthDay) : null}
                width={300}
                height={300}
                textStyle={{fontSize: fontsizes.h3, color: 'white'}}
                selectedDayStyle={{backgroundColor: colors.primary}}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={style.closeButton}>
                <Text style={style.closeButtonText}>Choose</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View
          style={{
            marginHorizontal: 30,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: fontsizes.h3,
              color: colors.primary,
            }}>
            Enable TwoFA:
          </Text>
          <Switch
          style={{marginTop: 40, marginLeft: 90, width: 120,}}
            trackColor={{false: colors.inactive, true: colors.dark_primary}}
            thumbColor={isEnabled ? 'white' : colors.inactive}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />          
        </View>
        <View style={{width: 280, backgroundColor: colors.primary, height: 2, marginLeft: 33}} />
        <View style={{backgroundColor: colors.primary, marginTop: 25, height: 53, width: 290, marginHorizontal: 33}}>
        <View style={style.dropdownContainer}>
          <Text style={style.dropdownLabel}>Gender:</Text>
          <Picker
            dropdownIconColor={colors.dark_primary}
            selectedValue={selectedGender}
            onValueChange={itemValue => setSelectedGender(itemValue)}
            style={style.dropdown}>
            {genders.map((gender, index) => (
              <Picker.Item
                style={{justifyContent: 'center'}}
                key={index}
                label={gender}
                value={gender}
              />
            ))}
          </Picker>
        </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(`Update success !`);
          }}
          style={{
            backgroundColor: colors.dark_primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            alignSelf: 'center',
            width: '50%',
            borderRadius: 15,
          }}>
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              color: 'white',
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
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
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: 80,
  },
  closeButtonText: {
    fontSize: fontsizes.h3,
    color: 'white',
    alignSelf: 'center',
  },
  dropdownContainer: {
    marginBottom: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 51,
    width: 311.5,
  },
  dropdownLabel: {
    fontSize: fontsizes.h3,
    color: colors.primary,
  },
  dropdown: {
    color: 'black',
    fontSize: fontsizes.h3,
    height: 40,
    width: 250,
    marginLeft: 5,
    marginRight: 30,
  },
});
export default Profile;
