import React, { useState } from "react";
import { View,  Text,  TextInput,
  TouchableOpacity, Alert,  Modal, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import styles from '../../Pages/TelaDeCadastro/styles'
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../Components/Footer/Footer";

const TelaDeCadastro = ({ navigation }) => {
  const [usuario, setUsuario] = useState({
    CPF: "",
    Nome: "",
    Email: "",
    Telefone: "",
    Senha: "",
    Logradouro: {
      CEP: "",
      NomeLog: "",
      Numero: "",
    },
    Cidade: {
      Nome_Cidade: "",
    },
    Estado: {
      Nome_Estado: "",
    }
  });

  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleInputChange = (text, field) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,

      [field]: text,
    }));
  };

  const handleLogradouroInputChange = (text, field) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,

      Logradouro: {
        ...prevUsuario.Logradouro,

        [field]: text,
      },
    }));
  };

  const handleCidadeInputChange = (text, field) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      Cidade: {
        ...prevUsuario.Cidade,
        [field]: text,
      },
    }));
  };


  const handleEstadoInputChange = (text, field) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      Estado: {
        ...prevUsuario.Estado,
        [field]: text,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (
        !usuario.Nome ||
        !usuario.CPF ||
        !usuario.Email ||
        !usuario.Telefone ||
        !usuario.Senha ||
        !usuario.Logradouro.CEP ||
        !usuario.Logradouro.NomeLog ||
        !usuario.Logradouro.Numero||
        !usuario.Cidade.Nome_Cidade||
        !usuario.Estado.Nome_Estado
      ) {
        Alert.alert("Preencha todos os campos");
        setLoading(false);

        return;
      }

      const response = await axios.post("https://petfeliz.azurewebsites.net/api/Usuario/CadastrarUsuario",
      usuario);
      console.log("Cadastro bem-sucedido:", response.data);

      setUsuario({
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
        Cidade: {
          Nome_Cidade: '',
        },
        Estado: {
          Nome_Estado: '',
        }
      });

      setCadastroSucesso(true);
    } catch (error) {
      console.error("Erro no cadastro:", error);

      Alert.alert("Erro", "Ocorreu um erro durante o cadastro");
      setLoading(false);

    }
  };

  const handleOK = () => {
    setCadastroSucesso(false);

    navigation.navigate("TelaDeLogin");
  };

  return (

    <View
    showsVerticalScrollIndicator={false}
    style={styles.container}>
      <SafeAreaView>
        <View style={styles.balaoAmarelo} > 
        <Text style={styles.cadastroTitle}>Faça seu Cadastro!</Text>
        </View>
      </SafeAreaView>
       
      <ScrollView
    showsVerticalScrollIndicator={false}
  >
     <View style={styles.cadastroForm}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={usuario.Nome}
          onChangeText={(text) => handleInputChange(text, "Nome")}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={usuario.CPF}
          onChangeText={(text) => handleInputChange(text, "CPF")}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={usuario.Email}
          onChangeText={(text) => handleInputChange(text, "Email")}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={usuario.Telefone}
          onChangeText={(text) => handleInputChange(text, "Telefone")}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={usuario.Senha}
          onChangeText={(text) => handleInputChange(text, "Senha")}
        />

        <TextInput
          style={styles.input}
          placeholder="CEP"
          value={usuario.Logradouro.CEP}
          onChangeText={(text) => handleLogradouroInputChange(text, "CEP")}
        />

        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={usuario.Estado.Nome_Estado}
          onChangeText={(text) => handleEstadoInputChange(text, "Nome_Estado")}
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={usuario.Cidade.Nome_Cidade}
          onChangeText={(text) => handleCidadeInputChange(text, "Nome_Cidade")}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={usuario.Logradouro.NomeLog}
          onChangeText={(text) => handleLogradouroInputChange(text, "NomeLog")}
        />

        <TextInput
          style={styles.input}
          placeholder="Número"
          value={usuario.Logradouro.Numero}
          onChangeText={(text) => handleLogradouroInputChange(text, "Numero")}
        />
        {loading ? (
                <ActivityIndicator size="large" color="#F9C200" />
              ) : (
        <TouchableOpacity style={styles.cadastrarButton} onPress={handleSubmit}>
          <Text style={styles.textCadastrar}>CADASTRAR</Text>
        </TouchableOpacity>
               )}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("TelaDeLogin")}
        >
          Ja sou cadastrado!
        </Text>
        
      </View>
        </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={cadastroSucesso}
        onRequestClose={() => {
          setCadastroSucesso(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Cadastro realizado com sucesso!
            </Text>

            <TouchableOpacity style={styles.okButton} onPress={handleOK}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        <Footer/>
    </View>
    
  );
};

export default TelaDeCadastro;
