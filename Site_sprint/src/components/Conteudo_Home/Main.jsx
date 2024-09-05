import React, { useState } from 'react';
import './Main.css';
import { questionsData } from '../../assets/Questions/perguntas'; // Importe os dados do assets.jsx

const Main = () => {
  const [selectedIconName, setSelectedIconName] = useState('Início - Melhores Perguntas');
  const [selectedIcon, setSelectedIcon] = useState(null);

  const scrollLeft = () => {
    document.getElementById('carousel').scrollLeft -= 100;
  };

  const scrollRight = () => {
    document.getElementById('carousel').scrollLeft += 100;
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

  // Renderiza as perguntas a partir dos dados do assets.jsx
  const renderQuestions = () => {
    return questionsData.map((question, index) => (
      <div key={index} className="ContainerQ">
        <div className="ParteCima">
          <div className="Esquerda">
            {question.fotoPerfil && <img src={question.fotoPerfil} className='FotoPerfil' alt="Foto de perfil" />}
            {question.nome && <h2 className='NomePerfil'>{question.nome}</h2>}
          </div>
          <div className="Direita">
            {question.tempo && <p>{question.tempo}</p>}
          </div>
        </div>
        <div className="ParteMeio">
          {question.descricao && <p>{question.descricao}</p>}
        </div>
        <div className="ParteBaixo">
          <p className='Responder'>Responder</p>
          <p className='Respostas'>Ver Respostas</p>
        </div>
      </div>
    ));
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
            <img src="/src/assets/images/matematica.png" alt="Matemática" className="icon" />
            <br />
            <span>Matemática</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'História' ? 'selected' : ''}`}
            onClick={() => handleIconClick('História')}
          >
            <img src="/src/assets/images/historia.png" alt="História" className="icon" />
            <br />
            <span>História</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Português' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Português')}
          >
            <img src="/src/assets/images/portugues.png" alt="Português" className="icon" />
            <br />
            <span>Português</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Geografia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Geografia')}
          >
            <img src="/src/assets/images/geografia.png" alt="Geografia" className="icon" />
            <br />
            <span>Geografia</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Biologia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Biologia')}
          >
            <img src="/src/assets/images/biologia.png" alt="Biologia" className="icon" />
            <br />
            <span>Biologia</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Química' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Química')}
          >
            <img src="/src/assets/images/quimica.png" alt="Química" className="icon" />
            <br />
            <span>Química</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Física' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Física')}
          >
            <img src="/src/assets/images/fisica.png" alt="Física" className="icon" />
            <br />
            <span>Física</span>
          </div>

          <div
            className={`icon-item ${selectedIcon === 'Sociologia' ? 'selected' : ''}`}
            onClick={() => handleIconClick('Sociologia')}
          >
            <img src="/src/assets/images/sociologia.png" alt="Sociologia" className="icon" />
            <br />
            <span>Sociologia</span>
          </div>
        </div>

        <button className="carousel-btn" onClick={scrollRight}>{'>'}</button>
      </section>

      <h1 className={`icon-title ${selectedIcon ? 'fade-in' : 'fade-out'}`}>{selectedIconName}</h1>

      {/* Exibe as perguntas se houver dados disponíveis */}
      {questionsData.length > 0 ? renderQuestions() : <p>Nenhuma pergunta disponível</p>}
    </main>
  );
};

export default Main;
