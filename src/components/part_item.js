import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {colors, icons, images, fontsizes, envPath} from '../common';

function PartItem(props) {
  const {name, icon} = props;
  const {onPress} = props;
  
  // Mảng màu pastel
  const partColors = [
    '#FFFD96', '#FFD1DC', '#AEC6CF', '#B0E57C', '#B19CD9', '#FFB347', '#AFEEEE', '#FFDAB9', '#E6E6FA', '#98FF98', '#FF6F61', '#C8A2C8', '#FA8072', '#87CEEB'
  ];

  // Hàm xáo trộn mảng
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Xáo trộn mảng mỗi lần component được render
  const shuffledColors = shuffleArray([...partColors]);

  // Lấy một màu từ mảng đã xáo trộn
  const randomColor = shuffledColors.pop();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 80,
        width: 80,
        paddingStart: 10,
        backgroundColor: randomColor,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
      }}>
      <Image
        style={{
          height: 40,
          width: 40,
          marginTop: 5
        }}
        source={icon}
      />
        <Text
          style={{
            color: 'black',
            fontSize: fontsizes.h3,
            fontWeight: 'bold',
          }}>
          {`${name}`}
        </Text>
    </TouchableOpacity>
  );
}
export default PartItem;
