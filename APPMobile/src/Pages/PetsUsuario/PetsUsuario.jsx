import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image,  } from "react-native";
import axios from "axios";
import styles from "../../Pages/PetsUsuario/styles";
import { AuthContextFunctions } from "../../../AuthContext";
import Footer from "../../Components/Footer/Footer";


const PetsUsuario = ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserId() {
      const usuarioLogado = await AuthContextFunctions.CheckUserLogin();
      if (usuarioLogado) {
        const userData = JSON.parse(await AuthContextFunctions.GetUserData());
        setUserId(userData.Cod_Usuario);
      } else {
        console.log("Nenhum usuário logado");
      }
    }
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  async function fetchData() {
    try {
     
      const response = await axios.get(`https://petfeliz.azurewebsites.net/api/PetFeliz/ListarPet?Id=${userId}`);
      if (response.status !== 200) {
        alert("Erro ao buscar pets!");
        return;
      }
      setPets(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar pets no banco de dados.", error);
    }
  }

  const handleAddPet = () => {
  
    navigation.navigate("CadastroAnimal");
  };


  const handleEditPet = (pet) => {
    navigation.navigate("AlterarPet", { pet });
};

const handleDeletePet = async (petId) => {
  try {
    const response = await axios.delete(`https://petfeliz.azurewebsites.net/api/PetFeliz/apagarPet?id=${petId}`);

    if (response.status === 200) {
    
    } else {
      console.error("Erro ao excluir pet");
    }
  } catch (error) {
    console.error("Erro ao excluir pet", error);
  }
};


  return (
    <View
    pagingEnabled={true}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
       <ScrollView
      pagingEnabled={true}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
       
      {loading ? (
        <Text>Carregando...</Text>
      ) : pets.length === 0 ? (
        <View>
        <View style={styles.noPetsContainer}>
          <Text style={styles.noPetsText}>Nenhum pet cadastrado</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
           style={styles.noPetsButton}
            title="Cadastrar Pet"
            onPress={handleAddPet}>
            <Text style={styles.buttonText}>Cadastrar pet</Text>
          </TouchableOpacity>
          
        </View>
      
      </View>
      ) : (
        pets.map((pet, index) => (
      
               <View style={styles.card}>
               <Image source={{ uri: pet.foto_Pet }} style={styles.image} />
               <Text style={styles.nome}>{pet.nome_Pet}</Text>

               <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDeletePet(pet.id_Pet)}
        >
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>

        <TouchableOpacity key={index} style={styles.button} onPress={() => handleEditPet(pet)}>
          <Text style={styles.buttonText}>Alterar</Text>
        </TouchableOpacity>
      </View>
      </View>


           
      ))
      )}
     
    </ScrollView>
    <View>
      <Footer/>
      </View>
    </View>
   
  );
};

export default PetsUsuario;
