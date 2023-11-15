import React from "react";
import { View, Text, Image } from "react-native";
import logo from "../../Components/images/LogoGrande.png";
import Footer from '../../Components/Footer/Footer';
import styles from '../../Pages/SobreNos/styles';

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

export default SobreNosScreen;
