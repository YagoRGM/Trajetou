import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function Inicio({ navigation }) {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível acessar a localização.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleNavigate = () => {
    if (!destination.trim()) {
      Alert.alert('Erro', 'Informe um destino.');
      return;
    }

    if (!location) {
      Alert.alert('Erro', 'Localização atual não disponível ainda.');
      return;
    }

    navigation.navigate('Rotas', {
      origin: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      destination,
    });
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
        >
          <Marker coordinate={location} title="Você está aqui" />
        </MapView>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <Text style={styles.title}>Digite o destino</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Avenida Paulista, São Paulo"
          value={destination}
          onChangeText={setDestination}
          placeholderTextColor="#777"
        />
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Traçar rota</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#003f88',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 13,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#003f88',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});