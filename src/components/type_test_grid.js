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

function TypeItem(props) {
  const {name, icon} = props;
  const {onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 80,
        width: 160,
        paddingStart: 10,
        backgroundColor: 'white',
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
export default TypeItem;