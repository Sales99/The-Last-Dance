// src/components/Main.jsx
import React from 'react';
import './Main.css';

const Main = () => {
  const scrollLeft = () => {
    document.getElementById('carousel').scrollLeft -= 100;
  };

  const scrollRight = () => {
    document.getElementById('carousel').scrollLeft += 100;
  };

  return (
    <main className="main-content">
      <section className="icons-section">
        <button className="carousel-btn" onClick={scrollLeft}>{'<'}</button>
        <div className="carousel" id="carousel">
          <div className="icon-item">
            <img src="/src/assets/images/matematica.png" alt="Matemática" className="icon" />
            <br />
            <span>matemática</span>
          </div>
          <div className="icon-item">
            <img src="/src/assets/images/historia.png" alt="História" className="icon" />
            <br />
            <span>história</span>
          </div>
          <div className="icon-item">
            <img src="/src/assets/images/portugues.png" alt="Português" className="icon" />
            <br />
            <span>português</span>
          </div>
          <div className="icon-item">
            <img src="/src/assets/images/geografia.png" alt="Geografia" className="icon" />
            <br />
            <span>geografia</span>
          </div>
          <div className="icon-item">
            <img src="/src/assets/images/biologia.png" alt="Biologia" className="icon" />
            <br />
            <span>biologia</span>
          </div>
          <div className="icon-item">
            <img src="/src/assets/images/quimica.png" alt="Química" className="icon" />
            <br />
            <span>química</span>
          </div>
          <div className="icon-item">
            <img src="/src/assets/images/fisica.png" alt="Física" className="icon" />
            <br />
            <span>física</span>
          </div>
          <div className="icon-item">
            <img src="/src/assets/images/sociologia.png" alt="Sociologia" className="icon" />
            <br />
            <span>sociologia</span>
          </div>
        </div>
        <button className="carousel-btn" onClick={scrollRight}>{'>'}</button>
      </section>
      {/* Outras seções como perguntas e rodapé */}
    </main>
  );
};

export default Main;
