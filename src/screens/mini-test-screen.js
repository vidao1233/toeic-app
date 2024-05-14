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

function MiniTest(props) {
    const data = {
        typeName: 'MiniTest'
      };
      
      const {typeName} = data;
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      fetch(`${envPath.domain_url}Test/GetAllTestByType/${typeName}`)
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
  }, []);
  const renderItemTest = ({ item }) => (
    <View key={item.idTest}>
      <TestItem
        onPress={() => {
          navigate('DoTest',
            {
              idTest: item.idTest
            }
          )
        }}
        name={item.name}
        num={48}
        icon={icons.p6}
      />
    </View>
  );
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
      <Header title="Mini Tests" />
      <Image style={styles.image} source={images.fulltest} />
      <View style={styles.textTitleContain}>
          <Text
            numberOfLines={1}
            style={styles.title}>
            Choose a Test
          </Text>
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
export default MiniTest;

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
        color: 'white',
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