import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Bannermelhor from '../../assets/images/Bannermelhor.png'
import Rd from '../../assets/images/rddesgracado.jpg'

import './Perfil.css';

const Perfil = () => {
  return (
    <>
      <Header />

      <img src={Bannermelhor} alt="Banner" className='Bannerzinho' />
      
      <div className="perfilContainer">
        <div className="leftSection">
          <img
            src={Rd} // Coloque o caminho da imagem de perfil aqui
            alt="User Profile"
            className="profileImage"
          />
          <h2>RD maluco</h2>

          <div className="stats">
            <span>Respostas</span>
            <span>Perguntas</span>
            <span>Elogios</span>
          </div>

          <div className="points">
            <button className="pointsButton">Pontos: 0</button>
          </div>
        </div>

        <div className="rightSection">
          <h3>Você ainda não tem Respostas</h3>
          <p>(responda perguntas para acumular pontos)</p>
        </div>

        <div className="aboutSection">
          <h3>Sobre</h3>
          <p><strong>Escolaridade:</strong> Ensino Médio (completo)</p>
          <p><strong>Começou em:</strong> 29 de agosto de 2024</p>
        </div>
      </div>




      <Footer />
    </>
  );
};

export default Perfil;
