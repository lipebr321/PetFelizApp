import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import logo from "../../Components/images/LogoGrande.png";
import Footer from "../../Components/Footer/Footer";

function RecuperarSenha({ navigation }) {
  
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={logo} style={styles.img} />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={usuario.Email}
          onChangeText={(text) => handleInputChange(text, "Email")}
        />

        <Text style={styles.errorText}>{errors.email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={usuario.Senha}
          onChangeText={(text) => handleInputChange(text, "Senha")}
        />

        <Text style={styles.errorText}>{errors.senha}</Text>

        <Text style={styles.errorMessage}>{mensagem}</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <Text
          style={styles.link}
          onPress={() => navigation.navigate("TelaDeCadastro")}
        >
          Cadastre-se
        </Text>

        <Text style={styles.link} onPress={() => navigation.navigate("#")}>
          Esqueceu sua Senha?
        </Text>
      </View>

      <View>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    backgroundColor: "white",
  },

  imgContainer: {
    alignItems: "center",
  },

  img: {
    width: 150,

    height: 150,

    marginBottom: 70,

    marginTop: 30,
  },

  formContainer: {
    flex: 2,

    alignItems: "center",
  },

  input: {
    width: 350,

    height: 70,

    borderColor: "gray",

    marginBottom: 20,

    paddingLeft: 10,

    borderWidth: 1,

    borderRadius: 10,

    fontSize: 20,
  },

  button: {
    backgroundColor: "#F9C200",

    borderRadius: 10,

    width: 300,

    height: 70,

    alignItems: "center",

    shadowColor: "black",

    shadowOffset: { width: 0, height: 2 },

    shadowOpacity: 0.4,

    shadowRadius: 4,

    elevation: 4,

    marginTop: 30,

    paddingVertical: 10,
  },

  buttonText: {
    color: "white",

    textAlign: "center",

    fontSize: 30,

    fontWeight: "bold",
  },

  link: {
    fontSize: 20,

    marginTop: 20,
  },

  errorMessage: {
    color: "red",

    marginBottom: 10,
  },

  errorText: {
    color: "red",
  },
});

export default RecuperarSenha;
