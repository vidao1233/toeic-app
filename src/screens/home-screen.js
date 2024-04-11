import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList,
    TextInput
} from "react-native"
import { colors, icons, images, fontsizes, envPath } from "../common"
import { VocabularyItem, Header, Footer } from "../components"

function Home(props) {
    const [vocTopics, setVoctopics] = useState([])
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
    const [vocabularies, setVocabularies] = useState([])
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
    const [searchText, setSearchText] = useState('')
    const filteredVocabs = () => vocabularies.filter(vocab => vocab.engWord.toLowerCase()
        .includes(searchText.toLowerCase()))
    return <View style={{
        backgroundColor: colors.primary,
        flex: 100
    }}>
        <Header title={'Toeic\'s Vocabularies'} />
        <View style={{
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
                    left: 5
                }}
            />
            <TextInput
                autoCorrect={false}
                onChangeText={(text) => {
                    setSearchText(text)
                }}
                style={{
                    color: colors.dark_primary,
                    backgroundColor: 'white',
                    height: 40,
                    flex: 1,
                    borderRadius: 5,
                    opacity: 0.8,
                    paddingStart: 40
                }} />
        </View>
        <View style={{ height: 120, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                horizontal={true}
                data={vocTopics}
                keyExtractor={item => item.idVocTopic}
                renderItem={({ item }) => {
                    return <TouchableOpacity
                        onPress={() => {
                            Alert.alert(`Pressed topic's name ${item.name} !`)
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 85,
                            marginTop: 5
                        }}>
                        <Image
                            style={{
                                height: 70,
                                width: 70,
                                margin: 15,
                                top: 5
                            }}
                            source={icons.voctopic_icon} />
                        <Text
                            numberOfLines={1}
                            style={{
                                width: 60,
                                color: 'black',
                                fontSize: fontsizes.h4,
                                fontWeight: 'bold',
                            }}>{item.name}</Text>
                    </TouchableOpacity>
                }}
                style={{
                    backgroundColor: 'white',
                    marginVertical: 5
                }}>
            </FlatList>
        </View>
        {filteredVocabs().length > 0 ? <FlatList
            style={{ height: 150 }}
            data={filteredVocabs()}
            keyExtractor={item => item.idVoc}
            renderItem={({ item }) => {
                return <VocabularyItem
                    onPress={() => {
                        Alert.alert(`Pressed word ${item.engWord} !`)
                    }}
                    topic={item.idTopic}
                    engWord={item.engWord}
                    pronunciation={item.pronunciation}
                    wordType={item.wordType}
                    meaning={item.meaning} />
            }} /> : <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text style={{
                color: 'black',
                fontSize: fontsizes.h3
            }}>No word found</Text>
        </View>}
    </View>
}
export default Home