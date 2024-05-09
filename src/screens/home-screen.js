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
import {Header, CourseItem} from '../components';
import {SectionGrid} from 'react-native-super-grid';

function Home(props) {
  const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch(`${envPath.domain_url}Course/GetAllCourses`)
            .then(response => response.json())
            .then(data => {
                // data sẽ là mảng các đối tượng course từ API
                setCourses(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
  const renderItemCourse = ({ item }) => (
    <View key={item.idCourse}>
        <CourseItem
            onPress={() => {
                navigate('CourseList',{
                  idCourseHome: item.idCourse
                })
            }}
            name={item.name}
            description={item.description} />
    </View>);
    //navigation
    const { navigation, route } = props
    //function of navigate to/back
    const { navigate, go_back } = navigation
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <Header title={"Home"} />
      <Image style={styles.image} source={images.banner} />
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.dark_primary,
          justifyContent: 'center',
          marginHorizontal: 20,
          borderRadius: 15,
        }}>
        <Text
          numberOfLines={2}
          style={{
            width: 260,
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Interested course !!
        </Text>
      </View>
      <View style={{ height: 150, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <FlatList
                horizontal={true}
                data={courses}
                renderItem={renderItemCourse}
                keyExtractor={item => item.idCourse.toString()}
            />
        </View>
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
    backgroundColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 10,
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
    backgroundColor: 'black',
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
    marginTop: 10,
    height: 250,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default Home;
