const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    imgContainer: {
      alignItems:'center',
    },
    img: {
      width: 200,
      height: 200,
      marginBottom: 50,
      marginTop: 70,
    },
    formContainer: {
      flex: 2,
      alignItems: 'center',
    },
    input: {
      width: 370,
      height: 90,
      marginBottom: 5,
      borderRadius: 60,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#F9C200',
      shadowColor: 'black',
      shadowOpacity: 0.4, 
      shadowRadius: 2,
      elevation: 4, 
      fontSize: 20,
      fontWeight: "bold",
  },
    button: {
      backgroundColor: '#F9C200',
      borderRadius: 60,
      width: 300,
      height: 70,
      alignItems: 'center',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
      marginTop: 30,
      paddingVertical: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
    link: {
      fontSize: 20,
      marginTop: 20,
    },
    errorMessage: {
      color: 'red',
      marginBottom: 10,
    },
    errorText: {
      color: 'red',
    },
  };
  export default styles;