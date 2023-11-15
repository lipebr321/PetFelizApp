import React from "react";
import { View, Text, Image } from "react-native";
import Usuario from "../../Components/images/gatinho.png";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";
import styles from '../../Pages/PerfilUsuario/styles';

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

export default PerfilUsuario;
