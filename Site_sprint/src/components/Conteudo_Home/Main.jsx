// src/components/Conteudo_Home/Main.jsx
import React, { useState } from 'react';
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

const Main = ({ questions }) => {
  const [selectedIconName, setSelectedIconName] = useState('Início - Melhores Perguntas');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});

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
        const shouldShowExpandButton = question.descricao.length > 300; // Exibe o botão "Ler mais" se a descrição for longa
        const displayText = isExpanded ? question.descricao : `${question.descricao.substring(0, 300)}...`;

        return (
          <div key={index} className="ContainerQ">
            <div className="ParteCima">
              <div className="Esquerda">
                {question.fotoPerfil && <img src={question.fotoPerfil} className="FotoPerfil" alt="Foto de perfil" />}
                {question.nome && <h2 className="NomePerfil">{question.nome}</h2>}
              </div>
              <div className="Direita">
                {question.tempo && <p>{question.tempo}</p>}
              </div>
            </div>
            <div className="ParteMeio">
              <p>{displayText}</p>
              {shouldShowExpandButton && (
                <button className="lerMais" onClick={() => toggleExpand(index)}>
                  {isExpanded ? 'Ler menos' : 'Ler mais'}
                </button>
              )}
            </div>
            <div className="ParteBaixo">
              <p className="Responder">Responder</p>
              <p className="Respostas">Ver Respostas</p>
            </div>
          </div>
        );
      })
    ) : (
      <p className='NoQuestion'>Nenhuma pergunta disponível para {selectedIconName}</p>
    );
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
        <div className="questions-container">
          {renderQuestions()}
        </div>
      </section>

      <hr />
      <h1 className="PlayTitulo">
        Curta todas às novidades em nosso aplicativo Mobile!
        <br /> Baixe agora e teste as novidades!
      </h1>
      <img src={PlayFoto} alt="" className="PlayFoto" />
    </main>
  );
};

export default Main;
