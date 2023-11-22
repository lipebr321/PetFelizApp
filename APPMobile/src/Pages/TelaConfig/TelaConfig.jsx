import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Footer from "../../Components/Footer/Footer";
import Linha from "../../Components/DivisorDeTela/DivisorDeTela";
import styles from '../../Pages/TelaConfig/styles';
import { AuthContextFunctions } from "../../../AuthContext";




const TelaConfig = ({ navigation }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    InitializeUser();
  }, []);

  async function InitializeUser() {
    let userData = await AuthContextFunctions.GetUserData();
    setUser(userData);
  }
const voltarTelaAnterior = () => {
  navigation.goBack();
};
  return (
    <View style={styles.container}>
      <View style={styles.balaoAmarelo}>
        <Text style={styles.titulo}>Informações Pessoais !</Text>
      </View>

      <View style={styles.menuContainer}>
        <Text
          style={styles.menuItem}
        >
          Nome
        </Text>
        <Text
          style={styles.infoUsuario}
        >
          {user.Nome_Usuario}
        </Text> 

        <Linha />

        <Text
          style={styles.menuItem}
    
        >
          Endereço
        </Text>

        <Text style={styles.infoUsuario}>
        {user.Nome_Cidade} - {user.Nome_Log} 
</Text>

        <Linha />

        <Text
          style={styles.menuItem}

        >
          Trocar senha
        </Text>

        <Text style={styles.infoUsuario}>
       ********
</Text>

        <Linha />

        <Text
          style={styles.menuItem}
        >
          Telefone
        </Text>

        <Text style={styles.infoUsuario}>
        + 55 {user.Telefone}
</Text>

        <Linha />

        <Text
          style={styles.menuItem}
          onPress={('')}
        >
          Email
        </Text>

        <Text style={styles.infoUsuario}>
        {user.Email}
</Text>

        <Linha />
        <View style={styles.containerButtons}>
        <Text 
        style={styles.menuItem}
        onPress={(voltarTelaAnterior)}
        >
          Voltar</Text>
          <TouchableOpacity style={styles.Button} onPress={''}>
      <Text>Alterar perfil</Text>
    </TouchableOpacity>
        </View>
      
      </View>

      <Footer />
    </View>
  );
};

export default TelaConfig;
