import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {colors, icons, images, fontsizes, envPath} from '../common';
import {TestItem, Header, Footer, UnitItem, Question} from '../components';
import Tts from 'react-native-tts';

function DoTest(props) {

  const { navigation, route } = props;
  const { navigate, go_back } = navigation
  const { idTest } = route.params; 
  const [selectPart, setSelectPart] = useState('1baa42ee-9ad8-4cf3-b8d9-dd1d848d4ca6');
  const [parts, setParts] = useState([]);
  const [units, setUnits] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [unitByPart, setUnitByPart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120 * 60); 

  // Lấy danh sách các phần từ API khi component mount
  useEffect(() => {
    setIsLoading(true);
    fetch(`${envPath.domain_url}TestPart/GetAllTestParts`)
      .then(response => response.json())
      .then(data => {
        setParts(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Part:', error);
        setIsLoading(false);
      });
  }, []);

  // Lấy danh sách các unit liên quan đến một bài kiểm tra
  useEffect(() => {
    setIsLoading(true);
    fetch(`${envPath.domain_url}TestQuestionUnit/GetAllTestQuestionUnitByTest/${idTest}`)
      .then(response => response.json())
      .then(data => {
        setUnits(data);        
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Units:', error);
        setIsLoading(false);
      });
  }, [idTest]);

  // Cập nhật danh sách units khi selectPart thay đổi
  useEffect(() => {
    if (selectPart !== null) {
      const filteredUnits = units.filter(unit => unit.idTestPart === selectPart);
      setUnitByPart(filteredUnits);
    } else {
      setUnitByPart('1baa42ee-9ad8-4cf3-b8d9-dd1d848d4ca6');
    }
  }, [selectPart, units]);

  // Render mỗi unit
  const renderItemTest = ({ item }) => (
    <View key={item.idQuestionUnit}>
      <UnitItem        
        image={item.image}
        audio={item.audio}
        paragraph={item.paragraph}
        script={item.script}
      />
      <Question idUnit={item.idQuestionUnit}/>
    </View>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'Doing test'} />
      <View style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',   
          width: 385,   
          marginLeft: 15,

        }}>
          <View style={styles.timeView}>
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
        <View style={{width: 220}}></View>
      </View>
          <TouchableOpacity
          onPress={() => {
            navigate('Coming');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 75,
            width: 90,
            borderRadius: 5,
            backgroundColor: colors.primary
          }}>
          <Text
            style={{
              padding: 10,
              fontSize: 15,
              color: 'white',
              fontWeight: '700'
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary,          
        }}>
        <FlatList
          horizontal={true}
          data={parts}
          keyExtractor={item => item.partId}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setSelectPart(item.partId)}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 25,
                marginTop: 5,
                marginLeft: 5
              }}>
              <Text
                numberOfLines={1}
                style={{
                  width: 55,
                  color: selectPart === item.partId ? colors.primary : 'black',
                  fontSize: fontsizes.h4,
                  fontWeight: 'bold',
                }}>
                {item.partName}
              </Text>
            </TouchableOpacity>
          )}
          style={{
            backgroundColor: 'white',
            marginVertical: 5,
          }}
        />
      </View>
      {/* Phần render danh sách các units */}
      <FlatList
        data={unitByPart}
        renderItem={renderItemTest}
        keyExtractor={item => item.idQuestionUnit}
      />
      
    </View>
  );
}

export default DoTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  timeView: {
    height: 50,
    justifyContent: 'center',
    marginLeft: 5,
  },
  timeText: {
    fontSize: 15,
    color: 'red',
  },
  submitView: {
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'grey',
  },
  submitButton: {
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'center',
    width: 90,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  submitText: {
    padding: 10,
    fontSize: 18,
    color: 'white',
  },
});
