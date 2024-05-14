import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import {colors, icons, images, fontsizes, envPath} from '../common';
import {TestItem, Header, Footer, UnitItem} from '../components';
import Tts from 'react-native-tts';

function DoTest(props) {

  const { navigation, route } = props;
  const { navigate, go_back } = navigation
  const { idTest } = route.params; 
  const [selectPart, setSelectPart] = useState(null);
  const [parts, setParts] = useState([]);
  const [units, setUnits] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [unitByPart, setUnitByPart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setUnitByPart([]);
    }
  }, [selectPart, units]);

  // Lấy danh sách các câu hỏi liên quan đến các unit đã chọn
  // useEffect(() => {
  //   if (unitByPart.length > 0) {
  //     setIsLoading(true);
  //     const unitIds = unitByPart.map(unit => unit.idQuestionUnit);
  //     fetch(`${envPath.domain_url}Question/GetAllQuestionByUnit/${unitIds.join(',')}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         setQuestions(data);          
  //         setIsLoading(false);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching Questions:', error);
  //         setIsLoading(false);
  //       });
  //   } else {
  //     setQuestions([]);
  //   }
  // }, [unitByPart]);


  // Xử lý khi chọn một part
  const handlePartPress = (idPart) => {
    if (selectPart === idPart) {
        setSelectPart(null);
    } else {
        setSelectPart(idPart);
    }
};

  // Render mỗi unit
  const renderItemTest = ({ item }) => (
    <View key={item.idQuestionUnit}>
      <UnitItem
        image={item.image}
        audio={item.audio}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  console.log(unitByPart)

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'Doing test'} />
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
              onPress={() => handlePartPress(item.partId)}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 25,
                marginTop: 5,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  width: 60,
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
