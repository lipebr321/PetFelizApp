import React from 'react';
import { View, StyleSheet } from 'react-native';
//import AnimalCard from './src/Components/AnimalCard/AnimalCard';


const TelaPrincipal = () => {
  return (
    <View style={styles.container}>
      <Text>tela principal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TelaPrincipal;
