import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const PerfilUsuario = () => {


  return (
    <View style={styles.container}>
      <Text>Perfil Usuario</Text>
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

export default PerfilUsuario;
