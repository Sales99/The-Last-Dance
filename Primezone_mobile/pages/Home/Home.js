// src/Pages/Home/Home.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Conteúdo da Home Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default Home;
