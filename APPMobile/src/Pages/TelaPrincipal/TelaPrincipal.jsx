import React, { useEffect, useState } from "react";
import {  View,  ActivityIndicator,  Text,  ScrollView,  TouchableOpacity,  Image } from "react-native";
import axios from "axios";
import styles from '../../Pages/TelaPrincipal/styles';

const TelaPrincipal = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPetsFromAPI();
  }, []);

  async function fetchPetsFromAPI() {
    try {
      const response = await axios.get(
        "https://petfeliz.azurewebsites.net/api/PetFeliz/listarpet"
      );

      setPets(response.data);

      setLoading(false);
    } catch (error) {
      setError("Erro ao buscar pets no banco de dados.");

      setLoading(false);

      console.error("Erro ao buscar pets no banco de dados.", error);
    }
  }

  const handleCardPress = (pet) => {
    navigation.navigate("TelaPet", { pet });
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F9C200" />
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
      style={styles.container}
    >
      {pets.map((pet, index) => (
        <TouchableOpacity key={index} onPress={() => handleCardPress(pet)}>
          <View style={styles.card}>
            <Image source={{ uri: pet.foto_Pet }} style={styles.image} />

            <Text style={styles.nome}>{pet.nome_Pet}</Text>

            <Text style={styles.descricao}>{pet.descricao_Pet}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TelaPrincipal;
