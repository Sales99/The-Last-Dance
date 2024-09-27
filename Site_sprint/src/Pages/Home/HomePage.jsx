// src/Pages/Home/HomePage.jsx

import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Conteudo_Home/Main';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Bot';
import { questionsData } from '../../assets/Dados/perguntas'; // Importa dados iniciais
import { getAuth } from 'firebase/auth';

const HomePage = () => {
  // Estado para armazenar todas as perguntas, incluindo as iniciais
  const [questions, setQuestions] = useState(questionsData);
  const auth = getAuth();

  // Função para adicionar uma nova pergunta
  const adicionarPergunta = (descricao, materia) => {
    const user = auth.currentUser;
    if (user) {
      const novaPergunta = {
        descricao,
        materia,
        nome: user.displayName || "Usuário Anônimo",
        fotoPerfil: user.photoURL || '/src/assets/images/defaultProfilePic.png', // URL da imagem de perfil
        tempo: 'Agora', // Você pode implementar uma lógica de tempo mais robusta
      };
      setQuestions((prevQuestions) => [novaPergunta, ...prevQuestions]); // Adiciona no início da lista
    } else {
      console.error("Usuário não autenticado");
    }
  };

  return (
    <div>
      <Header adicionarPergunta={adicionarPergunta} />
      <Main questions={questions} />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default HomePage;
