import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, Linking  } from "react-native";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";
import styles from '../../Pages/TelaPet/styles';

const TelaPet = ({ route, navigation }) => {
  const { pet } = route.params;
  const [showModal, setShowModal] = useState(false);
  const mensagemPadrao = `%20Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20pet%20${pet.nome_Pet}`;

  const handleAdotar = () => {
    setShowModal(true);
  };

  
  const handleWhatsApp = () => {
    const whatsappLink = `https://api.whatsapp.com/send?phone=${pet.usuario.telefone}&text=${mensagemPadrao}`;
    Linking.openURL(whatsappLink);
    setShowModal(false); 
  };

  const cancelLogout = () => {
    setShowModal(false); 
  };


  return (
    <View style={styles.container}>
      <View style={styles.nomeContainer}>
        <Text style={styles.nome}>{pet.nome_Pet}</Text>
      </View>

      <View style={styles.infoPet}>
        <Text style={styles.status}>{pet.status_Pet}</Text>
      </View>

      <View style={styles.imgContainer}>
        <Image source={{ uri: pet.foto_Pet }} style={styles.image} />
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("TelaPrincipal");
          }}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAdotar}>
          <Text style={styles.buttonText}>Adotar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.descricaoPet}>
        <Linha />
        <Text style={styles.age}>Nome do doador: {pet.usuario.nome}</Text>
        <Text style={styles.age}>{pet.cidade.nome_Cidade}/{pet.estado.nome_Estado}</Text>
        <Text style={styles.age}>Raça: {pet.raca.nome_Raca}</Text>
        <Text style={styles.age}>Idade: {pet.idade_Pet} anos</Text>
        <Text style={styles.age}>Vacina: {pet.vacina.status}/{pet.vacina.descricao}{'\n'}Data da vacina:{pet.vacina.data_vacina}</Text>
        <Text style={styles.description}>Mais sobre o animal: {'\n'}{pet.descricao_Pet}</Text>
      </View>
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ao aceitar essa adoção você será redirecionado ao whatsaap do doador, tem certeza que deseja adotar o pet?</Text>
            <TouchableOpacity style={styles.Button} onPress={handleWhatsApp}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={cancelLogout}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            </View>
          </View>
      </Modal>
      <Footer />
    </View>
  );
};

export default TelaPet;
