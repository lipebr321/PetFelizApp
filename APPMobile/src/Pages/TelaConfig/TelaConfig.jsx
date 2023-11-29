import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";
import styles from '../../Pages/TelaConfig/styles';
import { AuthContextFunctions } from "../../../AuthContext";




const TelaConfig = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    InitializeUser();
  }, []);

  async function InitializeUser() {
    let userData = await AuthContextFunctions.GetAndUserData();
    setUser(userData);
  }
const voltarTelaAnterior = () => {
  navigation.goBack();
};

const openModal = () => {
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
};

const handleUpdateProfile = () => {
 
  closeModal();
};
  return (
    <View style={styles.container}>
      <View style={styles.balaoAmarelo}>
        <Text style={styles.titulo}>Informações Pessoais !</Text>
      </View>

      <View style={styles.menuContainer}>
        <Text
          style={styles.menuItem}
        >
          Nome
        </Text>
        <Text
          style={styles.infoUsuario}
        >
          {user.Nome_Usuario}
        </Text> 

        <Linha />

        <Text
          style={styles.menuItem}
    
        >
          Endereço
        </Text>

        <Text style={styles.infoUsuario}>
        {user.Nome_Cidade} - {user.Nome_Log} 
</Text>

        <Linha />

        <Text
          style={styles.menuItem}

        >
          Trocar senha
        </Text>

        <Text style={styles.infoUsuario}>
       ********
</Text>

        <Linha />

        <Text
          style={styles.menuItem}
        >
          Telefone
        </Text>

        <Text style={styles.infoUsuario}>
        + 55 {user.Telefone}
</Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={('')}
        >
          Email
        </Text>

        <Text style={styles.infoUsuario}>
        {user.Email}
</Text>

        <Linha />
        <View style={styles.containerButtons}>
        <Text 
        style={styles.menuItem}
        onPress={(voltarTelaAnterior)}
        >
          Voltar</Text>
          <TouchableOpacity style={styles.Button} onPress={openModal}>
      <Text style={styles.ButtonText}  >Alterar perfil</Text>
    </TouchableOpacity>
        </View>
      
      </View>

      <Footer />
      <Modal visible={showModal} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <View style={styles.balaoAmarelo}> <Text style={styles.modalTitle}>Deseja alterar suas informações?</Text></View>
          <TextInput  style={styles.input} value={user.Nome_Usuario} onChangeText={(text) => {/* Atualiza o estado */}} />
          <TextInput  style={styles.input} value={user.Email} onChangeText={(text) => {/* Atualiza o estado */}} />
          <TextInput  style={styles.input} value={user.Nome_Log} onChangeText={(text) => {/* Atualiza o estado */}} />
          <TextInput  style={styles.input} value={user.Nome_Estado} onChangeText={(text) => {/* Atualiza o estado */}} />
          <TextInput  style={styles.input} value={user.Nome_Cidade} onChangeText={(text) => {/* Atualiza o estado */}} />
          <TextInput  style={styles.input} value={user.Telefone} onChangeText={(text) => {/* Atualiza o estado */}} />
          <TouchableOpacity style={styles.Button} onPress={handleUpdateProfile}>
              <Text style={styles.ButtonText} >Salvar alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={closeModal}>
              <Text style={styles.ButtonText} >Cancelar</Text>
            </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
  );
};

export default TelaConfig;
