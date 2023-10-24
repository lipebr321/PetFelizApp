import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import logo from "../../Components/images/LogoGrande.png";
import Footer from '../../Components/Footer/Footer';

const SobreNosScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.balaoAmarelo}>
        <Text style={styles.tituloQuemSomos}>Quem Somos ?</Text>
      </View>

      <Text style={styles.paragrafo}>
        Bem-vindo à nossa organização de adoção e doação de animais! Somos uma
        equipe dedicada de amantes de animais que se preocupam profundamente com
        o bem-estar dos animais e estamos comprometidos em ajudar a encontrar
        lares amorosos e permanentes para animais necessitados.
      </Text>

      <View style={styles.paragrafoImagemContainer}>
        <Text style={styles.paragrafo}>
          Convidamos você a se juntar a nós nesta missão importante de ajudar a
          encontrar lares amorosos e permanentes para animais necessitados.
        </Text>
        <Image source={logo} style={styles.imagemPequena} />
      </View>

      <Text style={styles.paragrafo}>
        Juntos podemos fazer a diferença na vida dos animais e na comunidade em
        geral.
      </Text>

      <View style={styles.paragrafoImagemContainer}>
        <Image source={logo} style={styles.imagemPequena} />
        <Text style={styles.paragrafo}>
          Estamos comprometidos em ajudar os animais necessitados a encontrar
          suas famílias amorosas, oferecendo serviços de adoção, doação e
          aconselhamento.
        </Text>
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
  tituloQuemSomos: {
    fontSize: 24,

  },
  paragrafo: {
    fontSize: 16,
    marginBottom: 15,
  },
  paragrafoImagemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imagemPequena: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});

export default SobreNosScreen;
