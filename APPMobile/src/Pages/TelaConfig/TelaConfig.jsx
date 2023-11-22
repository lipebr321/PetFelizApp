import React from "react";
import { View, Text } from "react-native";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";
import styles from '../../Pages/TelaConfig/styles';




const TelaConfig = ({ navigation }) => {


const voltarTelaAnterior = () => {
  navigation.goBack();
};
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
        onPress={(voltarTelaAnterior)}
        >
          Voltar</Text>
      </View>

      <Footer />
    </View>
  );
};

export default TelaConfig;
