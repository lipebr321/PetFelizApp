import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { AuthContextFunctions } from "../../../AuthContext";
import * as ImagePicker from "expo-image-picker";

const CadastroAnimal = () => {
  const [Nome_Pet, setNome_Pet] = useState("123");
  const [Porte_Pet, setPorte_Pet] = useState("");
  const [Sexo_Pet, setSexo_Pet] = useState("M");
  const [Idade_Pet, setIdade_Pet] = useState("");
  const [Descricao_Pet, setDescricao_Pet] = useState("123");
  const [Status_Pet, setStatus_Pet] = useState("");
  const [Castrado, setCastrado] = useState("");
  const [Foto_Pet] = useState("");
  const [Base64, setBase64] = useState(null);
  const [Cod_Usuario, setCod_Usuario] = useState("");
  const [Nome_Foto] = useState("");
  const [Especie, setEspecie] = useState({
    Nome_Especie: "",
  });

  const [Raca, setRaca] = useState({
    Nome_Raca: "",
  });

  const [Animal, setAnimal] = useState({
    Nome_Animal: "",
  });

  const [Vacina, setVacina] = useState({
    data_vacina: "",
    status: "Selecione a opção",
    descricao: "",
  });

  const handleDataVacinaChange = (text) => {
    setVacina({ ...Vacina, data_vacina: text });
  };

  const idade_Pet = [
    "Entre 0 e 1",
    "Entre 1 e 4",
    "Entre 4 e 10",
    "Mais de 10",
  ];
  const porte_Pet = ["Pequeno Porte", "Médio Porte", "Grande Porte"];
  const sexo_Pet = ["M", "F"];
  const castrado = ["Sim", "Não"];
  const status_Pet = ["Disponivel"];
  const status = ["Valido", "Vencido"];

  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    return {};
  };

  useEffect(() => {
    const usuarioLogado = AuthContextFunctions.CheckUserLogin();

    if (usuarioLogado) {
      const userData = AuthContextFunctions.GetUserData();
      try {
        const userId = userData.Cod_Usuario;
        setCod_Usuario(userId);
      } catch (error) {
        console.error("Erro ao analisar os dados do usuário:", error);
      }
    } else {
      navigation.navigate("TelaDeLogin");
    }
  }, []);

  async function selecionarImagem() {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
    });

    if (result.canceled) {
        return;
    }
    setBase64(result.assets[0].uri);
}

  const handleSubmit = async () => {
    const validationErrors = await validateForm();
    setErrors(validationErrors);

    if (Base64) {
      const body = {
        Vacina,
        Animal,
        Raca,
        Especie,
        Nome_Pet,
        Porte_Pet,
        Sexo_Pet,
        Idade_Pet,
        Descricao_Pet,
        Status_Pet,
        Castrado,
        Nome_Foto,
        Foto_Pet,
        Base64,
        Cod_Usuario,
      };

      if (!AuthContextFunctions.CheckUserLogin()) {
        console.log(
          "Usuário não logado. Redirecionando para a página de login."
        );
        return;
      }

      const headers = await AuthContextFunctions.GenerateHeader();

      const config = {
        headers: headers,
      };

      try {
        const response = await axios.post(
          "https://petfeliz.azurewebsites.net/api/PetFeliz/CadastrarPet",
          body,
          config
        );

        if (response.status === 200) {
          alert("Cadastro realizado com sucesso");
        }
      } catch (error) {
        console.error("Erro ao fazer a solicitação:", error);
        alert("teste");
      }
    }
  };

  return (
    <ScrollView>
      <View style={{ margin: 16 }}>
        <Text style={{ fontSize: 24, marginBottom: 16 }}>
          Informações do Pet
        </Text>

        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 8,
          }}
          placeholder="Nome do animal"
          onChangeText={(text) => setNome_Pet(text)}
          value={Nome_Pet}
        />
        {errors.Nome_Pet && (
          <Text style={{ color: "red" }}>{errors.Nome_Pet}</Text>
        )}

        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 8,
          }}
          placeholder="Especie do animal"
          onChangeText={(text) =>
            setEspecie({ ...Especie, Nome_Especie: text })
          }
          value={Especie.Nome_Especie}
        />
        {errors.Nome_Pet && (
          <Text style={{ color: "red" }}>{errors.Nome_Pet}</Text>
        )}

        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 8,
          }}
          placeholder="Raça"
          onChangeText={(text) => setRaca({ ...Raca, Nome_Raca: text })}
          value={Raca.Nome_Raca}
        />
        {errors.Nome_Raca && (
          <Text style={{ color: "red" }}>{errors.Nome_Raca}</Text>
        )}

        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 8,
          }}
          placeholder="Tipo"
          onChangeText={(text) => setAnimal({ ...Animal, Nome_Animal: text })}
          value={Animal.Nome_Animal}
        />
        {errors.Nome_Animal && (
          <Text style={{ color: "red" }}>{errors.Nome_Animal}</Text>
        )}

        <Picker
          selectedValue={Idade_Pet}
          onValueChange={(itemValue) => setIdade_Pet(itemValue)}
          style={{ height: 50, width: "100%", marginBottom: 8 }}
        >
          <Picker.Item label="Idade" value="Selecione a Idade" />
          {idade_Pet.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Porte_Pet}
          onValueChange={(itemValue) => setPorte_Pet(itemValue)}
          style={{ height: 50, width: "100%", marginBottom: 8 }}
        >
          <Picker.Item label="Porte" value="Selecione o Porte" />
          {porte_Pet.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Castrado}
          onValueChange={(itemValue) => setCastrado(itemValue)}
          style={{ height: 50, width: "100%", marginBottom: 8 }}
        >
          <Picker.Item label="Animal Castrado?" value="Selecione a opção" />
          {castrado.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Sexo_Pet}
          onValueChange={(itemValue) => setSexo_Pet(itemValue)}
          style={{ height: 50, width: "100%", marginBottom: 8 }}
        >
          <Picker.Item label="Sexo do animal?" value="Selecione o Sexo" />
          {sexo_Pet.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Status_Pet}
          onValueChange={(itemValue) => setStatus_Pet(itemValue)}
          style={{ height: 50, width: "100%", marginBottom: 8 }}
        >
          <Picker.Item label="Status?" value="Selecione uma opção" />
          {status_Pet.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Vacina.status}
          onValueChange={(itemValue) =>
            setVacina({ ...Vacina, status: itemValue })
          }
          style={{ height: 50, width: "100%", marginBottom: 8 }}
        >
          <Picker.Item label="Valido?" value="Selecione uma opção" />
          {status.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 8,
          }}
          placeholder="Tipo da vacina"
          onChangeText={(text) => setVacina({ ...Vacina, descricao: text })}
          value={Vacina.descricao}
        />

        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 8,
          }}
          placeholder="Descrição"
          onChangeText={(text) => setDescricao_Pet(text)}
          value={Descricao_Pet}
        />

        <TextInput
          placeholder="Data da vacina"
          onChangeText={handleDataVacinaChange}
          value={Vacina.data_vacina}
          type="date"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
        />

         <Button title="Selecione a imagem" onPress={selecionarImagem} />
          
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
            marginTop: 16,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Cadastrar pet
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CadastroAnimal;
