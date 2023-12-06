import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal,  } from 'react-native';
import axios from 'axios';
import styles from '../../Pages/PetsUsuario/styles';
import { AuthContextFunctions } from '../../../AuthContext';
import Footer from '../../Components/Footer/Footer';

const PetsUsuario = ({ navigation }) => {
  const [pets, setPets] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);

  useEffect(() => {
    async function fetchUserId() {
      const usuarioLogado = await AuthContextFunctions.CheckUserLogin();
      if (usuarioLogado) {
        const userData = JSON.parse(await AuthContextFunctions.GetUserData());
        setUserId(userData.Cod_Usuario);
      } else {
        console.log('Nenhum usuário logado');
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
        alert('Erro ao buscar pets!');
        return;
      }
      setPets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar pets no banco de dados.', error);
    }
  }

  const handleAddPet = () => {
    navigation.navigate('CadastroAnimal');
  };

  const handleEditPet = (pet) => {
    navigation.navigate('AlterarPet', { pet });
  };

  const handleDeletePet = async (idPet) => {
    try {
      const response = await axios .delete(`https://petfeliz.azurewebsites.net/api/PetFeliz/ApagarPet/${idPet}`);

      if (response.status === 200) {
        setModalVisible(false); 
        fetchData();
      } else {
        console.error('Erro ao excluir pet');
        alert('Erro ao excluir o pet!');
      }
    } catch (error) {
      console.error('Erro ao excluir pet', error);
      alert('Erro ao excluir o pet!');
    }
  };

  const toggleModal = (idPet) => {
    setSelectedPetId(idPet);
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}
    showsVerticalScrollIndicator={false}
    pagingEnabled={true}
    >
      <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        >
        {loading ? (
          <Text>Carregando...</Text>
        ) : pets.length === 0 ? (
          <View>
            <View style={styles.noPetsContainer}>
              <Text style={styles.noPetsText}>Nenhum pet cadastrado</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.noPetsButton} onPress={handleAddPet}>
                <Text style={styles.buttonText}>Cadastrar pet</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          pets.map((pet) => (
            <View style={styles.card} key={pet.id_Pet}>
              <Image source={{ uri: pet.foto_Pet }} style={styles.image} />
              <Text style={styles.nome}>{pet.nome_Pet}</Text>
              <View style={styles.botoesContainer}>
                <TouchableOpacity style={styles.button} onPress={() => toggleModal(pet.id_Pet)}>
                  <Text style={styles.buttonText}>Remover</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleEditPet(pet)}>
                  <Text style={styles.buttonText}>Alterar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir este animal?</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => toggleModal(null)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonDelete]}
              onPress={() => handleDeletePet(selectedPetId)}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Footer />
    </View>
  );
};

export default PetsUsuario;
