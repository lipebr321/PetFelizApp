import React, { useState } from 'react';
import {View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert,} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';


const schema = yup.object({
  
  email: yup.string().email('Formato de email inválido').required('Informe seu email'),

  senha: yup.string().required('Informe sua senha'),
});


const TelaDeLogin = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });



  async function logar(data) {
    setIsLoading(true);
  
    try {
      const response = await axios.post('https://localhost:7237/api/teste', data);
  
      if (response.status === 200) {
       
        navigation.navigate('TelaPrincipal');

      } else {
     
        if (response.status === 401) {

          Alert.alert('Erro', 'Credenciais incorretas');

        } else {
       
          Alert.alert('Erro', 'Ocorreu um erro inesperado na API');
        }
      }
  
      setIsLoading(false);

    } catch (error) {

      console.error('Erro ao fazer a solicitação:', error);

      Alert.alert('Erro', 'Ocorreu um erro ao fazer a solicitação à API');

      setIsLoading(false);
    }
  }
  

  return (
    <View style={styles.container}>
    
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Digite seu email:"
          />
        )}
      />
      {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Digite sua senha:"
            secureTextEntry={true}
          />
        )}
      />
      {errors.senha && <Text style={styles.labelError}>{errors.senha?.message}</Text>}

      {isLoading ? (
        <ActivityIndicator size="large" color="#F9C200" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity
          style={styles.logar}
          onPress={handleSubmit(logar)}
        >
          <Text style={styles.textLogar}>Entrar</Text>
        </TouchableOpacity>
      )}

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
    marginTop: 15,
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
  logar: {
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
    marginTop: 70,
    paddingVertical: 10,
  },
  textLogar: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 20,
    marginTop: 30,
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8,
  },
});

export default TelaDeLogin;
