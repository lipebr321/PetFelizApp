import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MenuUsuario = ({ navigation }) => {
  
  const userImage = require('/src/Components/images/gatinho.png');
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
        <View style={styles.menuItemContainer}>
          <Image source={require('/src/Components/images/pata.png')} style={styles.menuIcon} />
          <Text style={styles.menuItem}>Meu perfil</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PetsUsuario');
        }}
      >
          <View style={styles.menuItemContainer}>
          <Image source={require('/src/Components/images/cachorro.png')} style={styles.menuIcon} />
          <Text style={styles.menuItem}>Meus pets</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TelaPrincipal');
        }}
      >
          <View style={styles.menuItemContainer}>
          <Image source={require('/src/Components/images/gato.png')} style={styles.menuIcon} />
          <Text style={styles.menuItem}>Adotar Pet</Text>
        </View>
      </TouchableOpacity>

        <TouchableOpacity
        onPress={() => {
          navigation.navigate('CadastroAnimal');
        }}
      >
          <View style={styles.menuItemContainer}>
          <Image source={require('/src/Components/images/ossinho.png')} style={styles.menuIcon} />
          <Text style={styles.menuItem}>Cadastrar pet</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SobreNos');
        }}
      >
          <View style={styles.menuItemContainer}>
          <Image source={require('/src/Components/images/sobre.png')} style={styles.menuIcon} />
          <Text style={styles.menuItem}>Sobre nós</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FAQ');
        }}
      >
          <View style={styles.menuItemContainer}>
          <Image source={require('/src/Components/images/ajuda.png')} style={styles.menuIcon} />
          <Text style={styles.menuItem}>Duvidas?</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TelaConfig');
        }}
      >
          <View style={styles.menuItemContainer}>
          <Image source={require('/src/Components/images/config.png')} style={styles.menuIcon} />
          <Text style={styles.menuItem}>Configurações</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // Lógica para sair da conta
          // Por exemplo, deslogar o usuário
        }}
      >
        <View style={styles.menuItemContainer}>
          <Image source={require('/src/Components/images/sair.png')} style={styles.menuIcon} />
          <Text style={styles.menuItem}>Sair</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    backgroundColor: '#F9C200',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    color:'white'
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    // Você pode definir cores específicas para cada ícone aqui
  },
  menuItem: {
    fontSize: 18,
    padding: 10,
    color: 'white', // Cor do texto
    // Outras estilizações de texto
  },
});

export default MenuUsuario;
