import React from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';



const TelaDeCadastro = () => {

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
            <Text style={styles.topo}>
                Faça seu cadastro!
                </Text>
            <TextInput
                style={styles.input}
                placeholder="Nome:"
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail:"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha:" 
                secureTextEntry={true} 
            />   
               <TextInput
                style={styles.input}
                placeholder="Confirme sua senha:" 
                secureTextEntry={true} 
            />   
            <TextInput
                style={styles.input}
                placeholder="Endereço:"  
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone:"
            />
            <TextInput
                style={styles.input}
                placeholder="Bairro:"
            />
            <TextInput
                style={styles.input}
                placeholder="Estado:"
            />
            <TextInput
                style={styles.input}
                placeholder="CPF:" 
            />
            <TouchableOpacity
                style={styles.cadastrar}
            >
                <Text style={styles.textCadastrar}>Cadastrar</Text>
            </TouchableOpacity>
            <SafeAreaView style={{ alignItems: 'center' }}> 
                <Text style={{ fontSize: 20, marginTop: 30 }}>Já sou cadastrado!</Text>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        padding: 16,
    },
    topo: {
        marginBottom: 20,
        marginTop: 20,
        fontSize: 30,
        alignItems: 'center',
        fontWeight: 'bold'
    },
 
    input: {
        width: 350,
        height: 70,
        borderColor: 'gray',
        marginBottom: 20,
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20,
    },

    cadastrar: {
        backgroundColor: '#F9C200', // Cor de fundo do botão
        borderRadius: 10,
        width: 300, // Largura do botão
        height:70,
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
        marginTop: 70,
        paddingVertical: 10,

    },
    textCadastrar: {
        color: 'white', // Cor do texto do botão
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default TelaDeCadastro;
