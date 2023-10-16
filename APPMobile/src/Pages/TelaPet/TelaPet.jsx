import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TelaPet = ({ route }) => {
  const { pet } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: pet.foto_Pet }} style={styles.image} />
      <Text style={styles.name}>{pet.nome_Pet}</Text>
      <Text style={styles.description}>{pet.descricao_Pet}</Text>
      <Text style={styles.age}>{pet.idade_Pet}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    margin: 10,
  },
  age: {
    fontSize: 16,
  },
});

export default TelaPet;
