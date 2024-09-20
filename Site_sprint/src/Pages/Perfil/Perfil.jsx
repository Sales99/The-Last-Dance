import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Bannermelhor from '../../assets/images/Bannermelhor.png';
import Rd from '../../assets/images/rddesgracado.jpg';
import './Perfil.css';

const Perfil = () => {
  const [username, setUsername] = useState("Carregando...");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || "Nome não disponível");
      } else {
        setUsername("Nome não disponível");
      }
    });

    // Limpeza do efeito
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <Header />
      <img src={Bannermelhor} alt="Banner" className='Bannerzinho' />
      
      <div className="perfilContainer">
        <div className="leftSection">
          <img
            src={Rd}
            alt="User Profile"
            className="profileImage"
          />
          <h2 className='username'>{username}</h2> {/* Exibe o nome do usuário */}

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
