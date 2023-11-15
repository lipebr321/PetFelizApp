import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";
import styles from '../../Pages/TelaPet/styles';

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

export default TelaPet;
