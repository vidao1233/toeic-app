import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../components';
import {colors, fontsizes, images, icons} from '../../common';

function Part1(props) {
  //navigation
  const {navigation, route} = props;
  //function of navigate to/back
  const {navigate, go_back} = navigation;
  return (
    <ScrollView>
      <View style={style.container}>
        <Header title={'Tips'} />
        <Image style={style.image} source={images.part1} />
        <Text style={style.title}>Part 1: Picture Description</Text>
        <Text style={style.content}>
          {`Overview: Part 1 includes 6 questions (from questions 1 - 6), corresponding to 6 images, each image has 4 answers A, B, C, D for you to choose from. 
          When you hear these questions, you must choose the answer that best describes what you see in the photo. You can only listen to each picture once, so you need to pay close attention while listening so you don't miss the information.`}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 160}}>
        <TouchableOpacity
          onPress={() => {
            navigate('Part2');
          }}
          style={{
            marginTop: 2,
          }}>
          <Text
            style={{
              padding: 5,
              fontSize: 15,
              color: colors.primary,
              textAlign: 'right',
            }}>
            Part 2: Question & Answer
          </Text>
        </TouchableOpacity>
        <Image
          source={icons.right_arrow}
          style={{
            paddingEnd: 10,
            height: 10,
            width: 15,
            alignSelf: 'center',
            opacity: 0.3,
            marginLeft: 15
          }}
        />
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: fontsizes.h1,
    color: colors.dark_primary,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  content: {
    marginTop: 20,
    fontSize: 17,
    color: 'black',
    lineHeight: 30,
    textAlign: 'justify',
    marginHorizontal: 20,
  },
  image: {
    marginTop: 10,
    height: 200,
    width: 300,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});

export default Part1;
