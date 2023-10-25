import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";

const TelaPet = ({ route, navigation }) => {
  const { pet } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.nomeContainer}>
        <Text style={styles.nome}>{pet.nome_Pet}</Text>
      </View>

      <View style={styles.infoPet}>
        <Text style={styles.status}>{pet.status_Pet}</Text>
      </View>

      <View style={styles.imgContainer}>
        <Image source={{ uri: pet.foto_Pet }} style={styles.image} />
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("TelaPrincipal");
          }}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={""}>
          <Text style={styles.buttonText}>Adotar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.descricaoPet}>
        <Linha />
        <Text style={styles.age}>{pet.idade_Pet}</Text>

        <Text style={styles.description}>{pet.descricao_Pet}</Text>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  nomeContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },

  infoPet: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 95,
    height: 28,
    backgroundColor: "#38CA2B",
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  nome: {
    fontSize: 30,
    color: "purple",
  },

  status: {
    fontSize: 16,
    color: "white",
    width: 87,
    height: 19,
  },

  button: {
    backgroundColor: "#F9C200",
    borderRadius: 10,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },

  imgContainer: {
    alignItems: "center",
  },

  image: {
    width: 350,
    height: 350,
    borderRadius: 20,
  },

  description: {
    fontSize: 16,
    margin: 10,
    textAlign: "left",
    marginLeft: 10,
    marginBottom: 5,
    paddingBottom: 5,
  },

  descricaoPet: {
    width: 350,
    justifyContent: "center",
  },

  age: {
    fontSize: 16,
    textAlign: "left",
    marginLeft: 10,
    marginBottom: 5,
  },

  botoesContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
});

export default TelaPet;
