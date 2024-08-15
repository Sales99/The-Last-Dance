// src/components/Main.jsx
import React from 'react';
import './Main.css';

const Main = () => {
  return (
    <main className="main-content">
      <section className="icons-section">
        <img src="/assets/icons/matematica.png" alt="Matemática" className="icon" />
        <img src="/assets/icons/historia.png" alt="História" className="icon" />
        <img src="/assets/icons/portuguese-icon.png" alt="Português" className="icon" />
        <img src="/assets/icons/questions-icon.png" alt="Perguntas" className="icon" />
        <img src="/assets/icons/biology-icon.png" alt="Biologia" className="icon" />
        <img src="/assets/icons/chemistry-icon.png" alt="Química" className="icon" />
        <img src="/assets/icons/physics-icon.png" alt="Física" className="icon" />
        <img src="/assets/icons/sociology-icon.png" alt="Sociologia" className="icon" />
      </section>
      <br /><br /><br /><br />


      <section className="questions-section">
        <h2>NOSSAS PERGUNTAS MAIS FAMOSAS</h2>
        {/* Aqui você pode adicionar as perguntas, como na imagem */}
        <div className="question-card">
          <div className="user-info">NEYMAR <span className="verified">✔</span></div>
          <p>Cade minha bola de ouro?</p>
          <button className="answer-button">10 respostas</button>
        </div>

        <div className="question-card">
          <div className="user-info">São Paulo <span className="verified">✔</span></div>
          <p>Palmeiras tem Mundial?</p>
          <button className="answer-button">20 respostas</button>
        </div>

        <div className="question-card">
          <div className="user-info">Lionel Messi <span className="verified">✔</span></div>
          <p>Quantas copas do mundo o CR7 tem?</p>
          <button className="answer-button">5 respostas</button>
        </div>
      </section>

      <section className="help-section">
        <h2>AQUI NÓS PODEMOS TE AJUDAR COM AS SUAS MAIORES DÚVIDAS COM NOSSA IA</h2>
        <button className="ask-question-button">FAÇA SUA PERGUNTA</button>
      </section>

      <footer className="footer">
        <div className="footer-section">
          <a href="#login">Login</a>
          <a href="#register">Cadastro</a>
          <a href="#help-center">Central de ajuda</a>
          <a href="#about-us">Quem somos</a>
        </div>
        <div className="social-media">
          <a href="#facebook"><img src="/assets/icons/facebook-icon.png" alt="Facebook" /></a>
          <a href="#twitter"><img src="/assets/icons/twitter-icon.png" alt="Twitter" /></a>
          <a href="#instagram"><img src="/assets/icons/instagram-icon.png" alt="Instagram" /></a>
          <a href="#whatsapp"><img src="/assets/icons/whatsapp-icon.png" alt="WhatsApp" /></a>
        </div>
      </footer>
    </main>
  );
};

export default Main;
