import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Perfil() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('SESI');
    const [novoNome, setNovoNome] = useState('SESI');

    const salvarAlteracoes = () => {
        Alert.alert('Alterações Salvas', `O nome foi alterado para: ${novoNome}`);
    };

    const logout = () => {
        Alert.alert('Sair', 'Você saiu da sua conta!', [{ text: 'OK' }]);
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Image
                source={require('../../assets/icone_usuario.webp')}
                style={styles.fotoPerfil}
            />
            
            <Text style={styles.nomeText}><Text style={styles.bold}>Nome de usuário:</Text> {nome}</Text>

            <TextInput
                style={styles.input}
                value={novoNome}
                onChangeText={(text) => {
                    setNovoNome(text);
                    setNome(text);
                }}
            />

            <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
                <Text style={styles.botaoText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoLogout} onPress={logout}>
                <Text style={styles.botaoTextLogout}>Sair</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    card: {
      backgroundColor: "#fff",
      borderWidth: 2,
      borderColor: "#1e90ff",
      padding: 20,
      borderRadius: 30,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fotoPerfil: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    nomeText: {
        fontSize: 18,
        marginBottom: 10,
    },
    bold: {
      fontWeight: 'bold',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
    },
    botaoSalvar: {
        backgroundColor: '#1e90ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    botaoText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botaoLogout: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    botaoTextLogout: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});