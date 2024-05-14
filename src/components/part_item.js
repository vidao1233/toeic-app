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
  const {name, icon, description} = props;
  const {onPress} = props;
  
  // Mảng màu pastel
  const partColors = [
    '#f9e9ec', '#e5e0a7', '#e9f7f9', '#f2d3e2', '#a7e5e4', '#a7c6e5', '#a7a7e5', '#d1bdec', '#e6bdec', '#d691df', '#ecbddb', '#df91c3', '#f2d3da', '#e5a7b4'
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
    <View style={{justifyContent:'center', alignItems: 'center'}}>
        <TouchableOpacity
      onPress={onPress}
      style={{
        height: 80,
        width: 80,
        paddingStart: 3,
        backgroundColor: randomColor,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
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
    <Text
          style={{          
            color: 'black',
            fontSize: fontsizes.h5,
            alignSelf: 'center',
            fontWeight: '400',
          }}>
          {`${description}`}
        </Text>
    </View>
  );
}
export default PartItem;
