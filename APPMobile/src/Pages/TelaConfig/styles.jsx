const styles = {
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 20,
    },
  
    balaoAmarelo: {
      backgroundColor: "#F9C200",
      padding: 10,
      alignItems: "center",
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
      width: '100%',
      height: 70,
      marginBottom: 20,
      borderRadius: 60,
    },
    titulo: {
      fontSize: 24,
      color: 'white'
    },
  
    menuContainer: {
      marginBottom: 50,
      marginTop: 30,
    },
  
    menuItem: {
      fontSize: 16,
      marginBottom: 20,
      color: "#F9C200",
      fontWeight: "bold",
      marginTop: 10,
    },

    infoUsuario: {
      fontSize: 16,
    },

    containerButtons:{
      flexDirection: 'row',
      paddingRight: 15,
      marginBottom: 20,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'space-between', 
    },

    Button: {
      backgroundColor: "#F9C200",
      borderRadius: 10,
      width: 90,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      marginLeft: 5,
      marginTop: 20,
    },
    ButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },

  };

  export default styles;