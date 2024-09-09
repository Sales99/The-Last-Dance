import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Livrinho from '../../assets/images/livrinho.png';

import './Quemsomos.css';

const Quemsomos = () => {
  return (
    <div className="quemsomos-container">
      <Header />
      <main className="main-content">
        <div className="content-box">
          <div className="title">
            <img src={Livrinho} alt="livrinho" className="livrinho" />
            <h1>Quem Somos?</h1>
          </div>
          <div className="description">
            <p>
              Somos a <strong>[Nome da Empresa]</strong>, uma empresa dedicada à <strong>[área de atuação]</strong>, comprometida com a excelência e inovação em tudo o que fazemos.
            </p>
            <p>
              Com uma equipe de profissionais experientes e apaixonados, buscamos transformar desafios em oportunidades, sempre com foco em resultados sustentáveis e no desenvolvimento contínuo.
            </p>
            <p>
              Acreditamos que o sucesso vem de um atendimento personalizado, da utilização de tecnologias avançadas e da construção de relacionamentos de confiança.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quemsomos;
