import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
                >
                    <Marker coordinate={location} title="Você está aqui" />
                </MapView>
            )}
            <TextInput
                style={styles.input}
                placeholder="Digite o destino"
                value={destination}
                onChangeText={setDestination}
            />
            <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                <Text style={styles.buttonText}>Traçar rota</Text>
            </TouchableOpacity>
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
    input: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 5,
    },
    button: {
  position: 'absolute',
  bottom: 50,
  left: 10,
  right: 10,
  backgroundColor: '#003f88', // Azul mais escuro
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
  elevation: 5,
},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
});
