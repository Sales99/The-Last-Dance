import React, { useState } from 'react';
import './Main.css';
import { questionsData } from '../../assets/Dados/perguntas'; // Importe os dados do assets.jsx
import PlayFoto from '../../assets/images/PlayStore.png';
import biologia from "/src/assets/images/biologia.png"
import fisica from "/src/assets/images/fisica.png"
import geografia from "/src/assets/images/geografia.png"
import historia from "/src/assets/images/historia.png"
import matematica from "/src/assets/images/matematica.png"
import portugues from "/src/assets/images/portugues.png"
import quimica from "/src/assets/images/quimica.png"
import sociologia from "/src/assets/images/sociologia.png"

const Main = () => {
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
      setSelectedIconName(iconName);
    }
  };

  const toggleExpand = (index) => {
    setExpandedQuestions((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Alterna entre expandido e contraído
    }));
  };

  // Renderiza as perguntas com base no ícone selecionado
  const renderQuestions = () => {
    const filteredQuestions = selectedIcon
      ? questionsData.filter((question) => question.materia === selectedIcon)
      : questionsData;

    return filteredQuestions.length > 0 ? (
      filteredQuestions.map((question, index) => {
        const isExpanded = expandedQuestions[index];
        const shouldShowExpandButton = question.descricao.length > 300; // Exibe o botão "Ler mais" se a pergunta for grande
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
      <p>Nenhuma pergunta disponível para {selectedIcon}</p>
    );
  };

  return (
    <main className="main-content">
      <section className="icons-section">
        <button className="carousel-btn" onClick={scrollLeft}>{'<'}</button>
        <div className="carousel" id="carousel">
          <div
            className={`icon-item ${selectedIcon === 'Matemática' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Matemática')}
          >
            <img src={matematica} alt="Matemática" className="icon" />
            <br />
            <span>Matemática</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'História' ? 'selected' : ''}`}
            onClick={() => handleIconClick('História')}
          >
            <img src={historia} alt="História" className="icon" />
            <br />
            <span>História</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Português' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Português')}
          >
            <img src={portugues} alt="Português" className="icon" />
            <br />
            <span>Português</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Geografia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Geografia')}
          >
            <img src={geografia} alt="Geografia" className="icon" />
            <br />
            <span>Geografia</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Biologia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Biologia')}
          >
            <img src={biologia} alt="Biologia" className="icon" />
            <br />
            <span>Biologia</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Química' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Química')}
          >
            <img src={quimica} className="icon" />
            <br />
            <span>Química</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Física' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Física')}
          >
            <img src={fisica} alt="Física" className="icon" />
            <br />
            <span>Física</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Sociologia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Sociologia')}
          >
            <img src={sociologia} className="icon" />
            <br />
            <span>Sociologia</span>
          </div>
        </div>
        <button className="carousel-btn" onClick={scrollRight}>{'>'}</button>
      </section>

      <h1 className={`icon-title ${selectedIcon ? 'fade-in' : 'fade-out'}`}>{selectedIconName}</h1>

      {/* Exibe as perguntas se houver dados disponíveis */}
      {renderQuestions()}

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
