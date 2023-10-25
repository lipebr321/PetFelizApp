import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Usuario from "../../Components/images/gatinho.png";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";

const PerfilUsuario = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Linha />

      <Text style={styles.titulo}>Meu Perfil</Text>

      <View style={styles.avatarContainer}>
        <Image source={Usuario} style={styles.avatar} />

        <Text style={styles.nomeUsuario}>Nome do Usuário</Text>
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

        <Text style={styles.menuItem}>Sair</Text>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },

  titulo: {
    fontSize: 18,
    color: "#F9C200",
  },

  avatarContainer: {
    alignItems: "center",
    marginTop: 40,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },

  nomeUsuario: {
    fontSize: 20,
    marginTop: 10,
    color: "#F9C200",
  },

  menuContainer: {
    marginBottom: 70,
    marginTop: 40,
  },

  menuItem: {
    fontSize: 14,
    marginBottom: 25,
    color: "#F9C200",
    fontWeight: "bold",
  },
});

export default PerfilUsuario;
