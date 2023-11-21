import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import Usuario from "../../Components/images/gatinho.png";
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
    let userData = await AuthContextFunctions.GetUserData();
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
        <Image source={Usuario} style={styles.avatar} />

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Deseja sair?</Text>
            <TouchableOpacity onPress={confirmLogout}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelLogout}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PerfilUsuario;
