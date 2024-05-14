import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import {colors, icons, images, fontsizes, envPath} from '../common';
import {VocabularyItem, Header, Footer} from '../components';
import Tts from 'react-native-tts';

function Vocabularies(props) {
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

  const [selectTopic, setSelectTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vocByTopic, setVocByTopic] = useState([]);
  useEffect(() => {
    if (selectTopic !== null) {
      setIsLoading(true);
      fetch(`${envPath.domain_url}Vocabulary/GetVocabularyByTopic/${selectTopic}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setVocByTopic(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching tests:', error);
          setIsLoading(false);
        });
    }
  }, [selectTopic]);

  const [searchText, setSearchText] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);

  const filteredVocabs = () => {
    let filtered = vocabularies;

    // Lọc theo selectTopic
    if (selectTopic) {
        filtered = vocByTopic.filter(
            vocab => vocab.engWord.toLowerCase().includes(searchText.toLowerCase()),
        );
    }

    // Lọc theo selectedLetter
    if (selectedLetter) {
        filtered = filtered.filter(
            vocab => vocab.engWord.charAt(0).toUpperCase() === selectedLetter,
        );
    }

    // Lọc theo searchText
    filtered = filtered.filter(vocab =>
        vocab.engWord.toLowerCase().includes(searchText.toLowerCase()),
    );

    return filtered;
};

  const groupVocabulariesByAlphabet = () => {
    const groupedVocabularies = {};
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      groupedVocabularies[letter] = vocabularies.filter(
        vocab => vocab.engWord.charAt(0).toUpperCase() === letter,
      );
    }
    return groupedVocabularies;
  };

  const renderVocabularyItem = ({item}) => (
    <VocabularyItem
      onPress={() => {
        Tts.speak(item.engWord);
      }}
      topic={item.idTopic}
      engWord={item.engWord}
      pronunciation={item.pronunciation}
      wordType={item.wordType}
      meaning={item.meaning}
    />
  );

  const renderAlphabetSection = () => {
    const groupedVocabularies = groupVocabulariesByAlphabet();
    return (
      <FlatList
        horizontal
        data={Object.keys(groupedVocabularies)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleLetterPress(item)}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor:
                selectedLetter === item ? colors.primary : colors.light_gray,
            }}>
            <Text
              style={{
                fontSize: fontsizes.h3,
                fontWeight: 'bold',
                color: selectedLetter === item ? 'white' : 'black',
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };
  
  const handleLetterPress = (letter) => {
    if (selectedLetter === letter) {
        setSelectedLetter(null);
    } else {
        setSelectedLetter(letter);
    }
};

  const handleTopicPress = (topicId) => {
    if (selectTopic === topicId) {
        // Nếu đã chọn topic này rồi, thì reset lại
        setSelectTopic(null);
    } else {
        // Nếu chưa chọn, thì chọn topic mới
        setSelectTopic(topicId);
    }
};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <Header title={"Toeic's Vocabularies"} />
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
      <View
        style={{height: 120, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          horizontal={true}
          data={vocTopics}
          keyExtractor={item => item.idVocTopic}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                    handleTopicPress(item.idVocTopic);                    
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 85,
                  marginTop: 5,                  
                }}>
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    margin: 15,
                    top: 5,
                  }}
                  source={icons.voctopic_icon}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    width: 60,
                    color: selectTopic === item.idVocTopic ? colors.primary : 'black',
                    fontSize: fontsizes.h4,
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          style={{
            backgroundColor: 'white',
            marginVertical: 5,
          }}></FlatList>
      </View>
      <View style={{flex: 1}}>
        <View style={{}}>{renderAlphabetSection()}</View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 5,
          }}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <>
              {filteredVocabs().length > 0 ? (
                <FlatList
                  data={filteredVocabs()}
                  renderItem={renderVocabularyItem}
                  keyExtractor={(item, index) => index.toString()}
                  style={{maxHeight: '100%'}}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: fontsizes.h3,
                    }}>
                    No word found
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
}
export default Vocabularies;
