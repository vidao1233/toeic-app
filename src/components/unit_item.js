import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import TrackPlayer, { usePlaybackState, useTrackPlayerProgress } from 'react-native-track-player';

function UnitItem(props) {
  const { idQuestionUnit, paragraph, audio, image, script, translation } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackState = usePlaybackState();
  const { position, duration } = useTrackPlayerProgress();

  const soundRef = useRef(null);

  useEffect(() => {
    if (audio) {
      TrackPlayer.setupPlayer().then(() => {
        TrackPlayer.add({
          id: 'track',
          url: audio,
          title: 'Audio Track',
        });
      });
    }

    return () => {
      TrackPlayer.destroy();
    };
  }, [audio]);

  useEffect(() => {
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [playbackState]);

  const togglePlayPause = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <View>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      {audio && (
        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePlayPause}>
            <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
          <Text>{formatTime(position)} / {formatTime(duration)}</Text>
        </View>
      )}
    </View>
  );
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default UnitItem;

const styles = StyleSheet.create({
  image: {
    marginBottom: 5,
    height: 300,
    width: 350,
    resizeMode: 'stretch',
    alignSelf: 'center',
    backgroundColor: 'gray' // Thay đổi màu sắc nếu cần
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
