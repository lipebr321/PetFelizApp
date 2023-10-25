import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";

const TelaConfig = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.balaoAmarelo}>
        <Text style={styles.titulo}>Informações Pessoais !</Text>
      </View>

      <View style={styles.menuContainer}>

        <Text
          style={styles.menuItem}
          onPress={('')}
        >
          Nome
        </Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={('')}
        >
          Endereço
        </Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={('')}
        >
          Trocar senha
        </Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={('')}
        >
          Telefone
        </Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={('')}
        >
          Email
        </Text>

        <Linha />

        <Text 
        style={styles.menuItem}
        onPress={('')}
        >
          Voltar</Text>
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

  balaoAmarelo: {
    backgroundColor: "#F9C200",
    padding: 10,
    alignItems: "center",
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
    height: 70,
    marginBottom: 30,
    borderRadius: 60,
  },
  titulo: {
    fontSize: 24,
    color: 'white'
  },

  menuContainer: {
    marginBottom: 70,
    marginTop: 40,
  },

  menuItem: {
    fontSize: 16,
    marginBottom: 40,
    color: "#F9C200",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default TelaConfig;
