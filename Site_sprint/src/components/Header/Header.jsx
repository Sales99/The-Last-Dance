import React, { useState, useEffect } from 'react';
import './Header.css';
import IconHeader from '../../assets/Icons/IconHeader';
import { Link } from 'react-router-dom';
import logo from "/src/assets/images/logo.png"
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Header = ({ adicionarPergunta }) => {
  const [showBox, setShowBox] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pergunta, setPergunta] = useState('');
  const [materia, setMateria] = useState('');

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleClickPergunta = () => {
    if (isAuthenticated) {
      setShowBox(true);
    } else {
      setShowLoginPopup(true); // Exibe o popup de login se não estiver autenticado
    }
  };

  const handleClose = () => {
    setShowBox(false);
  };

  const handleEnviarPergunta = () => {
    if (pergunta && materia) {
      adicionarPergunta(pergunta, materia);
      setPergunta('');
      setMateria('');
      setShowBox(false);
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      window.location.href = '/perfil';
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <header className="header">
      <Link to="/"> 
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      
      <input type="text" placeholder="Procurar..." className="search-bar" />
      <h3 className="QuestionMaker" onClick={handleClickPergunta}>FAÇA SUA PERGUNTA</h3>
      <div onClick={handleProfileClick}>
        <IconHeader />
      </div>

      {showBox && (
        <div className="overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={handleClose}>&times;</button>
            <h1 className='QuestionMaker-Tittle'>DIGITE SUA PERGUNTA PARA QUE OUTROS POSSAM RESPONDER</h1>

            <textarea
              type="text"
              placeholder="Digite sua pergunta aqui"
              className="question-input"
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
            /> <br />

            <div className="linha-enviar-popup">
              <select
                className="seletor-materia"
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
              >
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
              <button className="enviar-pergunta" onClick={handleEnviarPergunta}>Enviar Pergunta</button>
            </div>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <div className="overlay">
          <div className="popup-box-login">
            <button className="close-btn" onClick={handleCloseLoginPopup}>&times;</button>
            <h1>Você não está logado em nenhuma conta!</h1>
            <h4>Parece que você ainda não logou na <b>PrimeZone!</b> Siga o link abaixo para entrar na sua conta, ou faça sua conta agora mesmo!</h4>
            <Link to="/login">
              <button className="login-btn">Entrar em uma conta</button>
            </Link><br />
            <p>ou</p>
            <Link to="/cadastro">
              <button className="cadastro-btn">Cadastrar-se</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;