import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {colors, icons, fontsizes, envPath, images} from '../common';
import {Header, TestItem} from '../components';

function Coming(props) {
    
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
      <Header title="NEW FEARTURE" />
      <Image style={styles.image} source={images.fulltest} />
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}>
        <Text style={styles.title}>
            Coming soon !
        </Text>
      </View>
    </View>
  );
}
export default Coming;

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
        color: 'black',
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'center',
      },
      image: {
        marginBottom: 15,
        height: 220,
        width: 415,
        resizeMode: 'contain',
        alignSelf: 'center',
        backgroundColor: 'white',
      },
})