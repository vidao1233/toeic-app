import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Alert } from 'react-native';
import { colors, fontsizes, envPath } from '../common';
import { Header, TestItem } from '../components';
import { Picker } from '@react-native-picker/picker';

function TestList(props) {
  const [testTypes, setTestTypes] = useState([]);
  const [tests, setTests] = useState([]);
  const [testTypeSelected, setTestTypeSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${envPath.domain_url}TestType/GetAllTestTypes`)
      .then(response => response.json())
      .then(data => {
        setTestTypes(data);
      })
      .catch(error => {
        console.error('Error fetching test types:', error);
      });
  }, []);

  useEffect(() => {
    if (testTypeSelected !== null) {
      setIsLoading(true);
      fetch(`${envPath.domain_url}Test/GetAllTestByType/${testTypeSelected}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setTests(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching tests:', error);
          setIsLoading(false);
        });
    }
  }, [testTypeSelected]);
  
  let time = '';
  let questionNum = '';
  // Xác định giá trị của time và questionNum dựa vào giá trị của testTypeSelected
  if (testTypeSelected === 'FullTest') {
    time = '180';
    questionNum = '200';
  } else if (testTypeSelected === 'MiniTest') {
    time = '60';
    questionNum = '100';
  }
  const renderItemTest = ({ item }) => (
    <View key={item.idTest}>
      <TestItem
        onPress={() => {
          Alert.alert(`selected`);
        }}
        name={item.name}
        time={time}
        questionNum={questionNum}
      />
    </View>
  );

  const { navigation, route } = props;
  const { navigate, go_back } = navigation;

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        flexDirection: 'column',
      }}>
      <Header title={'Tests Of VictoryU'} />
      <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          numberOfLines={2}
          style={{
            width: 260,
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          CHOOSE A TEST TO START !
        </Text>
      </View>
      {/* Dropdown để chọn loại bài kiểm tra */}
      <View style={{ height: 55,
         justifyContent: 'center', 
         alignItems: 'center',
         borderRadius: 15,
         marginHorizontal: 10,
         backgroundColor: 'white' }}>
        <Picker
          selectedValue={testTypeSelected}
          style={{ 
            height: 50, 
            width: 380,            
            color: 'black' }}
          dropdownIconColor={colors.dark_primary}
          onValueChange={(itemValue, itemIndex) =>
            setTestTypeSelected(itemValue)
          }>
          <Picker.Item label="Select Test Type" value={null} />
          {testTypes.map((type, index) => (
            <Picker.Item
              key={index}
              label={type.typeName}
              value={type.typeName}
            />
          ))}
        </Picker>
      </View>
      <View style={{ height: 20, alignItems: 'center', justifyContent: 'center' }}>
      </View>
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
            <Text
              style={{
                color: 'black',
                fontSize: fontsizes.h3,
              }}>
              Loading...
            </Text>
          </View>
        ) : (
          <>
            {tests.length > 0 ? (
              <FlatList
                data={tests}
                renderItem={renderItemTest}
                keyExtractor={item => item.idTest.toString()}
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
                  No test found
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}
export default TestList;
