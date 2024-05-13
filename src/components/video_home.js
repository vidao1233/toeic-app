import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    StyleSheet
} from "react-native"
import { colors, icons, images, fontsizes, envPath } from "../common"
import Video from 'react-native-video';

export const VideoHome = () => {
    const [isPlaying, setIsPlaying] = useState([]);
    return <View
    style={{
      height: 160,
      alignItems: 'center',
      justifyContent: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 15,
    }}>
    <Video
      source={{
        uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      }} // Can be a URL or a local file.
      ref={ref => {
        this.player = ref;
      }}
      controls={true}
      autoplay={true}
      paused={!isPlaying}
      onEnd={() => setIsPlaying(false)} // Store reference
      onBuffer={this.onBuffer} // Callback when remote video is buffering
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.backgroundVideo}
    />
  </View>

}
const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 10,
      left: 70,
      bottom: 0,
      right: 78,
    },
  });