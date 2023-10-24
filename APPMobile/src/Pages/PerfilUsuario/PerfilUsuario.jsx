import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Usuario from '../../Components/images/usuario.png';
import Footer from '../../Components/Footer/Footer';

const PerfilUsuario = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Perfil</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={Usuario}
          style={styles.avatar}
        />
        <Text style={styles.nomeUsuario}>Nome do Usuário</Text>
      </View>

      <View style={styles.menuContainer}>
        <Text style={styles.menuItem}>Meus Pets</Text>
        <Text style={styles.menuItem}>Cadastrar Pets</Text>
        <Text style={styles.menuItem}>Sobre Nós</Text>
        <Text style={styles.menuItem}>Dúvidas</Text>
        <Text style={styles.menuItem}>Configurações</Text>
        <Text style={styles.menuItem}>Sair</Text>
      </View>
      <Footer/>
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
    fontSize: 24,
    color: "#F9C200",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nomeUsuario: {
    fontSize: 20,
    marginTop: 10,
    color: "#F9C200",
  },
  menuContainer: {
    marginTop: 30,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 25,
    color: "#F9C200",
  },
});

export default PerfilUsuario;
