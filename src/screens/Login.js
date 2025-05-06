import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Erro, preencha todos os campos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Usuário logado:", userData);
      }

      alert(`Bem-vindo, ${user.displayName || "usuário"}!`);
      navigation.navigate("Inicio");
    } catch (error) {
      console.error("Erro no login:", error.message);
      alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Image
        source={require('../../assets/trajetou_logo.png')}
        style={{ width: 200, height: 200 }}
      />

      <Text style={styles.title}>Fazer login</Text>

      <View style={styles.div_inputs}>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Digite seu email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.link}>Criar uma conta</Text>
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
