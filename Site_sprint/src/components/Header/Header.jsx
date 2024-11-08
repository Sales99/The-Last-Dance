import React, { useState, useEffect } from 'react';
import './Header.css';
import IconHeader from '../../assets/Icons/IconHeader';
import { Link } from 'react-router-dom';
import logo from '/src/assets/images/logo.png';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firestore para salvar perguntas

const Header = ({ searchTerm, setSearchTerm }) => {
  const [showBox, setShowBox] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pergunta, setPergunta] = useState('');
  const [materia, setMateria] = useState('');
  const [nome, setNome] = useState(''); // Estado para o nome do usuário
  const [fotoPerfil, setFotoPerfil] = useState(''); // Estado para a imagem de perfil

  const auth = getAuth();
  const db = getFirestore(); // Inicializa Firestore

  // ___________________________________________
  // Estado para filtrar perguntas pela barra de pesquisa
  // 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Atualiza o estado com o valor da pesquisa
  };

  // Função para capturar o Enter na barra de pesquisa
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchTerm(event.target.value); // Define o termo de pesquisa no estado global (HomePage)
    }
  };

  // 
  // 
  // ___________________________________________

  // Atualiza o estado baseado no status de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        // Define o nome e a foto de perfil do usuário autenticado
        setNome(user.displayName || 'Usuário Anônimo');
        setFotoPerfil(user.photoURL || '/src/assets/images/defaultProfilePic.png'); // Define uma foto padrão se não houver
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Abre a caixa de perguntas se o usuário estiver autenticado
  const handleClickPergunta = () => {
    if (isAuthenticated) {
      setShowBox(true);
    } else {
      setShowLoginPopup(true); // Exibe o popup de login se não estiver autenticado
    }
  };

  // Fecha a caixa de perguntas
  const handleClose = () => {
    setShowBox(false);
  };

  // Envia a pergunta para o Firestore
  const handleEnviarPergunta = async () => {
    if (pergunta && materia) {
      try {
        const user = auth.currentUser; // Obter o usuário autenticado

        // Salva a pergunta no Firestore com o uid do usuário
        await addDoc(collection(db, "perguntas"), {
          pergunta,
          materia,
          nome,
          fotoPerfil,
          uid: user ? user.uid : 'anônimo', // Adiciona o uid do usuário à pergunta
          tempo: new Date().toLocaleString() // Adiciona a data e hora da pergunta
        });

        setPergunta(''); // Limpa o campo de pergunta
        setMateria(''); // Limpa o campo de matéria
        setShowBox(false); // Fecha a caixa de entrada
      } catch (error) {
        console.error("Erro ao enviar a pergunta: ", error);
      }
    }
  };

  // Abre o perfil do usuário ou exibe popup de login se não estiver autenticado
  const handleProfileClick = () => {
    if (isAuthenticated) {
      window.location.href = '/perfil';
    } else {
      setShowLoginPopup(true);
    }
  };

  // Fecha o popup de login
  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <input
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        type="text"
        placeholder="Procurar..."
        className="search-bar" />

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