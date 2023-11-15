import React, { useState } from "react";
import {View,  Text, TextInput, TouchableOpacity, Image } from "react-native";
import logo from "../../Components/images/LogoGrande.png";
import Footer from "../../Components/Footer/Footer";
import styles from '../../Pages/RecuperarSenha/styles';

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

export default RecuperarSenha;
