import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import PushNotification from 'react-native-push-notification';

const AlarmClock = () => {
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState('none');
  const [sound, setSound] = useState(null);

  // Đăng ký thông báo
  const scheduleNotification = () => {
    PushNotification.localNotificationSchedule({
      message: "It's time to wake up!", // Nội dung thông báo
      date: alarmTime, // Thời gian đặt báo thức
      repeatType: repeatFrequency === 'daily' ? 'day' : null, // Lặp lại hàng ngày nếu được chọn
      soundName: sound, // Âm thanh thông báo
    });
  };

  // Thêm hàm scheduleNotification vào setAlarm
  const handleSetAlarm = () => {
    const currentTime = new Date();
    if (alarmTime.getTime() < currentTime.getTime()) {
      Alert.alert('Invalid Time', 'Please select a time in the future');
      return;
    }
    scheduleNotification(); // Đặt thông báo
    AsyncStorage.setItem(
      'alarmSettings',
      JSON.stringify({ alarmTime, repeatFrequency, sound }),
    );
  };

  useEffect(() => {
    const checkAlarm = setInterval(() => {
      const currentTime = new Date();
      if (
        currentTime.getHours() === alarmTime.getHours() &&
        currentTime.getMinutes() === alarmTime.getMinutes()
      ) {
        Alert.alert('Alarm', 'It is time!');
        clearInterval(checkAlarm);
      }
    }, 60000); // Kiểm tra mỗi phút
    return () => clearInterval(checkAlarm);
  }, [alarmTime]);

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const hideTimePickerModal = () => {
    setShowTimePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    hideTimePickerModal();
    if (selectedTime) {
      setAlarmTime(selectedTime);
    }
  };

  const selectAlarmSound = () => {
    // Hiển thị danh sách âm thanh hoặc mở trình duyệt tệp
    // Sau khi người dùng chọn âm thanh, cập nhật state sound
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>AlarmClock</Text>
      </View>

      <View style={styles.clockContainer}>
        <Text style={styles.clockText}>
          {alarmTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={alarmTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}

      <Button title="Set Alarm" onPress={showTimePickerModal} color="#3498db" />

      <Picker
        selectedValue={repeatFrequency}
        onValueChange={(itemValue, itemIndex) => setRepeatFrequency(itemValue)}>
        <Picker.Item label="Không lặp lại" value="none" />
        <Picker.Item label="Hàng ngày" value="daily" />
        <Picker.Item label="Hàng tuần" value="weekly" />
        {/* Thêm các tùy chọn khác nếu cần thiết */}
      </Picker>

      <Button title="Select Alarm Sound" onPress={selectAlarmSound} />

      <Button title="Save Alarm" onPress={handleSetAlarm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1', // Set your desired background color
  },
  header: {
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50', // Set your desired text color
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  clockText: {
    fontSize: 50,
    marginRight: 10,
    color: '#2c3e50', // Set your desired text color
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d', // Set your desired text color
  },
});

export default AlarmClock;
