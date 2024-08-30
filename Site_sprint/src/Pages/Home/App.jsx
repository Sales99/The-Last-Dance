// src/App.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Conteudo_Home/Main';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Bot';

const App = () => {
  return (
    <div>
      <Header />
      <Main />
      <Chatbot/>
      <Footer/>
    </div>
  );
};

export default App;
