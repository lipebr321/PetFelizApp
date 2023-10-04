import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const TelaPrincipal = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo à Tela Principal</Text>
      <Button title="Logout" onPress={() => navigation.navigate('TelaDeLogin')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TelaPrincipal;
