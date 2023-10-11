import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MenuUsuario = ({ navigation }) => {
  
  const userImage = require('/src/Components/images/usuario.png');
  const userName = 'Nome do Usuário';

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image source={userImage} style={styles.userImage} />
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PerfilUsuario');
        }}
      >
        <Text style={styles.menuItem}>Meu perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PetsUsuario');
        }}
      >
        <Text style={styles.menuItem}>Meus Pets</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TelaPrincipal');
        }}
      >
        <Text style={styles.menuItem}>Adotar Pets</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SobreNos');
        }}
      >
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('CadastroAnimal');
        }}
      >
        <Text style={styles.menuItem}>Doar Pet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SobreNos');
        }}
      ></TouchableOpacity>
        <Text style={styles.menuItem}>Sobre Nós</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FAQ');
        }}
      >
        <Text style={styles.menuItem}>Dúvidas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TelaConfig');
        }}
      >
        <Text style={styles.menuItem}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // Lógica para sair da conta
          // Por exemplo, deslogar o usuário
        }}
      >
        <Text style={styles.menuItem}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
  },
  menuItem: {
    fontSize: 18,
    padding: 10,
  },
});

export default MenuUsuario;

