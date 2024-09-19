import React, { useState } from 'react';
import './Header.css';
import IconHeader from '../../assets/Icons/IconHeader';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showBox, setShowBox] = useState(false);

  const handleClick = () => {
    setShowBox(true);
  };

  const handleClose = () => {
    setShowBox(false);
  };

  return (
    <header className="header">
      <Link to="/"> 
        <img src="/src/assets/images/logo.png" alt="Logo" className="logo" />
      </Link>
      
      <input type="text" placeholder="Procurar..." className="search-bar" />
      <h3 className="QuestionMaker" onClick={handleClick}>FAÇA SUA PERGUNTA</h3>
      <Link to="/perfil">
        <IconHeader />
      </Link>

      {showBox && (
        <div className="overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={handleClose}>&times;</button>
            <h1 className='QuestionMaker-Tittle'>DIGITE SUA PERGUNTA PARA QUE OUTROS POSSAM RESPONDER</h1>

            <textarea type="text"
            placeholder='Digite sua pergunta aqui'
            className='question-input'/> <br /> 

            <div className="linha-enviar-popup">
            <select className='seletor-materia' id="">
              <option value="">Selecione uma matéria</option>
              <option value="matematica">Matemática</option>
              <option value="historia">História</option>
              <option value="portugues">Português</option>
              <option value="geografia">Geografia</option>
              <option value="biologia">Biologia</option>
              <option value="quimica">Química</option>
              <option value="fisica">Física</option>
              <option value="sociologia">Sociologia</option>
            </select>
            <button className='enviar-pergunta'>Enviar Pergunta</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
