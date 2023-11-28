import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContextFunctions } from '../../../AuthContext';

const PetsUsuario = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pet, setPets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    initializeUser();
    loadPets();
  }, []);

  const initializeUser = async () => {
    const userData = await AuthContextFunctions.GetUserData();
    setUser(userData);
  };

  const loadPets = async () => {
    try {
      const header = await AuthContextFunctions.GenerateHeader();
      if (!header.Authorization) {
        navigation.navigate('TelaDeLogin');
        return;
      }
  
      const response = await axios.get(`https://petfeliz.azurewebsites.net/api/PetFeliz/ListarPet`, {
        headers: header,
      });
  
      if (response.status !== 200) {
        return;
      }
  
      const allPets = response.data;

alert('Dados completos de pets: ' + JSON.stringify(allPets));

const userPets = allPets.filter((pet) => pet.usuario.email === user.Email);



alert('Pets do usuário: ' + JSON.stringify(userPets));

setPets(userPets);
setFilteredData(userPets);
setLoading(false);


  
    } catch (error) {
      console.error('Erro ao buscar pets no banco de dados.', error);
      setError('Erro ao buscar pets no banco de dados.');
      setLoading(false);
    }
  };
  

  const handleCardPress = (pet) => {
    navigation.navigate('DetalhesDoPet', { pet });
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
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
    <ScrollView pagingEnabled={true} showsVerticalScrollIndicator={false} style={styles.container}>
      {filteredData.map((pet, index) => (
        <TouchableOpacity key={index} onPress={() => handleCardPress(pet)}>
          <View style={styles.card}>
            <Image source={{ uri: pet.foto_Pet }} style={styles.image} />
            <Text style={styles.nome}>{pet.cod_Usuario}</Text>
            <Text style={styles.descricao}>{pet.descricao_Pet}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
  
    card: {
      borderColor: "gray",
      borderRadius: 14,
      margin: 10,
      height: 500,
      marginBottom: 70,
      marginTop: 50,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
  
    image: {
      width: 354,
      height: 300,
      borderRadius: 14,
  
    },
  
    nome: {
      fontSize: 25,
      marginTop: 10,
      marginLeft: 10,
      color: "purple",
    },
  
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  
    descricao: {
      fontSize: 16,
      marginTop: 20,
      marginLeft: 10,
    },

    alignRight: {
      alignItems: 'flex-end',
      padding: 15,
      height: 50,
    },

    button: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 20, 
      height: 20, 
      marginRight: 5, 
    },
    menuItem: {
      fontSize: 18,
    },
    modalFiltro: {
      flexDirection: 'row',
      paddingRight: 15,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 5,
    },
    modalContent: {
      width: 300,
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
    },
    Button: {
      backgroundColor: "#F9C200",
      borderRadius: 10,
      width: 90,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      marginLeft: 5,
      marginTop: 20,
    },
    ButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },

    picker :{     
      width: 200,
      height: 50,
      borderColor: "gray",
      marginTop: 10,
      paddingLeft: 10,
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 14,
      backgroundColor: 'white',
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },

    containerButtons :{
      flexDirection: 'row',
      paddingRight: 15,
      marginBottom: 20,
      marginTop: 10,
      alignItems: 'center',
    },

  });

export default PetsUsuario;
