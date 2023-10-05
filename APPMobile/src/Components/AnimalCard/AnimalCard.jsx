import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const AnimalCard = () => {
  const [animalData, setAnimalData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const apiUrl = 'https://localhost:44302/api/PetFeliz/listarpet';

    axios.get(apiUrl)
      .then((response) => {
        setAnimalData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do animal:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: animalData.photo }} style={styles.animalImage} />
      <Text style={styles.animalDescription}>{animalData.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  animalDescription: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AnimalCard;
