import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Picker,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import axios from "axios";
import { AuthContextFunctions } from "../../../AuthContext";
import * as ImagePicker from "expo-image-picker";
import styles from '../../Pages/CadastroAnimal/styles';
import Footer from '../../Components/Footer/Footer';

const CadastroAnimal = () => {
  const [Nome_Pet, setNome_Pet] = useState("");
  const [Porte_Pet, setPorte_Pet] = useState("");
  const [Sexo_Pet, setSexo_Pet] = useState("");
  const [Idade_Pet, setIdade_Pet] = useState("");
  const [Descricao_Pet, setDescricao_Pet] = useState("");
  const [Status_Pet, setStatus_Pet] = useState("");
  const [Castrado, setCastrado] = useState("");
  const [Foto_Pet] = useState("");
  const [Base64, setBase64] = useState(null);
  const [cod_Usuario, setCod_Usuario] = useState("");
  const [Nome_Foto] = useState("");
  const [Especie, setEspecie] = useState({
    Nome_Especie: "",
  });

const [Animal, setAnimal] = useState({ Nome_Animal: '' });
const [Raca, setRaca] = useState({ Nome_Raca: '' });
const [selectedTipo, setSelectedTipo] = useState("");
const [selectedRaca, setSelectedRaca] = useState("");

const handleTipoChange = (tipoSelecionado) => {
  setSelectedTipo(tipoSelecionado);
  setSelectedRaca('');
  setAnimal({ Nome_Animal: tipoSelecionado }); // Atualiza o tipo de animal selecionado
};

const handleRacaChange = (selectedRaca) => {
  setSelectedRaca(selectedRaca);
  setRaca({ Nome_Raca: selectedRaca }); // Atualiza a raça selecionada
};


  const [Vacina, setVacina] = useState({
    data_vacina: "",
    status: "Selecione a opção",
    descricao: "",
  });

  const handleDataVacinaChange = (text) => {
    setVacina({ ...Vacina, data_vacina: text });
  };


  
  const racasCao = [
    "Akita",
    "Bulldog",
    "Chihuahua",
    "Dálmata",
    "Labrador Retriever",
    "Pastor Alemão",
    "Poodle",
    "Golden Retriever",
    "Rottweiler",
    "Boxer",
    "Husky Siberiano",
    "Vira-Lata",
    "Outros"
  ];
  
  const racasGato = [
    "Siamês",
    "Persa",
    "Maine Coon",
    "Sphynx",
    "Bengal",
    "Ragdoll",
    "British Shorthair",
    "Siberiano",
    "Angorá",
    "Manx",
    "Vira-Lata",
    "Outros"
  ];
  
  

  const idade_Pet = [
    "Entre 0 e 1",
    "Entre 1 e 4",
    "Entre 4 e 10",
    "Mais de 10",
  ];
  const porte_Pet = [
    { value: "anao", label: "Anão" },
    { value: "pequeno", label: "Pequeno Porte" },
    { value: "medio", label: "Médio Porte" },
    { value: "grande", label: "Grande Porte" },
    { value: "Molosso", label: "Molosso" },
  ];
  const sexo_Pet = ["M", "F"];
  const castrado = ["Sim", "Não"];
  const status_Pet = ["Disponivel"];
  const status = ["Valido", "Vencido"];

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleOK = () => {
    navigation.navigate("TelaPrincipal");
  };

  const validateForm = async () => {
    return {};
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const usuarioLogado  = await AuthContextFunctions.CheckUserLogin();
  
      if (usuarioLogado) {
        try {
          const userData = await AuthContextFunctions.GetUserData();
          const obj = JSON.parse(userData);
          console.log(obj);
          const userId = obj.Cod_Usuario;
          setCod_Usuario(userId);

        } catch (error) {
          console.error("Erro ao analisar os dados do usuário:", error);
        }
      } else {
        navigation.navigate("TelaDeLogin");
      }
    };
  
    fetchUserData();
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
        cod_Usuario,
      };

      if (!AuthContextFunctions.CheckUserLogin()) {
        console.log("Usuário não logado. Redirecionando para a página de login.");
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
          setShowModal(true);
        }
      } catch (error) {
        console.error("Erro ao fazer a solicitação:", error);
        alert("Erro ao cadastrar");
      }
    }
  };

  return (
    <View 
    showsVerticalScrollIndicator={false}
    style={styles.container}> 
      <ScrollView   
    showsVerticalScrollIndicator={false}
    style={styles.container}>
      <View style={styles.cadastroForm}>
      <View style={styles.balaoAmarelo}>
        <Text style={styles.cadastroTitle}>
          Informações do Pet
        </Text>
        </View>
      

        <TextInput
          style={styles.input}
          placeholder="Nome do animal"
          onChangeText={(text) => setNome_Pet(text)}
          value={Nome_Pet}
        />
        {errors.Nome_Pet && (
          <Text style={{ color: "red" }}>{errors.Nome_Pet}</Text>
        )}

        <TextInput
        style={styles.input}
          placeholder="Especie do animal"
          onChangeText={(text) =>
            setEspecie({ ...Especie, Nome_Especie: text })
          }
          value={Especie.Nome_Especie}
        />
        {errors.Nome_Pet && (
          <Text style={{ color: "red" }}>{errors.Nome_Pet}</Text>
        )}

<Picker
  selectedValue={selectedTipo}
  onValueChange={(itemValue) => handleTipoChange(itemValue)}
  style={styles.Picker}
>
  <Picker.Item label="Selecione o tipo" value="" />
  <Picker.Item label="Cachorro" value="cao" />
  <Picker.Item label="Gato" value="gato" />
</Picker>

<Picker
  selectedValue={selectedRaca}
  onValueChange={(itemValue) => handleRacaChange(itemValue)}
  style={styles.Picker}
>
  <Picker.Item label="Selecione a raça" value="" />
  {selectedTipo === 'cao' ? (
    racasCao.map((raca) => (
      <Picker.Item label={raca} value={raca} key={raca} />
    ))
  ) : selectedTipo === 'gato' ? (
    racasGato.map((raca) => (
      <Picker.Item label={raca} value={raca} key={raca} />
    ))
  ) : null}
</Picker>

        <Picker
          selectedValue={Idade_Pet}
          onValueChange={(itemValue) => setIdade_Pet(itemValue)}
          style={styles.Picker}
        >
          <Picker.Item label="Idade" value="Selecione a Idade" />
          {idade_Pet.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Porte_Pet}
          onValueChange={(itemValue) => setPorte_Pet(itemValue)}
          style={styles.Picker}
        >
          <Picker.Item label="Porte" value="Selecione o Porte" />
          {porte_Pet.map((option) => (
             <Picker.Item label={option.label} value={option.value} key={option.value} />
          ))}
        </Picker>

        <Picker
          selectedValue={Castrado}
          onValueChange={(itemValue) => setCastrado(itemValue)}
          style={styles.Picker}
        >
          <Picker.Item label="Animal Castrado?" value="Selecione a opção" />
          {castrado.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Sexo_Pet}
          onValueChange={(itemValue) => setSexo_Pet(itemValue)}
          style={styles.Picker}
        >
          <Picker.Item label="Sexo do animal?" value="Selecione o Sexo" />
          {sexo_Pet.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={Status_Pet}
          onValueChange={(itemValue) => setStatus_Pet(itemValue)}
          style={styles.Picker}
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
          style={styles.Picker}
        >
          <Picker.Item label="Valido?" value="Selecione uma opção" />
          {status.map((option) => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>

        <TextInput
        style={styles.input}
          placeholder="Tipo da vacina"
          onChangeText={(text) => setVacina({ ...Vacina, descricao: text })}
          value={Vacina.descricao}
        />

        <TextInput
     style={styles.input}
          placeholder="Descrição"
          onChangeText={(text) => setDescricao_Pet(text)}
          value={Descricao_Pet}
        />

        <TextInput
          placeholder="Data da vacina"
          onChangeText={handleDataVacinaChange}
          value={Vacina.data_vacina}
          type="date"
          style={styles.input}
        />

      <TouchableOpacity style={styles.SelecImageContainer} onPress={selecionarImagem}>
      <Text style={styles.CamText}>Selecionar imagem</Text>
      <Image source={require("/src/Components/images/camera.png")} style={styles.CamIcon} />
    </TouchableOpacity>
          
        <TouchableOpacity
          style={styles.cadastrarButton}
          onPress={handleSubmit}
        >
          <Text style={styles.textCadastrar}>
            Cadastrar pet
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
     <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
                Animal Cadastrado com sucesso!
            </Text>
            <TouchableOpacity style={styles.okButton} onPress={handleOK}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
    <Footer/>
    </View>
   
  );
};

export default CadastroAnimal;
