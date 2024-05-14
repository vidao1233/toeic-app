import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  View, Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {colors, icons, fontsizes, envPath, images} from '../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
import Question from './question_item';

function UnitItem(props) {
  const {paragraph, audio, image, script, translation} = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    if (audio) {
      soundRef.current = new Sound(audio, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
      });
    }
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, [audio]);

  const togglePlayPause = () => {
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play(success => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={{backgroundColor: colors.primary, marginTop: 20, borderRadius: 20, marginHorizontal: 10}}>
      {image && <Image style={styles.image} source={{uri: image}} />}
      {audio && (
        <View style={styles.controls}>          
          <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
          <View style={{flexDirection: 'row'}}>
          <Icon name={isPlaying ? "pause-circle" : "play-circle"} size={30} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play to listen'}</Text>
          </View>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.titleText}>Answer the questions below:</Text>
    </View>
  );
}
export default UnitItem;
const styles = StyleSheet.create({
  textTitleContain: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark_primary,
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 15,
  },
  title: {
    width: 260,
    color: 'grey',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
  },
  titleText: {
    color: 'white', // Customize text color
    fontSize: fontsizes.h3, // Customize text size
    alignSelf: 'center',
    marginBottom: 5
  },
  image: {
    marginVertical: 10,
    height: 300,
    width: 350,
    resizeMode: 'stretch',
    alignSelf: 'center',
    backgroundColor: colors.inactive,
    borderRadius: 15
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 30
  },
  button: {
    backgroundColor: colors.dark_primary, // Customize button color
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '50%',
  },
  buttonText: {
    color: 'white', // Customize text color
    fontSize: 18, // Customize text size
    fontWeight: 'bold', // Customize text weight
  },
  icon: {
    marginRight: 5, // Khoảng cách giữa icon và text (nếu cần)
  },
});
