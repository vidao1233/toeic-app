import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList,

} from "react-native"
import { colors, icons, images, fontsizes, envPath } from "../common"
import { VocabularyItem, Header, } from "../navigators"

function Vocabularies(props) {
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
    return <View style={{
        backgroundColor: colors.primary,
        flex: 100
    }}>
        <Header title={'Toeic\'s Vocabularies'} />
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
                        alignItems: 'center'
                    }}>
                    <Image
                        style={{
                            height: 70,
                            width: 70,
                            resizeMode: 'cover',
                            margin: 15
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
                height: 170,
                backgroundColor: 'white',
                borderRadius: 10,
                marginVertical: 10
            }}>

        </FlatList>
        <ScrollView>
            {vocabularies.map(vocab => {
                return (
                    <View key={vocab.idVoc}>
                        <VocabularyItem
                            onPress={() => {
                                Alert.alert(`Pressed word ${vocab.engWord} !`)
                            }}
                            topic={vocab.idTopic}
                            engWord={vocab.engWord}
                            pronunciation={vocab.pronunciation}
                            wordType={vocab.wordType}
                            meaning={vocab.meaning} />
                    </View>)
            })}
        </ScrollView>
        <View>
        </View>
    </View>
}
export default Vocabularies