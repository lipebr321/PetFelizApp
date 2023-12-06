import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FAQ = () => {
  const [answersVisible, setAnswersVisible] = useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false,
    question5: false,
    question6: false,
    question7: false,
  });

  const toggleAnswer = (question) => {
    setAnswersVisible((prevState) => ({
      ...prevState,
      [question]: !prevState[question],
    }));
  };

  return (
    <View style={styles.container}>
        <View style={styles.balaoAmarelo}>
        <Text style={styles.title}>Perguntas Frequentes</Text>
        </View>
    
      <ScrollView style={styles.scrollView}
      showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => toggleAnswer('question1')} style={styles.question}>
          <Text style={styles.questionText}>Quem pode realizar uma adoção?</Text>
        </TouchableOpacity>
        {answersVisible.question1 && (
          <Text style={styles.answer}>Qualquer pessoa física ou juridica que  queira ajudar um animal a achar um
          novo lar. </Text>
        )}

        <TouchableOpacity onPress={() => toggleAnswer('question2')} style={styles.question}>
          <Text style={styles.questionText}>Os animais são vacinados?</Text>
        </TouchableOpacity>
        {answersVisible.question2 && (
          <Text style={styles.answer}>Resposta para a pergunta 2...</Text>
        )}

        <TouchableOpacity onPress={() => toggleAnswer('question3')} style={styles.question}>
          <Text style={styles.questionText}>Os animais que vão para adoção são castrados?</Text>
        </TouchableOpacity>
        {answersVisible.question3 && (
          <Text style={styles.answer}>Resposta para a pergunta 3...</Text>
        )}

        <TouchableOpacity onPress={() => toggleAnswer('question4')} style={styles.question}>
          <Text style={styles.questionText}>Fui aprovado, posso retirar o pet no mesmo dia?</Text>
        </TouchableOpacity>
        {answersVisible.question3 && (
          <Text style={styles.answer}>Resposta para a pergunta 3...</Text>
        )}

         <TouchableOpacity onPress={() => toggleAnswer('question5')} style={styles.question}>
          <Text style={styles.questionText}>Após o preenchimento do formulário quanto tempo devo esperar?</Text>
        </TouchableOpacity>
        {answersVisible.question3 && (
          <Text style={styles.answer}>Resposta para a pergunta 3...</Text>
        )}

         <TouchableOpacity onPress={() => toggleAnswer('question6')} style={styles.question}>
          <Text style={styles.questionText}>Quais são os documentos necessários para adoção ?</Text>
        </TouchableOpacity>
        {answersVisible.question3 && (
          <Text style={styles.answer}>Resposta para a pergunta 3...</Text>
        )}

<TouchableOpacity onPress={() => toggleAnswer('question7')} style={styles.question}>
          <Text style={styles.questionText}>O que é preciso para adotar um pet?</Text>
        </TouchableOpacity>
        {answersVisible.question3 && (
          <Text style={styles.answer}>Resposta para a pergunta 3...</Text>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    marginBottom: 20,
  },
  question: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  questionText: {
    fontSize: 18,
  },
  answer: {
    fontSize: 16,
    marginBottom: 20,
  },
  balaoAmarelo: {
    backgroundColor: "#F9C200",
    padding: 10,
    alignItems: "center",
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
    height: 70,
    marginBottom: 30,
    borderRadius: 60,
  },
});

export default FAQ;
