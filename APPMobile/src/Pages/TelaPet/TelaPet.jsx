import React from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';

 

const TelaPet = ({ route }) => {

  const { pet } = route.params;

 

  return (

    <View style={styles.container}>

      <View style={styles.imgcontainer}>

      <Image source={{ uri: pet.foto_Pet }} style={styles.image} />

      </View>

      <View styles= {styles.infoPet}>

      <Text style={styles.name}>{pet.nome_Pet}</Text>

      <Text style={styles.age}>{pet.idade_Pet}</Text>

      </View>

      <View style={styles.descricaoPet}>

        <Text styles={styles.tituloDescricao}>Sobre o Pet:</Text>

      <Text style={styles.description}>{pet.descricao_Pet}</Text>

      </View>

     

    </View>

  );

};

 

const styles = StyleSheet.create({

  container: {

    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

  },

  image: {

    width: 350,

    height: 350,

  },

  name: {

    fontSize: 24,

    fontWeight: 'bold',

    color: 'Purple',

  },

  description: {

    fontSize: 16,

    margin: 10,

    textAlign: 'left',

    marginLeft:15,

  },

  age: {

    fontSize: 16,

  },

  descricaoPet: {

      alignItems: 'center',

      width: 350,

      height: 350,

      borderWidth: 2,

      borderRadius: 10,

      borderColor:'black'

  },

  tituloDescricao:{

    textAlign: 'left',

    marginLeft:15,

    marginBottom:10,

  }

 

});

 

export default TelaPet;

 