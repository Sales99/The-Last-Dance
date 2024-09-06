import React from 'react';
import Header from '../../components/Header/Header'; // Verifique os caminhos
import Main from '../../components/Conteudo_Home/Main';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Bot';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Main />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default HomePage;
