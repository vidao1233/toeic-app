import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, StyleSheet, FlatList } from 'react-native';
import { colors, icons, fontsizes, envPath } from '../common';
import { Header } from '../components';
import { SectionGrid } from 'react-native-super-grid';

function Home(props) {
  const [searchText, setSearchText] = useState('');
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

  const filteredVocabs = () =>
    vocabularies.filter(vocab =>
      vocab.engWord.toLowerCase().includes(searchText.toLowerCase()),
    );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={'English Center'} />
      <View style={styles.searchContainer}>
        <Image source={icons.search} style={styles.searchIcon} />
        <TextInput
          autoCorrect={false}
          onChangeText={text => setSearchText(text)}
          style={styles.textInput}
          placeholder="Search..."
          placeholderTextColor={colors.dark_primary}
        />
      </View>
      <FlatList
        data={[
          { title: 'Numbers', data: [1, 2, 3, 4, 5, 6] },
          { title: 'Alphabets', data: ['A', 'B', 'C', 'D', 'E'] },
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              horizontal
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    color: colors.dark_primary,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: fontsizes.medium,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  itemText: {
    fontSize: fontsizes.medium,
    color: colors.dark_primary,
  },
});

export default Home;
