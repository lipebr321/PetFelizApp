import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Picker, View, SafeAreaView } from 'react-native';
import axios from 'axios';
import * as yup from 'yup';
import Checkbox from '../../Components/CheckBoxAnimal/CheckBoxAnimal';

const CadastroAnimal = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    cep: '',
    nomeLog: '',
    numero: '',
  });

  const [errors, setErrors] = useState({});
  const [selectedPorte, setSelectedPorte] = useState('Selecione o Porte');
  const [selectedIdade, setSelectedIdade] = useState('Selecione a Idade');
  const [selectedSexo, setSelectedSexo] = useState('Selecione o Sexo');
  const [selectedEspecie, setSelectedEspecie] = useState('Selecione a especie');

  const idades = ['Entre 0 e 1', 'Entre 1 e 4', 'Entre 4 e 10', 'Mais de 10'];
  const portes = ['Pequeno Porte', 'Médio Porte', 'Grande Porte'];
  const sexos = ['M', 'F'];
  const especies = ['Gato', 'Cachorro'];

  // Função para validar o formulário
  const validateForm = async () => {
    try {
      const schema = yup.object().shape({
        nomeAnimal: yup.string().required('Informe o nome'),
        raca: yup.string().required('Informe o CPF'),
      });

      await schema.validate(formData, { abortEarly: false });
      return {};
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      return errors;
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    const validationErrors = await validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('https://localhost:44302/api/Usuario/cadastrarUsuario', formData);

        if (response.status === 200) {
          Alert.alert('Cadastro realizado com sucesso');
        } else {
          Alert.alert('Erro', 'Ocorreu um erro durante o cadastro');
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao fazer a solicitação à API');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.topo}>Informações do Pet</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do animal:"
        onChangeText={(text) => setFormData({ ...formData, nome: text })}
        value={formData.nome}
      />
      {errors.nome && <Text style={styles.labelError}>{errors.nome}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Raça:"
        onChangeText={(text) => setFormData({ ...formData, raca: text })}
        value={formData.raca}
      />
      {errors.cpf && <Text style={styles.labelError}>{errors.cpf}</Text>}

      <Picker
        selectedValue={selectedEspecie}
        onValueChange={(itemValue) => setSelectedEspecie(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Especie do animal" value="Selecione a especie" />
        {especies.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedPorte}
        onValueChange={(itemValue) => setSelectedPorte(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Porte do animal" value="Selecione o Porte" />
        {portes.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedIdade}
        onValueChange={(itemValue) => setSelectedIdade(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Idade do animal" value="Selecione a Idade" />
        {idades.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedSexo}
        onValueChange={(itemValue) => setSelectedSexo(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Sexo do animal" value="Selecione o Sexo" />
        {sexos.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>

      <View>
        <Checkbox label="Vermificado" onChange={(isChecked) => setFormData({ ...formData, vermifugado: isChecked })} />
        <Checkbox label="Castrado" onChange={(isChecked) => setFormData({ ...formData, castrado: isChecked })} />
        <Checkbox label="Vacinado" onChange={(isChecked) => setFormData({ ...formData, vacinado: isChecked })} />
      </View>

      <TouchableOpacity style={styles.cadastrar} onPress={handleSubmit}>
        <Text style={styles.textCadastrar}>Cadastrar pet</Text>
      </TouchableOpacity>
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
    fontSize: 16,
    color: '#ff375b',
    marginBottom: 2,
  },
  dropdown: {
    width: 350,
    height: 70,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default CadastroAnimal;
