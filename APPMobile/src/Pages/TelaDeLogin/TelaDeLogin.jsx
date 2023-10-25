import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import logo from '../../Components/images/LogoGrande.png';
import Footer from '../../Components/Footer/Footer';

function TelaDeLogin ({ navigation }) {
  const [usuario, setUsuario] = useState({
    CPF: '',
    Nome: '',
    Email: '',
    Telefone: '',
    Senha: '',
    Logradouro: {
      CEP: '',
      NomeLog: '',
      Numero: '',
    },
  });
  

  const [mensagem, setMensagem] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    senha: '',
  });

  const handleInputChange = (text, field) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [field]: text,
    }));
    setErrors({ ...errors, [field]: '' }); 
  };

  const handleLogin = async () => {
    try {
      if (!usuario.Email || !usuario.Senha) {
        setMensagem('Preencha ambos os campos.');
        setErrors({
          email: !usuario.Email ? 'Campo obrigatório' : '',
          senha: !usuario.Senha ? 'Campo obrigatório' : '',
        });
        return;
      }
      const response = await axios.post("https://localhost:44302/api/Usuario/Login", usuario);
      if (response.status === 200) {
        const userData = response.data;
        setUsuario((prevUsuario) => ({
          ...prevUsuario,
          ID: userData.id,
          Nome: userData.nome,
          CPF: userData.cpf,
          Telefone: userData.telefone,
          Email: userData.email,
          Senha: userData.senha,
          CEP : userData.cep,
          NomeLog : userData.nomeLog,
          Logradouro : userData.logradouro,
          

          
        }));
        navigation.navigate('TelaPrincipalNavigator');
      } else {
        setMensagem('Usuário ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setMensagem('Erro no servidor.');
    }
  };
  
  

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
          onChangeText={(text) => handleInputChange(text, 'Email')}
        />
        <Text style={styles.errorText}>{errors.email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={usuario.Senha}
          onChangeText={(text) => handleInputChange(text, 'Senha')}
        />
        <Text style={styles.errorText}>{errors.senha}</Text>
        <Text style={styles.errorMessage}>{mensagem}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
        <Text style={styles.link} onPress={() => navigation.navigate('TelaDeCadastro')}>Cadastre-se</Text>
      <Text style={styles.link} onPress={() => navigation.navigate('#')}>Esqueceu sua Senha?</Text>
      </View>
      <View>
      <Footer/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imgContainer: {
    alignItems:'center',
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 70,
    marginTop: 30,
  },
  formContainer: {
    flex: 2,
    alignItems: 'center',
  },
  input: {
    width: 350,
    height: 70,
    borderColor: 'gray',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,

  },
  button: {
    backgroundColor: '#F9C200',
    borderRadius: 10,
    width: 300,
    height: 70,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 30,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 20,
    marginTop: 20,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default TelaDeLogin;
