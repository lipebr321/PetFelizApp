import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PetFeliz todos os direitos reservados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#F9C200',
      padding: 5,
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      color: 'white'
    },
  });

export default Footer;
