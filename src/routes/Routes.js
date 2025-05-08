import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Inicio from '../screens/Inicio';
import Perfil from '../screens/Perfil';
import Rotas from '../screens/Rotas';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#1e90ff',
                },
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#1e90ff',
                    borderTopWidth: 0,
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom,
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Rotas':
                            iconName = focused ? 'map' : 'map-outline';
                            break;
                        case 'Inicio':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Perfil':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'alert-circle';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
                tabBarStyle: {
                    backgroundColor: '#1e90ff',
                    borderTopWidth: 0,
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 4,
                },
            })}
        >
            <Tab.Screen name="Inicio" component={Inicio} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
}


export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
            <Stack.Screen name="Inicio" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Rotas" component={Rotas}
                options={{
                    title: 'Rotas',
                    headerStyle: { backgroundColor: '#1e90ff' },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
}
