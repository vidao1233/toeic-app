import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import {colors, icons, images, fontsizes, envPath} from '../common';
import {VocabularyItem, Header} from '../components';
import {SectionGrid} from 'react-native-super-grid';

function Home(props) {
  const [vocTopics, setVoctopics] = useState([]);
  useEffect(() => {
    fetch(`${envPath.domain_url}VocTopic/GetAllVocTopic`)
      .then(response => response.json())
      .then(data => {
        setVoctopics(data);
      })
      .catch(error => {
        console.error('Error fetching VocTopic:', error);
      });
  }, []);
  const [vocabularies, setVocabularies] = useState([]);
  useEffect(() => {
    fetch(`${envPath.domain_url}Vocabulary/GetAllVocabularies`)
      .then(response => response.json())
      .then(data => {
        setVocabularies(data);
      })
      .catch(error => {
        console.error('Error fetching Vocabularies:', error);
      });
  }, []);
  const [searchText, setSearchText] = useState('');
  const filteredVocabs = () =>
    vocabularies.filter(vocab =>
      vocab.engWord.toLowerCase().includes(searchText.toLowerCase()),
    );
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 100,
      }}>
      <Header title={'English Center'} />
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={icons.search}
          style={{
            height: 30,
            width: 30,
            position: 'absolute',
            top: 5,
            left: 5,
          }}
        />
        <TextInput
          autoCorrect={false}
          onChangeText={text => {
            setSearchText(text);
          }}
          style={{
            color: colors.dark_primary,
            backgroundColor: 'white',
            height: 40,
            flex: 1,
            borderRadius: 5,
            opacity: 0.8,
            paddingStart: 40,
          }}
        />
      </View>
      <SectionGrid
      style={{
        backgroundColor: 'grey',
        marginHorizontal: 20
      }}
        itemDimension={130}
        sections={[
          {
            title: 'Numbers',
            data: [1, 2, 3, 4, 5, 6],
          },
          {
            title: 'Alphabets',
            data: ['A', 'B', 'C', 'D', 'E'],
          },
        ]}
        renderItem={({item}) => <Text>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={{fontSize: 20}}>{section.title}</Text>
        )}
      />
    </View>
  );
}
export default Home;
