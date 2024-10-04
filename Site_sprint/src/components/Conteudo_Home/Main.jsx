// src/components/Conteudo_Home/Main.jsx
import React, { useState, useEffect } from 'react';
import './Main.css';
import PlayFoto from '../../assets/images/PlayStore.png';
import biologia from "/src/assets/images/biologia.png";
import fisica from "/src/assets/images/fisica.png";
import geografia from "/src/assets/images/geografia.png";
import historia from "/src/assets/images/historia.png";
import matematica from "/src/assets/images/matematica.png";
import portugues from "/src/assets/images/portugues.png";
import quimica from "/src/assets/images/quimica.png";
import sociologia from "/src/assets/images/sociologia.png";
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore'; // Importa Firestore

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedIconName, setSelectedIconName] = useState('Início - Melhores Perguntas');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  
  // Estados para responder perguntas
  const [respondendoId, setRespondendoId] = useState(null); // ID da pergunta que está sendo respondida
  const [resposta, setResposta] = useState(''); // Resposta atual do usuário
  const [respostas, setRespostas] = useState({}); // Respostas armazenadas

  const db = getFirestore(); // Inicializa Firestore

  useEffect(() => {
    // Carregar respostas do localStorage ao montar o componente
    const respostasSalvas = JSON.parse(localStorage.getItem('respostas')) || {};
    setRespostas(respostasSalvas);
  }, []);

  useEffect(() => {
    // Cria uma consulta para obter as perguntas do Firestore
    const q = query(collection(db, "perguntas"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const perguntasArray = [];
      querySnapshot.forEach((doc) => {
        perguntasArray.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(perguntasArray); // Atualiza o estado com as perguntas do Firestore
    });

    return () => unsubscribe(); // Limpa o snapshot listener ao desmontar o componente
  }, [db]);

  const scrollLeft = () => {
    document.getElementById('carousel').scrollLeft -= 110;
  };

  const scrollRight = () => {
    document.getElementById('carousel').scrollLeft += 110;
  };

  const handleIconClick = (iconName) => {
    if (selectedIcon === iconName) {
      setSelectedIcon(null);
      setSelectedIconName('Início - Melhores Perguntas');
    } else {
      setSelectedIcon(iconName);
      setSelectedIconName(capitalizeFirstLetter(iconName));
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleExpand = (index) => {
    setExpandedQuestions((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Alterna entre expandido e contraído
    }));
  };

  // Função para renderizar as perguntas com base na matéria selecionada
  const renderQuestions = () => {
    const filteredQuestions = selectedIcon
      ? questions.filter((question) => question.materia.toLowerCase() === selectedIcon.toLowerCase())
      : questions;

    return filteredQuestions.length > 0 ? (
      filteredQuestions.map((question, index) => {
        const isExpanded = expandedQuestions[index];
        const shouldShowExpandButton = question.pergunta.length > 300; // Exibe o botão "Ler mais" se a pergunta for longa
        const displayText = isExpanded 
          ? question.pergunta 
          : question.pergunta.length > 300 
            ? `${question.pergunta.substring(0, 300)}...` 
            : question.pergunta;

        return (
          <div key={index} className="ContainerQ">
            <div className="ParteCima">
              <div className="Esquerda">
                {question.fotoPerfil && <img src={question.fotoPerfil} className="FotoPerfil" alt="" />}
                {question.nome && <h2 className="NomePerfil">{question.nome}</h2>}
              </div>
              <div className="Direita">
                {question.tempo && <p>{question.tempo}</p>}
              </div>
            </div>
            <div className="ParteMeio">
              <p>{displayText}</p>
              {shouldShowExpandButton && (
                <button className="expand-button" onClick={() => toggleExpand(index)}>
                  {isExpanded ? 'Ler menos' : 'Ler mais'}
                </button>
              )}
            </div>

            {/* Adição dos elementos "Responder" e "Ver Respostas" como <p> */}
            <div className="ParteBaixo">
              <p className="Responder" onClick={() => handleResponder(question.id)}>
                Responder
              </p>
              <p className="Respostas" onClick={() => handleVerRespostas(question.id)}>
                Ver Respostas
              </p>
            </div>

            {/* Se esta pergunta está sendo respondida, exibir o input de resposta */}
            {respondendoId === question.id && (
              <div className="RespostaContainer">
                <input
                  type="text"
                  value={resposta}
                  onChange={(e) => setResposta(e.target.value)}
                  placeholder="Digite sua resposta"
                  className="RespostaInput"
                />
                <button onClick={() => enviarResposta(question.id)} className="EnviarButton">
                  Enviar
                </button>
                <button onClick={() => setRespondendoId(null)} className="CancelarButton">
                  Cancelar
                </button>
              </div>
            )}

            {/* Se "Ver Respostas" foi clicado para esta pergunta, exibir as respostas */}
            {verRespostasId === question.id && (
              <div className="RespostasContainer">
                {respostas[question.id] && respostas[question.id].length > 0 ? (
                  respostas[question.id].map((resp, idx) => (
                    <div key={idx} className="RespostaItem">
                      <p>{resp}</p>
                    </div>
                  ))
                ) : (
                  <p>Sem respostas ainda.</p>
                )}
              </div>
            )}
          </div>
        );
      })
    ) : (
      <p>Nenhuma pergunta disponível</p>
    );
  };

  // Estados para gerenciar a exibição das respostas
  const [verRespostasId, setVerRespostasId] = useState(null); // ID da pergunta cujas respostas estão sendo visualizadas

  // Funções de manipulação para os elementos "Responder" e "Ver Respostas"
  const handleResponder = (questionId) => {
    setRespondendoId(questionId);
    setVerRespostasId(null); // Esconde as respostas se estiverem visíveis
  };

  const handleVerRespostas = (questionId) => {
    if (verRespostasId === questionId) {
      setVerRespostasId(null); // Toggle para esconder
    } else {
      setVerRespostasId(questionId);
      setRespondendoId(null); // Esconde o input de resposta se estiver visível
    }
  };

  const enviarResposta = (questionId) => {
    if (resposta.trim() === '') {
      alert('Por favor, digite uma resposta.');
      return;
    }

    // Adicionar a resposta ao estado
    setRespostas((prevRespostas) => {
      const novasRespostas = { ...prevRespostas };
      if (!novasRespostas[questionId]) {
        novasRespostas[questionId] = [];
      }
      novasRespostas[questionId].push(resposta.trim());
      // Salvar no localStorage
      localStorage.setItem('respostas', JSON.stringify(novasRespostas));
      return novasRespostas;
    });

    // Limpar o input e fechar o campo de resposta
    setResposta('');
    setRespondendoId(null);
    setVerRespostasId(questionId); // Opcional: abrir as respostas após enviar
  };

  return (
    <main className="main-content">
      <section className="icons-section">
        <button className="carousel-btn" onClick={scrollLeft}>{'<'}</button>
        <div className="carousel" id="carousel">
          {/* Ícones das matérias */}
          <div
            className={`icon-item ${selectedIcon === 'matematica' ? 'selected' : ''}`}
            onClick={() => handleIconClick('matematica')}
          >
            <img src={matematica} alt="Matemática" className="icon" />
            <br />
            <span>Matemática</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'historia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('historia')}
          >
            <img src={historia} alt="História" className="icon" />
            <br />
            <span>História</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'portugues' ? 'selected' : ''}`}
            onClick={() => handleIconClick('portugues')}
          >
            <img src={portugues} alt="Português" className="icon" />
            <br />
            <span>Português</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'geografia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('geografia')}
          >
            <img src={geografia} alt="Geografia" className="icon" />
            <br />
            <span>Geografia</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'biologia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('biologia')}
          >
            <img src={biologia} alt="Biologia" className="icon" />
            <br />
            <span>Biologia</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'quimica' ? 'selected' : ''}`}
            onClick={() => handleIconClick('quimica')}
          >
            <img src={quimica} alt="Química" className="icon" />
            <br />
            <span>Química</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'fisica' ? 'selected' : ''}`}
            onClick={() => handleIconClick('fisica')}
          >
            <img src={fisica} alt="Física" className="icon" />
            <br />
            <span>Física</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'sociologia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('sociologia')}
          >
            <img src={sociologia} alt="Sociologia" className="icon" />
            <br />
            <span>Sociologia</span>
          </div>
        </div>
        <button className="carousel-btn" onClick={scrollRight}>{'>'}</button>
      </section>

      <section className="questions-section">
        <h1>{selectedIconName}</h1>
        <div className="questions-container">{renderQuestions()}</div>
      </section>
    </main>
  );
};

export default Main;
