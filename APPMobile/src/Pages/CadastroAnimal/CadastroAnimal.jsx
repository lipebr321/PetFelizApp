import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-web';


const CadastroAnimal = () => {

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.topo}>
                <h2>Informações do animal!</h2>
                </SafeAreaView>
        <SafeAreaView style={styles.areaTexto}>
                <TextInput
                style={styles.input}
                placeholder="Nome do animal:"
            />
            <TextInput
                style={styles.input}
                placeholder="Raça:"
            />
        </SafeAreaView>
            
            <TextInput
                style={styles.input}
                placeholder="Senha:"  
            />   
            <TextInput
                style={styles.input}
                placeholder="Endereço:"  
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLogin(text)}
                placeholder="Telefone:"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLogin(text)}
                placeholder="Bairro:"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setSenha(text)}
                placeholder="Estado:"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setSenha(text)}
                placeholder="CPF:" 
            />
            <TouchableOpacity
                style={styles.cadastrar}
            >
                <Text style={styles.textCadastrar}>Cadastrar</Text>
            </TouchableOpacity>
            <SafeAreaView style={{ alignItems: 'center' }}> 
                <Text style={{ marginTop: 20 }}>Já sou cadastrado!</Text>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        
    },
    logo: {
        width: 45,
        height: 45,
        marginBottom: 10,
        marginTop: 5,
       
    },
    topo: {
        marginBottom: 20,
    },
 
    input: {
        width: 220,
        height: 40,
        borderColor: 'gray',
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },

    cadastrar: {
        backgroundColor: '#F9C200', // Cor de fundo do botão
        padding: 10,
        borderRadius: 2,
        width: 200, // Largura do botão
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
        marginTop: 20,

    },
    textCadastrar: {
        color: 'white', // Cor do texto do botão
    },
    areaTexto:{
        textShadowColor: 'blue',
    },

});

export default CadastroAnimal;
