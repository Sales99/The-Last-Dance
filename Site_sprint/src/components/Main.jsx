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

      <section className="icons-section"> {/* Aqui que começaa sessão de Icons */}

        <button className="carousel-btn" onClick={scrollLeft}>{'<'}</button> {/* Seta para esquerda(move itens para esquerda) */}
        <div className="carousel" id="carousel">
          {/* _______________________ */}
          <div className="icon-item">
            <img src="/src/assets/images/matematica.png" alt="Matemática" className="icon" />
            <br />
            <span>Matemática</span>
          </div>
          {/* _______________________ */}
          <div className="icon-item">
            <img src="/src/assets/images/historia.png" alt="História" className="icon" />
            <br />
            <span>História</span>
          </div>
          {/* _______________________ */}
          <div className="icon-item">
            <img src="/src/assets/images/portugues.png" alt="Português" className="icon" />
            <br />
            <span>Português</span>
          </div>
          {/* _______________________ */}
          <div className="icon-item">
            <img src="/src/assets/images/geografia.png" alt="Geografia" className="icon" />
            <br />
            <span>Geografia</span>
          </div>
          {/* _______________________ */}
          <div className="icon-item">
            <img src="/src/assets/images/biologia.png" alt="Biologia" className="icon" />
            <br />
            <span>Biologia</span>
          </div>
          {/* _______________________ */}
          <div className="icon-item">
            <img src="/src/assets/images/quimica.png" alt="Química" className="icon" />
            <br />
            <span>Química</span>
          </div>
          {/* _______________________ */}
          <div className="icon-item">
            <img src="/src/assets/images/fisica.png" alt="Física" className="icon" />
            <br />
            <span>Física</span>
          </div>
          {/* _______________________ */}
          <div className="icon-item">
            <img src="/src/assets/images/sociologia.png" alt="Sociologia" className="icon" />
            <br />
            <span>Sociologia</span>
          </div>
          {/* _______________________ */}
        </div>

        <button className="carousel-btn" onClick={scrollRight}>{'>'}</button> {/* Seta para direita(move itens para direita) */}
      </section>
      {/* Outras seções como perguntas e rodapé */}
    </main>
  );
};

export default Main;
