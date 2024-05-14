import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, envPath } from '../common';

function Question(props) {
  const { idUnit, onPress } = props;
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (idUnit) {
      fetch(`${envPath.domain_url}Question/GetAllQuestionByUnit/${idUnit}`)
        .then(response => response.json())
        .then(data => {
          setQuestions(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching Questions:', error);
          setIsLoading(false);
        });
    }
  }, [idUnit]);

  const handlePress = (answer, idQuestion) => {
    setSelectedAnswer({ ...selectedAnswer, [idQuestion]: answer });
    if (onPress) {
      onPress(answer, idQuestion);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.dark_primary} />;
  }

  return (
    <View style={styles.container}>
      {questions.map((question, index) => (
        <View key={question.idQuestion} style={styles.questionContainer}>
          <Text style={styles.title}>{`${question.content}`}</Text>
          <View style={styles.optionsContainer}>
            {renderOption('A', question.choice_1, question.idQuestion)}
            {renderOption('B', question.choice_2, question.idQuestion)}
            {renderOption('C', question.choice_3, question.idQuestion)}
            {renderOption('D', question.choice_4, question.idQuestion)}
          </View>
        </View>
      ))}      
    </View>
  );

  function renderOption(label, answer, idQuestion) {
    return (
      <TouchableOpacity
        key={label}
        style={styles.option}
        onPress={() => handlePress(label, idQuestion)}
      >
        <Icon
          name={selectedAnswer && selectedAnswer[idQuestion] === label ? 'dot-circle-o' : 'circle-o'}
          size={26}
          color="black"
        />
        <Text style={styles.optionText}>{`${label}. ${answer}`}</Text>
      </TouchableOpacity>
    );
  }
}

export default Question;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black'
  },
});
