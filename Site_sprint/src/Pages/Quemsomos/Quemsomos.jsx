import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Livrinho from '../../assets/images/livrinho.png';

import './Quemsomos.css';

const Quemsomos = () => {
  return (
    <>
  <Header />
    <div className="quemsomos-container">
      <main className="ConteudoCentro">
        <div className="content-box">
          <div className="title">
            <img src={Livrinho} alt="livrinho" className="livrinho" />
            <h1 className='h1zinho'>Quem Somos?</h1>
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
            <p>
            Somos a [Nome da Empresa], uma empresa dedicada a [área de atuação], comprometida com a excelência e inovação em tudo o que fazemos. Fundada em [ano de fundação], nossa missão é oferecer soluções de alta qualidade que atendam às necessidades de nossos clientes e parceiros. 

Com uma equipe de profissionais experientes e apaixonados, buscamos transformar desafios em oportunidades, sempre com foco em resultados sustentáveis e no desenvolvimento contínuo.

    Acreditamos que o sucesso vem de um atendimento personalizado, da utilização de tecnologias avançadas e da construção de relacionamentos de confiança. Nosso compromisso é com a transparência, a ética e a responsabilidade, garantindo que cada projeto seja conduzido com o mais alto padrão de qualidade.
            </p>
          </div>
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
};

export default Quemsomos;
