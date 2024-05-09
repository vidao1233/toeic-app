import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import data from './QuizData';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors, images, envPath} from '../common';
import {UITab} from '../navigation';

export default function Quiz(props) {
  const {idLesson} = props;
  const [quizQuestion, setQuizQuestion] = useState('');
  const [allQuestions, setAllQuestions] = useState(data);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [score, setScore] = useState(0);

  const [progress, setProgress] = useState(new Animated.Value(0));
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));

  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${envPath.domain_url}Quiz/GetAllQuizByLesson/fbb34767-d4d2-48ec-887a-1c0ccf8e5b98`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuizQuestion(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching Quizzes:', error);
      }
    };

    fetchData();
  }, []);

  const validateAnswer = (selectedOption, navigation) => {
    if (isOptionsDisabled == false) {
      let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
      setCurrentOptionSelected(selectedOption);
      setCorrectOption(correct_option);
      setIsOptionsDisabled(true);
      if (selectedOption == correct_option) {
        setScore(score + 1);
      }
    } else {
      handleNext(navigation);
    }
  };

  const handleNext = navigation => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      navigation.navigate('Result');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
    }
    Animated.parallel([
      Animated.timing(progress, {
        toValue: currentQuestionIndex + 2,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1900,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
  };

  const startQuiz = () => {
    // Animated.timing(fadeAnim,{
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: false
    // }).start();
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1900,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View style={{}}>
        {/* Question Counter */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 15,
              opacity: 0.6,
              marginRight: 2,
            }}>
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{color: colors.black, fontSize: 13, opacity: 0.6}}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: colors.black,
            fontSize: 18,
            textAlign: 'center',
          }}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '80%',
          height: 5,
          borderRadius: 5,
          backgroundColor: '#00000020',
          marginBottom: 10,
        }}>
        <Animated.View
          style={[
            {
              height: 5,
              borderRadius: 5,
              backgroundColor: colors.accent + '90',
            },
            {
              width: progressAnim,
            },
          ]}></Animated.View>
      </View>
    );
  };

  const renderOptions = navigation => {
    return (
      <View style={{marginTop: 100}}>
        {allQuestions[currentQuestionIndex]?.options.map((option, index) => (
          <Animated.View
            key={index}
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(150 / 4) * (index + 10), 0], // 0 : 150, 0.5 : 75, 1 : 0
                  }),
                },
              ],
            }}>
            <TouchableOpacity
              onPress={() => validateAnswer(option, navigation)}
              key={option}
              style={{
                backgroundColor: isOptionsDisabled
                  ? option == correctOption
                    ? colors.success
                    : option == currentOptionSelected
                    ? colors.error
                    : colors.grey
                  : colors.accent,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                paddingHorizontal: 30,
                marginVertical: 10,
                shadowColor: '#171717',
                shadowOffset: {width: -3, height: 3},
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.white,
                  textAlign: 'center',
                }}>
                {option}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    );
  };

  const QuizPage = ({navigation}) => {
    return (
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 30,
            backgroundColor: colors.background,
            position: 'relative',
          }}>
          <View
            style={{
              marginTop: 50,
              marginVertical: 10,
              padding: 40,
              borderTopRightRadius: 40,
              borderRadius: 10,
              backgroundColor: 'white',
              alignItems: 'center',
              shadowColor: '#171717',
              shadowOffset: {width: -6, height: 6},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
            {renderProgressBar()}

            {renderQuestion()}
          </View>
          {renderOptions(navigation)}
        </View>
      </ScrollView>
    );
  };

  const WelcomePage = ({navigation}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: '100%',
            height: 400,
            resizeMode: 'contain',
          }}
          source={images.driving}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: 20,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: colors.black,
            }}>
            Ready For Your Lesson Quiz?
          </Text>
        </View>
        {/* Retry Quiz button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
            startQuiz();
          }}
          style={{
            backgroundColor: colors.black,
            paddingHorizontal: 5,
            paddingVertical: 20,
            width: '50%',
            borderRadius: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.white,
              fontSize: 20,
            }}>
            Let's Begin
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const ResultPage = ({navigation}) => {
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [fireworks, setFireworks] = useState([]);
    const fireworkColors = ['yellow', 'red', 'green'];

    useEffect(() => {
      if (score === allQuestions.length) {
        setShowCongratulations(true);
        startFireworks();
      }
    }, [score, allQuestions.length]);

    const startFireworks = () => {
      const fireworksArray = [];
      for (let i = 0; i < 10; i++) {
        const fireworksAnimation = new Animated.Value(0);
        fireworksArray.push({
          animation: fireworksAnimation,
          top:
            Math.floor(Math.random() * Dimensions.get('window').height) + 100,
          left: Math.floor(Math.random() * Dimensions.get('window').width),
        });
        Animated.timing(fireworksAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start();
      }
      setFireworks(fireworksArray);
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            width: '90%',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
          }}>
          {fireworks.map((firework, index) => (
            <Animated.Image
                source={images.firework}
              key={index}
              style={[
                styles.firework,
                {
                  top: firework.top,
                  left: firework.left,
                },
                {
                  transform: [
                    {
                      translateY: firework.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -Dimensions.get('window').height],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
          {showCongratulations && (
            <Text style={{fontSize: 50, fontWeight: 'bold', color: 'black'}}>
              EXCELLENT !
            </Text>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: 30,
            }}>
            <Text style={{fontSize: 100, color: 'green', fontWeight: 'bold'}}>
              {score}
            </Text>
            <Text
              style={{fontSize: 100, color: colors.black, fontWeight: 'bold'}}>
              {' '}
              / {allQuestions.length}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                restartQuiz();
                navigation.navigate('Welcome');
              }}
              style={{
                backgroundColor: colors.black,
                paddingHorizontal: 5,
                paddingVertical: 15,
                width: '40%',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.white,
                  fontSize: 20,
                }}>
                Retry
              </Text>
            </TouchableOpacity>

            <View style={{width: 20}} />

            <TouchableOpacity
              onPress={() => {
                restartQuiz();
                const {navigation, route} = props;
                const {navigate, go_back} = navigation;
                navigate('UITab');
              }}
              style={{
                backgroundColor: colors.black,
                paddingHorizontal: 5,
                paddingVertical: 15,
                width: '40%',
                borderRadius: 15,
              }}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                Quit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{
            title: 'Practice Quizzes',
            headerStyle: {
              backgroundColor: '#EDA276',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={QuizPage}
          options={{
            title: 'Question',
            headerStyle: {
              backgroundColor: '#EDA276',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Result"
          component={ResultPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: '#F7EBE1',
  },
  firework: {
    position: 'absolute',
    width: 150,
    height: 150,
  },
});
