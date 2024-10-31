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
              Somos a <strong>PrimeZone</strong>, uma empresa dedicada à <strong>área da educação</strong>, comprometida com a excelência e inovação em tudo o que fazemos.
            </p>
            <p>
            A PrimeZone é um produto recém idealizado para auxiliar o aprendizado digital e fornecer informações sobre conteúdo do ensino fundamental e ensino médio, através da implementação de tecnologias.
            </p>
            <p>
              Acreditamos que o sucesso vem de um atendimento personalizado, da utilização de tecnologias avançadas e da construção de relacionamentos de confiança.
            </p>
            <p>
              A Primezone foi o nome dado em conjunto ao projeto pelo grupo de seis colegas com a intenção de auxiliar a educação online, introduzindo um fórum para os utilizadores do produto poderem compartilhar as perguntas com outros usuários e assim responderem as perguntas uns dos outros, será implementado um ChatBot para auxiliar a comunidade com respostas de acordo com o que a biblioteca oferece, tanto no website quanto no aplicativo. As discussões do grupo decidiram a ideia do produto e outras definições do projeto como cor, nome, logo e tipo de produto.
            </p>
            <p>
            O objetivo da PrimeZone é auxiliar os estudantes com uma plataforma de estudo online, sem nenhuma pretensão de cobrar os serviços pagos no produto. Serão projetados um fórum que, será alimentado com perguntas e respostas feitas pela comunidade e, um ChatBot desenvolvido para oferecer respostas rápidas, de acordo com a capacidade do próprio, independente do horário ou da situação. Então assim, a PrimeZone tem o propósito de contribuir no sistema educacional online de Santo André. 
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
