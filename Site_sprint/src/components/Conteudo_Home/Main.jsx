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
import { getFirestore, collection, query, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'; // Importa Firestore
// import { db } from '../../DB/Conexao_Firebase';
import { auth } from '../../DB/Conexao_Firebase'; // Importa a autenticação do Firebase
import DefaultProfileImage from '../../assets/images/defaultProfileImage.png'; // Imagem de perfil padrão
import { Link } from 'react-router-dom'; // Importa Link para o pop-up de login

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedIconName, setSelectedIconName] = useState('Dúvidas Frequentes ');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [visibleResponses, setVisibleResponses] = useState(1); // Exibir uma resposta inicialmente

  const [isEditing, setIsEditing] = useState(false); // Controla se o popup de edição está visível

  // _________________________________
  // PopUp de Excluir e confirmar

  const [ConfirmarExclusao, setExclusao] = useState(false);
  const handleConfirmarExclusao = (question) => {
    setExclusao(true);
  };
  const handleCancelExclusao = () => {
    setExclusao(false)
  } ;

  // _________________________________

  const showMoreResponses = () => {
    setVisibleResponses((prevCount) => prevCount + 1); // Aumenta o número de respostas visíveis em 1
  };

  const handleEditQuestion = (question) => {
    setIsEditing(true); // Abre o pop-up de edição
    // Aqui você pode armazenar a pergunta no estado, se necessário.
  };  

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setIsEditing(false); // Fecha o popup sem salvar
  };



  // Estados para responder perguntas
  const [resposta, setResposta] = useState(''); // Resposta atual do usuário
  const [respostas, setRespostas] = useState({}); // Respostas armazenadas
  const [showResponsePopup, setShowResponsePopup] = useState(false); // Estado para controlar o pop-up de resposta
  const [currentQuestionId, setCurrentQuestionId] = useState(null); // ID da pergunta atual no pop-up

  const [showRespostasPopup, setShowRespostasPopup] = useState(false); // Controla a exibição do pop-up de respostas
  const [currentQuestion, setCurrentQuestion] = useState(null); // Armazena a pergunta atual selecionada

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
  const cloneIcons = [...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList, ...iconList];





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
  // Dentro da função renderQuestions
const renderQuestions = () => {
  const filteredQuestions = selectedIcon
    ? questions.filter((question) => question.materia.toLowerCase() === selectedIcon.toLowerCase())
    : questions;

  return filteredQuestions.length > 0 ? (
    filteredQuestions.map((question, index) => {
      const isExpanded = expandedQuestions[index];
      const shouldShowExpandButton = question.pergunta.length > 300;
      const displayText = isExpanded
        ? question.pergunta
        : question.pergunta.length > 300
          ? `${question.pergunta.substring(0, 300)}...`
          : question.pergunta;

      // Verificação para mostrar os ícones apenas se o usuário for o autor
      const isAuthor = auth.currentUser && auth.currentUser.uid === question.uid;

      return (
        <div key={index}>
          <div className="ContainerQ">
            <div className="ParteCima">
              <div className="Esquerda">
                <img
                  src={question.fotoPerfil || DefaultProfileImage}
                  className="FotoPerfil"
                  alt=""
                />
                {question.nome && <h2 className="NomePerfil">{question.nome}</h2>}
              </div>
              <div className="Direita">
                <div className="Direita-cima">
                  {question.tempo && <p>{question.tempo}</p>}
                </div>

                <div className="Direita-baixo">
                  {/* Renderiza os ícones de editar e excluir apenas se o usuário for o autor */}
                  {isAuthor && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        className='opcao-lixo'
                        onClick={() => handleConfirmarExclusao(question.id)} // Adicione a lógica para excluir a pergunta
                      >
                        <path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        className='opcao-editar'
                        onClick={() => handleEditQuestion(question)} // Chame a função para editar a pergunta
                      >
                        <path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"></path>
                      </svg>
                    </>
                  )}
                </div>

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

            <div className="ParteBaixo">
              <p className="Responder" onClick={() => handleResponder(question.id)}>
                Responder
              </p>
              <p className="Respostas" onClick={() => handleVerRespostas(question)}>
                Ver Respostas
              </p>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p className='NoQuestion'>Nenhuma pergunta disponível</p>
  );
};


  const showLessResponses = () => {
    setVisibleResponses((prevCount) => Math.max(prevCount - 1, 1)); // Garante que o número mínimo de respostas visíveis seja 1
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

  const handleVerRespostas = (question) => {
    if (verRespostasId === question.id) {
      setVerRespostasId(null);
      setShowRespostasPopup(false); // Fechar o pop-up se a mesma pergunta for clicada novamente
      setVisibleResponses(1); // Reinicia o número de respostas visíveis para 1
    } else {
      setVerRespostasId(question.id);
      setCurrentQuestion(question); // Atualizar a pergunta selecionada
      setShowRespostasPopup(true); // Abrir o pop-up de respostas
      setCurrentQuestionId(null);
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


      {/* Pop-up para exibir respostas da pergunta */}
      {showRespostasPopup && currentQuestion && (
        <div className="popup-overlay">
          <div className="popup-resposta">
            {/* Título e Pergunta */}
            <div className="popup-cima">
              <div className='pop-up-info'>
                <img
                  src={quimica}
                  className="FotoPerfilpopup" // <img src={question.fotoPerfil || DefaultProfileImage} className="FotoPerfil" alt="" />
                  alt=""
                />
                <p id='nome'> {currentQuestion.nome}</p>
                <button className='botaofechar' onClick={() => setShowRespostasPopup(false)}>X</button>
              </div>
              <h2 className='perguntapopup'>{currentQuestion.pergunta}</h2>

            </div>

            {/* Respostas */}
            <div className="popup-meio">
              <h3>Respostas:</h3>
              {respostas[currentQuestion.id] && respostas[currentQuestion.id].length > 0 ? (
                respostas[currentQuestion.id].slice(0, visibleResponses).map((resp, idx) => (
                  <div key={idx} className="RespostaItem">
                    <img
                      src={quimica} // src={resp.fotoperfil || DefaultProgileImage}
                      className="FotoPerfilResp"
                      alt=""
                    />
                    <div className="RespostaTexto">
                      <h3 className="NomeResp">{resp.nome}</h3>
                      <p id='Resp'>{resp.texto}</p>
                    </div>

                  </div>
                ))
              ) : (
                <p>Sem respostas ainda.</p>
              )}

              {/* Botão "Mostrar mais" para carregar mais respostas */}

            </div>
            <div className="respostas-buttons">
              <button onClick={showMoreResponses}>Mostrar mais</button>
              <button onClick={showLessResponses}>Mostrar menos</button>
            </div>

            {/* Botão para fechar o pop-up */}

          </div>
        </div>
      )}

      {/* __________________________________________ */}
      {/* PopUp Alterar pergunta */}
      {isEditing && (
  <div className="edit-popup-overlay"> {/* Classe de fundo do pop-up */}
    <div className="edit-popup-content"> {/* Classe do conteúdo do pop-up */}
      <h2 className='edit-popup-title'>EDITAR SUA PERGUNTA</h2> {/* Título do pop-up */}
      <textarea
        placeholder="Edite sua pergunta aqui..."
      />
      <div className="edit-popup-buttons"> {/* Botões do pop-up */}
        <button>Salvar</button>
        <button onClick={handleCancelEdit}>Cancelar</button>
      </div>
    </div>
  </div>
)}
{/* ___________________________________________ */}
{/* PopUp Confirmar Excluir pergunta */} 
{ConfirmarExclusao && (
  <div className="excluir-popup-overlay"> {/* Classe de fundo do pop-up */}
    <div className="excluir-popup-content"> {/* Classe do conteúdo do pop-up */}
      <h2 className='excluir-popup-title'>DESEJA APAGAR SUA PERGUNTA?</h2> {/* Título do pop-up */}
      <p>Ao clicar em confirmar, sua pergunta será apagada e terá que refazer outra para os outros poderem responder</p>
      <div className="excluir-popup-buttons"> {/* Botões do pop-up */}
        <button>Salvar</button>
        <button onClick={handleCancelExclusao}>Cancelar</button>
      </div>
    </div>
  </div>
)}

      {/* _________________________________ */}
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


