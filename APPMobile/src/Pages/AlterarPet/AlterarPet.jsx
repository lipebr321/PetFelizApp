import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button, Image } from "react-native";
import Footer from "../../Components/Footer/Footer";
import styles from './styles';

const AlterarPet = ({ route }) => {
  const { pet } = route.params;

  const [nomePet, setNomePet] = useState(pet.nome_Pet);
  const [statusPet, setStatusPet] = useState(pet.status_Pet);
  const [idadePet, setIdadePet] = useState(pet.idade_Pet);
  const [vacinaStatus, setVacinaStatus] = useState(pet.vacina.status);
  const [vacinaDescricao, setVacinaDescricao] = useState(pet.vacina.descricao);
  const [vacinaData, setVacinaData] = useState(pet.vacina.data_vacina);
  const [descricaoPet, setDescricaoPet] = useState(pet.descricao_Pet);

  const handleAlterar = () => {
    
    console.log("Alterações:", {
      nomePet,
      statusPet,
      idadePet,
      vacinaStatus,
      vacinaDescricao,
      vacinaData,
      descricaoPet,
    });
    
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: pet.foto_Pet }} style={styles.image} />
      </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nomePet}
            onChangeText={(text) => setNomePet(text)}
            placeholder="Nome do Pet"
          />
 


          <TextInput
            style={styles.input}
            value={statusPet}
            onChangeText={(text) => setStatusPet(text)}
            placeholder="Status do Pet"
          />
 

  
          <TextInput
            style={styles.input}
            value={idadePet}
            onChangeText={(text) => setIdadePet(text)}
            placeholder="Idade do Pet"
          />


     
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={descricaoPet}
            onChangeText={(text) => setDescricaoPet(text)}
            placeholder="Descrição do Pet"
          />



          <TextInput
            style={styles.input}
            value={vacinaStatus}
            onChangeText={(text) => setVacinaStatus(text)}
            placeholder="Status da Vacina"
          />
          <TextInput
            style={styles.input}
            value={vacinaDescricao}
            onChangeText={(text) => setVacinaDescricao(text)}
            placeholder="Descrição da Vacina"
          />
          <TextInput
            style={styles.input}
            value={vacinaData}
            onChangeText={(text) => setVacinaData(text)}
            placeholder="Data da Vacina"
          />
        </View>

        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAlterar}>
            <Text style={styles.buttonText}>Alterar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default AlterarPet;
