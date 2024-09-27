// src/context/QuestionsContext.jsx
import React, { createContext, useState } from 'react';
import { questionsData } from '../assets/Dados/perguntas'; // Certifique-se de que o caminho está correto

export const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState(questionsData);

  const adicionarPergunta = (descricao, materia, nome, fotoPerfil) => {
    const novaPergunta = {
      descricao,
      materia,
      nome,
      fotoPerfil,
      tempo: '0 segundos atrás', // Tempo inicial
    };
    setQuestions([novaPergunta, ...questions]);
  };

  return (
    <QuestionsContext.Provider value={{ questions, adicionarPergunta }}>
      {children}
    </QuestionsContext.Provider>
  );
};
