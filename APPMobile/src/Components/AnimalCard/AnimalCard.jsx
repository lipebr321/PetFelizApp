import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  async function fetchPets() {
    try {
      const response = await axios.get("https://localhost:44302/api/PetFeliz/listarpet");
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
    }
  }

  return (
    <View>
      {pets.map((pet, key) => (
        <View key={key}>
          <Image source={{ uri: pet.foto_Pet }} style={{ width: 200, height: 200 }} />
          <Text>{pet.nome_Pet}</Text>
        </View>
      ))}
    </View>
  );
}
