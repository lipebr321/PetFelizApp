import React from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';



const TelaDeLogin = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Image
        source require = {('/src/images/LogoGrande.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail:"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha:"
        secureTextEntry={true}
      />
       <TouchableOpacity
      style={styles.logar}
    >
      <Text style={styles.textLogar}>Entrar</Text>
    </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate('TelaDeCadastro')}>Cadastre-se</Text>
      <Text style={styles.link} onPress={() => navigation.navigate('#')}>Esqueceu sua senha?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 125,
    marginTop:15,
  },
  input: {
    width: 350,
    height: 70,
    borderColor: 'gray',
    marginBottom: 20,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
  },

  logar:{
    backgroundColor: '#F9C200', // Cor de fundo do botão
    borderRadius: 10,
    width: 300, // Largura do botão
    height:70,
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 70,
    paddingVertical: 10,

  },
  textLogar:{
      color: 'white', // Cor do texto do botão
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
  },
  link: {
    fontSize: 20,
    marginTop: 30,
  },
});

export default TelaDeLogin;
