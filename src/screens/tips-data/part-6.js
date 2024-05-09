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

function Part6(props) {
  //navigation
  const {navigation, route} = props;
  //function of navigate to/back
  const {navigate, go_back} = navigation;
  return (
    <View style={style.container}>
        <Header title={'Tips'} />
        <ScrollView>
      
        <View >
          <Image style={style.image} source={images.part2} />
          <Text style={style.title}>Part 2: Question & Answer</Text>
          <Text style={style.content}>
            {`
Part 2 includes 25 questions (from questions 7 - 31), in each question you will hear a question or statement and 3 answers (answers A, B, C).
All can only be read once and not printed on the exam. You need to choose the most suitable answer to the question and mark it on the answer sheet.
Allocate homework time:
Step 1: Listen to a question or a statement.
Step 2: Listen to 3 more answers/responses to the above sentence (corresponding to 3 options A, B, C).
Step 3: Choose the most suitable answer for the question.
Step 4: Use 5 seconds to rest between 2 sentences to prepare for the next sentence.`}
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
              marginLeft: 15,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 25,
  },
  title: {
    fontSize: fontsizes.h1,
    color: colors.dark_primary,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  content: {
    marginTop: 20,
    fontSize: fontsizes.h3,
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

export default Part6;
