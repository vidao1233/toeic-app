import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

export const VideoHome = (props) => {
  const { audio } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  return (
    <Video
      source={{ uri: audio }} // Can be a URL or a local file.
      ref={playerRef}
      controls={true}
      audioOnly={true}
      paused={!isPlaying}
      onEnd={() => setIsPlaying(false)}
      onBuffer={() => console.log('Buffering...')} // Example onBuffer handler
      onError={(error) => console.log('Error loading video:', error)} // Example onError handler
      style={styles.backgroundVideo}
    />
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%', // Chiều rộng của player
    height: 50,    // Chiều cao của player (hoặc bất kỳ kích thước nào bạn muốn)
  },
});
