// src/components/Header.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { useFonts } from 'expo-font'; // Hook para carregar fontes

const Header = () => {
  const [fontsLoaded] = useFonts({
    'Jomhuria-Regular': require('../../assets/fonts/Jomhuria-Regular.ttf'), // Caminho para a fonte
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>; // Exibe uma mensagem enquanto as fontes estão sendo carregadas
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>PERGUNTAS E MATÉRIAS</Text>
      <TextInput
        style={styles.input}
        placeholder='Qual sua matéria favorita?'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    padding: 20,
    backgroundColor: '#6200ee',
    alignItems: 'flex-start',
    paddingLeft: 15,
    zIndex: 1,
    gap: 12,
  },

  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'Jomhuria-Regular', // Aplica a fonte Jomhuria
  },

  input: {
    height: 40,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 6,
    width: '90%',
    borderRadius: 6,
  }
});

export default Header;
