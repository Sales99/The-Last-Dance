// src/Rotas.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as páginas
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/Login'
// import CadastroPage from './pages/Cadastro/'


const Stack = createStackNavigator();

const Rotas = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
