import React, { useState, useEffect } from 'react';
import './Main.css';
import PlayFoto from '../../assets/images/PlayStore.png';
import biologia from "/src/assets/images/biologia.png";
import fisica from "/src/assets/images/fisica.png";
import geografia from "/src/assets/images/geografia.png";
import historia from "/src/assets/images/historia.png";
import matematica from "/src/assets/images/matematica.png";
import portugues from "/src/assets/images/portugues.png";
import quimica from "/src/assets/images/quimica.png";
import sociologia from "/src/assets/images/sociologia.png";
import { getFirestore, collection, query, onSnapshot, doc, setDoc } from 'firebase/firestore'; // Importa Firestore
import { auth } from '../../DB/Conexao_Firebase'; // Importa a autenticação do Firebase
import DefaultProfileImage from '../../assets/images/defaultProfileImage.png'; // Imagem de perfil padrão
import { Link } from 'react-router-dom'; // Importa Link para o pop-up de login

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedIconName, setSelectedIconName] = useState('Dúvidas Frequentes ');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // Estados para responder perguntas
  const [resposta, setResposta] = useState(''); // Resposta atual do usuário
  const [respostas, setRespostas] = useState({}); // Respostas armazenadas
  const [showResponsePopup, setShowResponsePopup] = useState(false); // Estado para controlar o pop-up de resposta
  const [currentQuestionId, setCurrentQuestionId] = useState(null); // ID da pergunta atual no pop-up

  // Estados para armazenar o nome e a foto do usuário atual
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserPhoto, setCurrentUserPhoto] = useState(DefaultProfileImage);

  const db = getFirestore(); // Inicializa Firestore

  // Estados para gerenciar a exibição do pop-up de login
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // Icones das materias
  const iconList = [
    { name: 'matematica', img: matematica, label: 'Matemática' },
    { name: 'portugues', img: portugues, label: 'Português' },
    { name: 'quimica', img: quimica, label: 'Química' },
    { name: 'biologia', img: biologia, label: 'Biologia' },
    { name: 'fisica', img: fisica, label: 'Física' },
    { name: 'geografia', img: geografia, label: 'Geografia' },
    { name: 'historia', img: historia, label: 'História' },
    { name: 'sociologia', img: sociologia, label: 'Sociologia' },
  ];
  const carouselRef = React.useRef(null); 

  // Clone os itens do carrossel para dar a sensação de rolagem infinita
  const cloneIcons = [...iconList, ...iconList, ...iconList];





  useEffect(() => {
    // Verifica o estado de autenticação do usuário
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserName(user.displayName || "Anônimo");
        setCurrentUserPhoto(user.photoURL || DefaultProfileImage);
      } else {
        setCurrentUserName(null);
        setCurrentUserPhoto(DefaultProfileImage);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // Carregar respostas do localStorage ao montar o componente
    const respostasSalvas = JSON.parse(localStorage.getItem('respostas')) || {};
    setRespostas(respostasSalvas);
  }, []);

  useEffect(() => {
    // Cria uma consulta para obter as perguntas do Firestore
    const q = query(collection(db, "perguntas"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const perguntasArray = [];
      querySnapshot.forEach((doc) => {
        perguntasArray.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(perguntasArray); // Atualiza o estado com as perguntas do Firestore
    });

    return () => unsubscribe(); // Limpa o snapshot listener ao desmontar o componente
  }, [db]);

  useEffect(() => {
    const q = query(collection(db, 'respostas'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const respostasArray = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!respostasArray[data.perguntaId]) {
          respostasArray[data.perguntaId] = [];
        }
        respostasArray[data.perguntaId].push({ id: doc.id, ...data });
      });
      setRespostas(respostasArray);
    });
  
    return () => unsubscribe();
  }, [db]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 110;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 110;
    }
  };

  const handleIconClick = (iconName) => {
    if (selectedIcon === iconName) {
      setSelectedIcon(null);
      setSelectedIconName('Dúvidas Frequentes');
    } else {
      setSelectedIcon(iconName);
      setSelectedIconName(capitalizeFirstLetter(iconName));
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleExpand = (index) => {
    setExpandedQuestions((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Alterna entre expandido e contraído
    }));
  };

  // Função para renderizar as perguntas com base na matéria selecionada
  const renderQuestions = () => {
    const filteredQuestions = selectedIcon
      ? questions.filter((question) => question.materia.toLowerCase() === selectedIcon.toLowerCase())
      : questions;

    return filteredQuestions.length > 0 ? (
      filteredQuestions.map((question, index) => {
        const isExpanded = expandedQuestions[index];
        const shouldShowExpandButton = question.pergunta.length > 300; // Exibe o botão "Ler mais" se a pergunta for longa
        const displayText = isExpanded 
          ? question.pergunta 
          : question.pergunta.length > 300 
            ? `${question.pergunta.substring(0, 300)}...` 
            : question.pergunta;

        return (
          <div key={index}>
            <div className="ContainerQ">
              <div className="ParteCima">
                <div className="Esquerda">
                  <img 
                    src={question.fotoPerfil || DefaultProfileImage} // Usa a imagem padrão se não houver foto de perfil
                    className="FotoPerfil" 
                    alt="" 
                  />
                  {question.nome && <h2 className="NomePerfil">{question.nome}</h2>}
                </div>
                <div className="Direita">
                  {question.tempo && <p>{question.tempo}</p>}
                </div>
              </div>
              <div className="ParteMeio">
                <p>{displayText}</p>
                {shouldShowExpandButton && (
                  <button className="expand-button" onClick={() => toggleExpand(index)}>
                    {isExpanded ? 'Ler menos' : 'Ler mais'}
                  </button>
                )}
              </div>

              {/* Adição dos elementos "Responder" e "Ver Respostas" como <p> */}
              <div className="ParteBaixo">
                <p className="Responder" onClick={() => handleResponder(question.id)}>
                  Responder
                </p>
                <p className="Respostas" onClick={() => handleVerRespostas(question.id)}>
                  Ver Respostas
                </p>
              </div>
            </div>

            {/* Se "Ver Respostas" foi clicado para esta pergunta, exibir as respostas */}
            {verRespostasId === question.id && (
              <div className="RespostasContainer">
                <h1 id='toti'>Respostas:</h1>
                {respostas[question.id] && respostas[question.id].length > 0 ? (
                  respostas[question.id].map((resp, idx) => (
                    
                    <div key={idx} className="RespostaItem">
                      <img 
                        src={resp.fotoPerfil || DefaultProfileImage} // Imagem do respondente
                        className="FotoPerfilResp" 
                        alt="" 
                      />
                      <div className="RespostaTexto">
                        <h3 className="NomeResp">{resp.nome}</h3>
                        <p>{resp.texto}</p>
                      </div>
                      <div className="Respostas" onClick={() => handleVerRespostas(question.id)}>X

                      </div>
                    </div>
                  ))
                ) : (
                  <p>Sem respostas ainda.</p>
                )}
              </div>
            )}
          </div>
        );
      })
    ) : (
      <p className='NoQuestion'>Nenhuma pergunta disponível</p>
    );
  };

  // Estados para gerenciar a exibição das respostas
  const [verRespostasId, setVerRespostasId] = useState(null); // ID da pergunta cujas respostas estão sendo visualizadas

  // Funções de manipulação para os elementos "Responder" e "Ver Respostas"
  const handleResponder = (questionId) => {
    if (!currentUserName) {
      setShowLoginPopup(true); // Exibe o popup de login se não estiver autenticado
      return;
    }
    setCurrentQuestionId(questionId);
    setShowResponsePopup(true); // Exibe o pop-up de resposta
    setVerRespostasId(null); // Esconde as respostas se estiverem visíveis
  };

  const handleVerRespostas = (questionId) => {
    if (verRespostasId === questionId) {
      setVerRespostasId(null); // Toggle para esconder
    } else {
      setVerRespostasId(questionId);
      setCurrentQuestionId(null); // Esconde o pop-up se estiver aberto
      setShowResponsePopup(false);
    }
  };

  const enviarResposta = async () => {
    if (resposta.trim() === '') {
      alert('Por favor, digite uma resposta.');
      return;
    }
  
    const respostaData = {
      texto: resposta.trim(),
      nome: currentUserName,
      fotoPerfil: currentUserPhoto,
      perguntaId: currentQuestionId,
      uid: auth.currentUser.uid, // Adiciona o UID do usuário
      timestamp: new Date(), // Adicionar um timestamp se necessário
    };    
  
    try {
      // Criar uma nova referência de documento em "respostas"
      const respostaRef = doc(collection(db, 'respostas'));
      await setDoc(respostaRef, respostaData);
  
      // Atualizar o estado local se necessário
      setRespostas((prevRespostas) => {
        const novasRespostas = { ...prevRespostas };
        if (!novasRespostas[currentQuestionId]) {
          novasRespostas[currentQuestionId] = [];
        }
        novasRespostas[currentQuestionId].push(respostaData);
        return novasRespostas;
      });
  
      // Limpar o input e fechar o pop-up de resposta
      setResposta('');
      setShowResponsePopup(false);
      setVerRespostasId(currentQuestionId); // Opcional: abrir as respostas após enviar
    } catch (error) {
      console.error('Erro ao enviar resposta: ', error);
      alert('Erro ao enviar resposta. Tente novamente.');
    }
  };
  

  const handleCloseResponsePopup = () => {
    setShowResponsePopup(false);
    setResposta(''); // Limpa a resposta ao fechar o pop-up
  };

  // Função para fechar o pop-up de login
  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <main className="main-content">
      <section className="icons-section">
        <button className="carousel-btn" onClick={scrollLeft}>{'<'}</button>
        <div className="carousel" id="carousel" ref={carouselRef}>
          {cloneIcons.map((icon, index) => (
            <div
              key={index}
              className={`icon-item ${selectedIcon === icon.name ? 'selected' : ''}`}
              onClick={() => handleIconClick(icon.name)}
            >
              <img src={icon.img} alt={icon.label} className="icon" />
              <br />
              <span>{icon.label}</span>
            </div>
          ))}
        </div>
        <button className="carousel-btn" onClick={scrollRight}>{'>'}</button>
      </section>

      <section className="questions-section">
        <h1>{selectedIconName}</h1>
        <div className="questions-container">
          {renderQuestions()}
        </div>
      </section>

      {/* Pop-up para responder perguntas */}
      {showResponsePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* Parte de Cima */}
            <div className="popup-cima">
              <h2 className='Responder-tittle'>Escreva sua Resposta abaixo</h2>
              <p>Ajude os outros com sua resposta e especialidade no assunto!</p>
            </div>

            {/* Parte do Meio */}
            <div className="popup-meio">
              <textarea
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                placeholder="Digite sua resposta aqui..."
              />
            </div>

            {/* Parte de Baixo */}
            <div className="popup-baixo">
              <button onClick={enviarResposta}>Enviar Resposta</button>
              <button onClick={handleCloseResponsePopup}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up de login */}
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
    </main>
  );
};

export default Main;


