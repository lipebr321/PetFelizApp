import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
  Picker,
  Button,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import axios from "axios";

import Footer from "../../Components/Footer/Footer";

const CadastroAnimal = () => {
  const [Pet, setPet] = useState({
    Nome_Pet: "",

    Sexo_Pet: "Selecione o Sexo",

    Descricao_Pet: "",

    Idade_Pet: "Selecione a Idade",

    Porte_Pet: "Selecione o Porte",

    Status_Pet: "Selecione uma opção",

    Castrado: "Disponivel",

    Base64: null,

    Especie: "Selecione a espécie",

    Raca: "Selecione a raça",
  });

  const [errors, setErrors] = useState({});

  const [base64, setBase64] = useState(null);

  const Idade_Pet = [
    "Entre 0 e 1",
    "Entre 1 e 4",
    "Entre 4 e 10",
    "Mais de 10",
  ];

  const Porte_Pet = [
    "Por anão",
    "Pequeno Porte",
    "Médio Porte",
    "Grande Porte",
    "Molosso",
  ];

  const Sexo_Pet = ["Macho", "Fêmea"];

  const Especie = ["Cachorro", "Gato"];

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Desculpe, precisamos de permissão para acessar sua galeria de imagens."
        );
      }
    })();
  }, []);

  const validateForm = async () => {
    return {};
  };

  const selecionarImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 1,
    });

    if (!result.cancelled) {
      const formData = new FormData();

      formData.append("file", {
        uri: result.uri,

        name: "file",

        type: "image/jpeg",
      });

      setPet({ ...Pet, Base64: formData });

      setBase64(result.uri);
    }
  };

  const handleSubmit = async () => {
    const validationErrors = await validateForm();

    setErrors(validationErrors);

    if (Pet.Base64) {
      if (Object.keys(validationErrors).length === 0) {
        try {
          const response = await axios.post(
            "https://localhost:44302/api/PetFeliz/CadastrarPet",
            Pet,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            alert("Cadastro realizado com sucesso");
          }
        } catch (error) {
          console.error("Erro ao fazer a solicitação:", error);

          alert("teste");
        }
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.cadastroTitle}>Informações do Pet</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do animal"
          onChangeText={(text) => setPet({ ...Pet, Nome_Pet: text })}
          value={Pet.Nome_Pet}
        />

        {errors.Nome_Pet && (
          <Text style={styles.labelError}>{errors.Nome_Pet}</Text>
        )}

        <TextInput
          style={styles.descricao}
          placeholder="Descrição do animal"
          onChangeText={(text) => setPet({ ...Pet, Descricao_Pet: text })}
          value={Pet.Descricao_Pet}
        />

        {errors.Descricao_Pet && (
          <Text style={styles.labelError}>{errors.Descricao_Pet}</Text>
        )}

        <Picker
          selectedValue={Pet.Especie}
          onValueChange={(itemValue) => setPet({ ...Pet, Especie: itemValue })}
          style={styles.dropdown}
        >
          <Picker.Item label="Espécie do animal" value="Selecione a espécie" />

          {Especie.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Pet.Porte_Pet}
          onValueChange={(itemValue) =>
            setPet({ ...Pet, Porte_Pet: itemValue })
          }
          style={styles.dropdown}
        >
          <Picker.Item label="Porte do animal" value="Selecione o Porte" />

          {Porte_Pet.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Pet.Idade_Pet}
          onValueChange={(itemValue) =>
            setPet({ ...Pet, Idade_Pet: itemValue })
          }
          style={styles.dropdown}
        >
          <Picker.Item label="Idade do animal" value="Selecione a Idade" />

          {Idade_Pet.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Pet.Sexo_Pet}
          onValueChange={(itemValue) => setPet({ ...Pet, Sexo_Pet: itemValue })}
          style={styles.dropdown}
        >
          <Picker.Item label="Sexo do animal" value="Selecione o Sexo" />

          {Sexo_Pet.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Pet.Castrado}
          onValueChange={(itemValue) => setPet({ ...Pet, Castrado: itemValue })}
          style={styles.dropdown}
        >
          <Picker.Item label="Castrado" value="Selecione a opção" />

          <Picker.Item label="Sim" value="Sim" />

          <Picker.Item label="Não" value="Não" />
        </Picker>

        <View style={styles.imageContainer}>
          <Button title="Selecione a imagem" onPress={selecionarImagem} />

          {base64 && <Image source={{ uri: base64 }} style={styles.image} />}
        </View>
      </View>

      <TouchableOpacity style={styles.cadastrarButton} onPress={handleSubmit}>
        <Text style={styles.textCadastrar}>CADASTRAR</Text>
      </TouchableOpacity>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },

  form: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9C200",
    borderRadius: 20,
    padding: 20,
    width: 350,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },

  dropdown: {
    width: 300,
    marginBottom: 5,
  },

  cadastroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    width: 300,
    height: 30,
    borderColor: "gray",
    marginBottom: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
  },

  descricao: {
    width: 300,
    height: 90,
    borderColor: "gray",
    marginBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
  },

  cadastrarButton: {
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
    marginBottom: 30,
    marginTop: 30,
    paddingVertical: 10,
  },

  textCadastrar: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },

  labelError: {
    fontSize: 16,
    color: "#ff375b",
    marginBottom: 2,
  },

  imageContainer: {
    marginLeft: 80,
    marginTop: 60,
  },
});

export default CadastroAnimal;
