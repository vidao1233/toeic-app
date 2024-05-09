import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Linking,
} from 'react-native';
import {colors, icons, fontsizes} from '../common';
import {Header, ListItem} from '../components';

function Tips(props) {
  //navigation
  const { navigation, route } = props
  //function of navigate to/back
  const { navigate, go_back } = navigation
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header title="Tips to learn" />
      <ScrollView>
        <ListItem
          title={'Part 1: Picture Description'}
          icon={icons.ask_icon}
          onPress={() => {
            navigate('Part1');
          }}
        />
        <ListItem title={'Part 2: Question & Answer'} icon={icons.ask_icon} onPress={() => {
            navigate('Part2');
          }}/>
        <ListItem title={'Part 3: Conversation'} icon={icons.ask_icon} />
        <ListItem title={'Part 4: Speech'} icon={icons.ask_icon} />
        <ListItem
          title={'Part 5: Fill in the sentence'}
          icon={icons.ask_icon}
        />
        <ListItem
          title={'Part 6: Fill in the paragraph'}
          icon={icons.ask_icon}
        />
        <ListItem
          title={'Part 7: Reading comprehension'}
          icon={icons.ask_icon}
        />
      </ScrollView>
    </View>
  );
}
export default Tips;
