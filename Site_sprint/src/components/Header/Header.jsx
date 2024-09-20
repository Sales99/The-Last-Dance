import React, { useState, useEffect } from 'react';
import './Header.css';
import IconHeader from '../../assets/Icons/IconHeader';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Header = ({ adicionarPergunta }) => {
  const [showBox, setShowBox] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // Estado para exibir o popup de login
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Verifica se está logado
  const [pergunta, setPergunta] = useState('');
  const [materia, setMateria] = useState('');

  const auth = getAuth();

  // Verificar o estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Se o usuário estiver logado, isAuthenticated será true
    });
    return () => unsubscribe();
  }, [auth]);

  const handleClick = () => {
    setShowBox(true);
  };

  const handleClose = () => {
    setShowBox(false);
  };

  const handleEnviarPergunta = () => {
    if (pergunta && materia) {
      adicionarPergunta(pergunta, materia); // Passa a pergunta e a matéria para o Main
      setPergunta(''); // Limpa a pergunta após o envio
      setMateria('');
      setShowBox(false); // Fecha o popup
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      // Se o usuário estiver logado, redirecionar para a página de perfil
      window.location.href = '/perfil';
    } else {
      // Se não estiver logado, mostrar o popup de login
      setShowLoginPopup(true);
    }
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <header className="header">
      <Link to="/"> 
        <img src="/src/assets/images/logo.png" alt="Logo" className="logo" />
      </Link>
      
      <input type="text" placeholder="Procurar..." className="search-bar" />
      <h3 className="QuestionMaker" onClick={handleClick}>FAÇA SUA PERGUNTA</h3>
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
          <div className="popup-box">
            <button className="close-btn" onClick={handleCloseLoginPopup}>&times;</button>
            <h1>Você precisa estar logado para acessar o perfil!</h1>
            <Link to="/login">
              <button className="login-btn">Fazer Login</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
