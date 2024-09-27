import React, { createContext, useState } from 'react';
import { questionsData } from '../../src/assets/Dados/perguntas';

export const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState(questionsData);

  const adicionarPergunta = (pergunta, materia) => {
    const newQuestion = {
      fotoPerfil: 'defaultProfilePic.png', // Adicione o caminho da imagem padrão
      nome: 'Usuário Anônimo',
      tempo: 'Agora',
      descricao: pergunta,
      materia,
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  return (
    <QuestionsContext.Provider value={{ questions, adicionarPergunta }}>
      {children}
    </QuestionsContext.Provider>
  );
};
