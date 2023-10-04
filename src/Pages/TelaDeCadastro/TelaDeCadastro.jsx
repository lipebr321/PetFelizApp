import React from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    cpf: yup.string().required('Informe o CPF'),
    nome: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o email').email('Email inválido'),
    telefone: yup.string().required('Informe o telefone'),
    senha: yup.string().required('Informe a senha'),
    confirmarSenha: yup
      .string()
      .oneOf([yup.ref('senha'), null], 'As senhas devem coincidir')
      .required('Confirme a senha'),
      
    logradouro: yup.object().shape({
      cep: yup.string().required('Informe o CEP'),
      nomeLog: yup.string().required('Informe o endereço'),
      numero: yup.string().required('Informe o número'),
    }),
  });
  

const TelaDeCadastro = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const cadastrar = async (Formdata) => {
    try {
      const response = await axios.post('https://localhost:44302/api/Usuario/cadastrarUsuario', Formdata);

      if (response.status === 200) {
        Alert.alert('Cadastro realizado com sucesso');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro durante o cadastro');
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer a solicitação à API');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
   
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nome:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nome && <Text style={styles.labelError}>{errorsnome.message}</Text>}

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="CPF:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.cpf && <Text style={styles.labelError}>{errors.cpf.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite seu email:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.labelError}>{errors.email.message}</Text>}

      <Controller
  control={control}
  name="senha"
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput
      style={[styles.input, errors.senha && styles.inputError]}
      placeholder="Senha:"
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      secureTextEntry={true}
    />
  )}
/>
{errors.senha && <Text style={styles.labelError}>{errors.senha.message}</Text>}

<Controller
  control={control}
  name="confirmarSenha"
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput
      style={[styles.input, errors.confirmarSenha && styles.inputError]}
      placeholder="Confirmar senha:"
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      secureTextEntry={true}
    />
  )}
/>
{errors.confirmarSenha && (
  <Text style={styles.labelError}>{errors.confirmarSenha.message}</Text>
)}

      <Controller
        control={control}
        name="telefone"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Telefone:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.telefone && <Text style={styles.labelError}>{errors.telefone.message}</Text>}
 
      <Controller
        control={control}
        name="cep"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="CEP:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.cep && <Text style={styles.labelError}>{errors.cep.message}</Text>}

      <Controller
        control={control}
        name="nomeLog"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Endereço:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nomeLog && <Text style={styles.labelError}>{errors.nomeLog.message}</Text>}

      <Controller
        control={control}
        name="numero"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Numero:"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.numero && <Text style={styles.labelError}>{errors.numero.message}</Text>}

      <TouchableOpacity style={styles.cadastrar} onPress={handleSubmit(cadastrar)}>
        <Text style={styles.textCadastrar}>Cadastrar</Text>
      </TouchableOpacity>

      <SafeAreaView style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginTop: 30 }}>Já sou cadastrado!</Text>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  topo: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 30,
    alignItems: 'center',
    fontWeight: 'bold',
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
  cadastrar: {
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
  textCadastrar: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  labelError: {
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },
});

export default TelaDeCadastro;
