import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";
import styles from '../../Pages/PerfilUsuario/styles';
import { AuthContextFunctions } from "../../../AuthContext";

const PerfilUsuario = ({ navigation }) => {

  const [user, setUser] = useState({});

  useEffect(() => {
    InitializeUser();
  }, []);

  async function InitializeUser() {
    let userData = await AuthContextFunctions.GetAndUserData();
    setUser(userData);
  }

  const { fazerLogout } = AuthContextFunctions;
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false); 
    fazerLogout(navigation); 
  };

  const cancelLogout = () => {
    setShowModal(false); 
  };



  return (
    <View style={styles.container}>
      <Linha />

      <Text style={styles.titulo}>Meu Perfil</Text>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: 'https://testesluis.blob.core.windows.net/teste/gatinho.png' }}
          style={styles.avatar} />

        <Text style={styles.nomeUsuario}>{user.Nome_Usuario}</Text>
      </View>

      <View style={styles.menuContainer}>
        <Linha />

        <Text
          style={styles.menuItem}
          onPress={() => navigation.navigate("PetsUsuario")}
        >
          Meus pets
        </Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={() => navigation.navigate("CadastroAnimal")}
        >
          Cadastrar Pets
        </Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={() => navigation.navigate("SobreNos")}
        >
          Sobre Nós ?
        </Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={() => navigation.navigate("FAQ")}
        >
          Dúvidas
        </Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={() => navigation.navigate("TelaConfig")}
        >
          Configurações
        </Text>

        <Linha />

        <TouchableOpacity
        onPress={handleLogout}
      >
          <Text style={styles.menuItem}>Sair</Text>
      </TouchableOpacity>
      </View>
      <Footer />
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deseja sair?</Text>
            <TouchableOpacity style={styles.Button} onPress={confirmLogout}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={cancelLogout}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default PerfilUsuario;
