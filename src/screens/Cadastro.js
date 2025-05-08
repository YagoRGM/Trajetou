import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/FireBaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function Cadastro({ navigation }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCadastro = async () => {
        if (!email || !senha || !confirmarSenha || !nome) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Erro", "Digite um email válido.");
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: nome,
            });

            await setDoc(doc(db, "users", user.uid), {
                nome: nome,
                email: email,
                photoURL: "",
                uid: user.uid,
            });

            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
            navigation.navigate("Login");
        } catch (error) {
            console.error("Erro ao cadastrar:", error.message);
            Alert.alert("Erro", "Não foi possível realizar o cadastro. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={require('../../assets/trajetou_logo.png')}
                    style={{ width: 200, height: 200 }}
                />
                
            <Text style={styles.title}>Cadastro</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
                <Text style={styles.link}>Inicio</Text>
            </TouchableOpacity>

            <View style={styles.div_inputs}>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                placeholder="Digite seu nome"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                placeholder="Digite seu email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                placeholder="Digite sua senha"
                style={styles.input}
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
                placeholder="Confirme sua senha"
                style={styles.input}
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
            />

            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#1e90ff" style={{ marginTop: 20 }} />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Já tenho uma conta</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1e90ff",
        justifyContent: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      div_inputs: {
        justifyContent: 'flex-start',
        width: '100%',
      },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#1967D2",
        borderRadius: 8,
        padding: 12,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    link: {
        marginTop: 20,
        color: "#1e90ff",
        textAlign: "center",
        textDecorationLine: "underline",
    },
});