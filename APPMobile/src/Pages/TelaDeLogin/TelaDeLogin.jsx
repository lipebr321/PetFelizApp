import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import styles from "../../Pages/TelaDeLogin/styles";
import { AuthContextFunctions } from "../../../AuthContext";


function TelaDeLogin({ navigation }) {
  const [loading, setLoading] = useState(false);
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
    },
  });
  const [mensagem, setMensagem] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    senha: "",
  });

  useEffect(() => {
    ChecarLoginUsuario();
  }, []);
  async function ChecarLoginUsuario() {
    const usuarioLogado = await AuthContextFunctions.CheckUserLogin();
    if (usuarioLogado) {
      navigation.navigate("TelaPrincipalNavigator");
    }
  }

  const handleInputChange = (name, value) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
    setMensagem("");
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
  
      if (!usuario.Email || !usuario.Senha) {
        setMensagem("Preencha ambos os campos.");
        setErrors({
          email: !usuario.Email ? "Campo obrigatório" : "",
          senha: !usuario.Senha ? "Campo obrigatório" : "",
        });
        return;
      }
  
      const response = await axios.post(
        "https://petfeliz.azurewebsites.net/api/Auth/Login",
        usuario
      );
  
      if (response.status === 200) {
        const token = response.data.token;
        console.log("Token obtido:", token);
        await AuthContextFunctions.SaveJWT(token);
        navigation.navigate("TelaPrincipalNavigator");
      } else {
        if (response.status === 401) {
          setMensagem("Usuário ou senha incorretos.");
        } else {
          setMensagem("Algo deu errado. Por favor, tente novamente mais tarde.");
        }
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setMensagem("Pedimos desculpas, erro no servidor. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: 'https://testesluis.blob.core.windows.net/teste/LogoGrande.png' }}
 style={styles.img} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={usuario.Email}
          onChangeText={(text) => handleInputChange("Email", text)}
        />
        <Text style={styles.errorText}>{errors.email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={usuario.Senha}
          onChangeText={(text) => handleInputChange("Senha", text)}
        />
        <Text style={styles.errorText}>{errors.senha}</Text>
        <Text style={styles.errorMessage}>{mensagem}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#F9C200" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
        )}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("TelaDeCadastro")}
        >
          Cadastre-se
        </Text>
        <Text style={styles.link} onPress={() => navigation.navigate("#")}>
          Esqueceu sua Senha?
        </Text>
      </View>
      <View>
        <Footer />
      </View>
    </View>
  );
}

export default TelaDeLogin;
