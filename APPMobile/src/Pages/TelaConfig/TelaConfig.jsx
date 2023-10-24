import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "../../Components/Footer/Footer";

const PerfilUsuario = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Informaçoes pessoais!</Text>


      <View style={styles.menuContainer}>
        <Text style={styles.menuItem}>Nome</Text>
        <Text style={styles.menuItem}>Endereço</Text>
        <Text style={styles.menuItem}>Trocar senha</Text>
        <Text style={styles.menuItem}>Telefone</Text>
        <Text style={styles.menuItem}>Email</Text>
        <Text style={styles.menuItem}>Voltar</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: 70,
  },
  menuItem: {
    fontSize: 20,
    marginBottom: 35,
    color: "#F9C200",
  },
});

export default PerfilUsuario;
