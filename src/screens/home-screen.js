import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {colors, icons, fontsizes, envPath, images} from '../common';
import {Header, CourseItem, VideoHome, TypeItem, PartItem} from '../components';
import {FlatGrid} from 'react-native-super-grid';

function Home(props) {
  const [types, setTypes] = useState([]);
  const [listenParts, setListenParts] = useState([]);
  const [readParts, setReadParts] = useState([]);
  const dataTypes = [
    {
      idTestType: '123',
      typeName: 'Mini Test',
      description: `Random 48 questions`,
      icon: icons.rocket,
    },
    {
      idTestType: '124',
      typeName: 'Full Test',
      description: `Full test 200 questions`,
      icon: icons.puzzle,
    },
  ];

  const dataPartListen = [
    {
      partId: '121',
      partName: 'Part 1',
      icon: icons.p1,
      description: 'Photographs',
    },
    {
      partId: '122',
      partName: 'Part 2',
      icon: icons.p2,
      description: `Questions`,
    },
    {
      partId: '123',
      partName: 'Part 3',
      icon: icons.p3,
      description: `Conversation`,
    },
    {
      partId: '124',
      partName: 'Part 4',
      icon: icons.p4,
      description: `Short talks`,
    },
  ];
  const dataPartRead = [
    {
      partId: '125',
      partName: 'Part 5',
      icon: icons.p5,
      description: `Sentences`,
    },
    {
      partId: '126',
      partName: 'Part 6',
      icon: icons.p6,
      description: `Text completion`,
    },
    {
      partId: '127',
      partName: 'Part 7',
      icon: icons.p7,
      description: `Reading`,
    },
  ];

  useEffect(() => {
    setTypes(dataTypes);
  }, []);
  useEffect(() => {
    setListenParts(dataPartListen);
  }, []);
  useEffect(() => {
    setReadParts(dataPartRead);
  }, []);

  const renderItemType = ({item}) => (
    <View key={item.idTestType}>
      <TypeItem
        onPress={() => {
          const typeNameWithoutSpaces = item.typeName.replace(/\s/g, '');
          navigate(`${typeNameWithoutSpaces}`);
        }}
        name={item.typeName}
        icon={item.icon}
        description={item.description}
      />
    </View>
  );
  const renderItemPart = ({item}) => (
    <View key={item.partId}>
      <PartItem
        onPress={() => {
          navigate('CourseList');
        }}
        name={item.partName}
        icon={item.icon}
        description={item.description}
      />
    </View>
  );
  //navigation
  const {navigation, route} = props;
  //function of navigate to/back
  const {navigate, go_back} = navigation;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <Header title={'Home'} />
      <Image style={styles.image} source={images.banner} />
      <ScrollView style={{backgroundColor: colors.primary}}>
        <View style={styles.textTitleContain}>
          <Text numberOfLines={1} style={styles.title}>
            TOEIC Practice
          </Text>
        </View>
        <View
          style={{
            height: 115,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <FlatList
            horizontal={true}
            data={types}
            renderItem={renderItemType}
            keyExtractor={item => item.idTestType.toString()}
          />
        </View>
        <View style={styles.textTitleContain}>
          <Text numberOfLines={1} style={styles.title}>
            Practice Listening
          </Text>
        </View>
        <View
          style={{
            height: 115,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <FlatList
            horizontal={true}
            data={listenParts}
            renderItem={renderItemPart}
            keyExtractor={item => item.partId.toString()}
          />
        </View>
        <View style={styles.textTitleContain}>
          <Text numberOfLines={1} style={styles.title}>
            Practice Reading
          </Text>
        </View>
        <View
          style={{
            height: 115,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <FlatList
            horizontal={true}
            data={readParts}
            renderItem={renderItemPart}
            keyExtractor={item => item.partId.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: fontsizes.medium,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  itemText: {
    fontSize: fontsizes.medium,
    color: colors.dark_primary,
  },
  image: {
    marginBottom: 15,
    height: 220,
    width: 415,
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});
