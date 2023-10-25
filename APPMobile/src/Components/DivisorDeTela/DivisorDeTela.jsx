import React from "react";
import { View, StyleSheet } from "react-native";

const Linha = () => {
  return (
    <View style={styles.container}>
      <View style={styles.linha}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  linha: {
    backgroundColor: "#F9C200",
    alignItems: "center",
    width: 330,
    height: 1,
    marginBottom: 2,
  },
});

export default Linha;
