import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BannerPrime from '../../assets/images/bannerprime.png'
import './Ajuda.css';

const Ajuda = () => {
  const [activeSection, setActiveSection] = useState(null);

  
  

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      <Header />
          <img src={BannerPrime} alt="" className='Banner' />


      <div className="ajuda-container">

        <h1 className="ajuda-title">Central de Ajuda</h1>
        <div className="ajuda-sections">
          {[
            { title: 'Minha Conta', content: 'Conteúdo da seção Minha Conta...Aqui, você tem a oportunidade de esclarecer suas dúvidas diretamente com pessoas públicas ou através do nosso chat interativo. Nossa missão é garantir que você obtenha as informações e respostas que procura de forma rápida e eficiente. Se você tem perguntas sobre temas diversos ou precisa de orientação, nossa plataforma está preparada para atender suas necessidades. Explore nossos recursos e entre em contato com os especialistas disponíveis para uma experiência informativa e esclarecedora. Estamos aqui para ajudar!' },
            { title: 'Comunidade', content: 'Conteúdo da seção Comunidade...Aqui, você tem a oportunidade de esclarecer suas dúvidas diretamente com pessoas públicas ou através do nosso chat interativo. Nossa missão é garantir que você obtenha as informações e respostas que procura de forma rápida e eficiente. Se você tem perguntas sobre temas diversos ou precisa de orientação, nossa plataforma está preparada para atender suas necessidades. Explore nossos recursos e entre em contato com os especialistas disponíveis para uma experiência informativa e esclarecedora. Estamos aqui para ajudar!' },
            { title: 'Como Funciona', content: 'Aqui, você tem a oportunidade de esclarecer suas dúvidas diretamente...Aqui, você tem a oportunidade de esclarecer suas dúvidas diretamente com pessoas públicas ou através do nosso chat interativo. Nossa missão é garantir que você obtenha as informações e respostas que procura de forma rápida e eficiente. Se você tem perguntas sobre temas diversos ou precisa de orientação, nossa plataforma está preparada para atender suas necessidades. Explore nossos recursos e entre em contato com os especialistas disponíveis para uma experiência informativa e esclarecedora. Estamos aqui para ajudar!' },
            { title: 'Soluções', content: 'Conteúdo da seção Soluções...Aqui, você tem a oportunidade de esclarecer suas dúvidas diretamente com pessoas públicas ou através do nosso chat interativo. Nossa missão é garantir que você obtenha as informações e respostas que procura de forma rápida e eficiente. Se você tem perguntas sobre temas diversos ou precisa de orientação, nossa plataforma está preparada para atender suas necessidades. Explore nossos recursos e entre em contato com os especialistas disponíveis para uma experiência informativa e esclarecedora. Estamos aqui para ajudar!' },
          ].map(({ title, content }) => (
            <div key={title} className="ajuda-section">
              <button
                className={`ajuda-button ${activeSection === title ? 'active' : ''}`}
                onClick={() => toggleSection(title)}
              >
                {title}
              </button>
              {activeSection === title && <p className="ajuda-content">{content}</p>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>

    
  );
};





export default Ajuda;