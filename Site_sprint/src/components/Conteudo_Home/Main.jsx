import React, { useState } from 'react';
import './Main.css';

const Main = () => {
  const [selectedIconName, setSelectedIconName] = useState('Início'); // Estado inicial "Início"
  const [selectedIcon, setSelectedIcon] = useState(null);

  const scrollLeft = () => {
    document.getElementById('carousel').scrollLeft -= 100;
  };

  const scrollRight = () => {
    document.getElementById('carousel').scrollLeft += 100;
  };

  const handleIconClick = (iconName) => {
    if (selectedIcon === iconName) {
      // Se o ícone já estiver selecionado, desmarca e define o título como "Início"
      setSelectedIcon(null);
      setSelectedIconName('Início');
    } else {
      // Se o ícone não estiver selecionado, o seleciona e atualiza o título
      setSelectedIcon(iconName);
      setSelectedIconName(iconName);
    }
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

      {/* Título exibido abaixo do carrossel */}
      <h1 className={`icon-title ${selectedIcon ? 'fade-in' : 'fade-out'}`}>{selectedIconName}</h1>
    </main>
  );
};

export default Main;
