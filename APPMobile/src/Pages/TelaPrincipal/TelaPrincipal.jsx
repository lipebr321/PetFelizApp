import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const TelaPrincipal = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPetsFromAPI();
  }, []);

  async function fetchPetsFromAPI() {
    try {
      const response = await axios.get("https://petfeliz.azurewebsites.net/api/PetFeliz/listarpet");
      setPets(response.data);
      setLoading(false);
    } catch (error) {
      setError("Erro ao buscar pets no banco de dados.");
      setLoading(false);
      console.error("Erro ao buscar pets no banco de dados.", error);
    }
  }

  const handleCardPress = (pet) => {
    navigation.navigate('TelaPet', { pet });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    
    <ScrollView
      pagingEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      {pets.map((pet, index) => (
        <TouchableOpacity key={index} onPress={() => handleCardPress(pet)}>
          <View style={styles.card}>
            <Image source={{ uri: pet.foto_Pet }} style={styles.image} />
            <Text style={styles.name}>{pet.nome_Pet}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 14,
    padding: 10,
    margin: 10,
    height: 500,
    marginBottom:70,
    marginTop:50,
  },
  image: {
    width: 320,
    height: 300,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TelaPrincipal;
