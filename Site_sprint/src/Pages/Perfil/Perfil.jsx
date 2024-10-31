import React, { useEffect, useState, useRef } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Bannermelhor from '../../assets/images/bannermelhor.png';
import DefaultProfileImage from '../../assets/images/defaultProfileImage.png';
import './Perfil.css';
import { storage, auth } from '../../DB/Conexao_Firebase';

const Perfil = () => {
  const [username, setUsername] = useState("Carregando...");
  const [profileImage, setProfileImage] = useState(DefaultProfileImage);
  const [perguntaCount, setPerguntaCount] = useState(0);
  const [respostaCount, setRespostaCount] = useState(0);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('');
  const [education, setEducation] = useState('');
  const [profession, setProfession] = useState('');
  const [biography, setBiography] = useState('');

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const db = getFirestore();
  console.log("Imagem de Perfil")

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setUsername(user.displayName || "Nome não disponível");
          setProfileImage(user.photoURL || DefaultProfileImage);
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name || '');
            setAge(userData.age || '');
            setLanguage(userData.language || '');
            setEducation(userData.education || '');
            setProfession(userData.profession || '');
            setBiography(userData.biography || '');
          }

          // Fetch perguntas
          fetchPerguntas(user.uid);
        fetchRespostas(user.uid); // Adiciona a contagem de respostas aqui
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      }
    } else {
      resetUserProfile();
    }
  });

    return () => authListener();
  }, [auth, db]);

  const fetchPerguntas = async (uid) => {
    const perguntasQuery = query(collection(db, "perguntas"), where("uid", "==", uid));
    const querySnapshot = await getDocs(perguntasQuery);
    setPerguntas(querySnapshot.docs.map(doc => doc.data())); // Armazena as perguntas
    setPerguntaCount(querySnapshot.size); // Contagem de perguntas
  };

  // ___________________________________________________
  // Fetch Respostas

  // Fetch perguntas e respostas
  
  const fetchRespostas = async (uid) => {
    const respostasQuery = query(collection(db, "respostas"), where("uid", "==", uid));
    const querySnapshot = await getDocs(respostasQuery);
    setRespostas(querySnapshot.docs.map(doc => doc.data())); // Armazena as respostas
    setRespostaCount(querySnapshot.size); // Contagem de respostas
  };
  

  // Resetando perfil quando o usuário não está autenticado
  const resetUserProfile = () => {
    setUsername("Nome não disponível");
    setPerguntaCount(0);
    setRespostaCount(0);
    setProfileImage(DefaultProfileImage); // Adicionando imagem padrão
  };





  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && auth.currentUser) {
      try {
        const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
        setProfileImage(downloadURL);
        alert("Imagem de perfil atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar a foto de perfil: ", error);
        alert("Falha ao atualizar a imagem de perfil. Tente novamente.");
      }
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Você tem certeza que deseja sair da conta?");
    if (confirmed) {
      auth.signOut()
        .then(() => {
          navigate('/'); // Redireciona para a página inicial
        })
        .catch((error) => {
          console.error("Erro ao sair da conta:", error);
        });
    }
  };

  const openEditPopup = () => {
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  const handleSaveChanges = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      try {
        await setDoc(userRef, {
          name,
          age,
          language,
          education,
          profession,
          biography,
        }, { merge: true });

        // Atualize o estado do username com o novo nome
        setUsername(name); // Atualiza o nome que aparece abaixo da foto de perfil

        // Atualizar o nome nas perguntas
        await updateQuestionNames(name); // Nova função para atualizar as perguntas

        alert("Informações do perfil atualizadas com sucesso!");
        closeEditPopup();
      } catch (error) {
        console.error("Erro ao salvar informações do perfil: ", error);
        alert("Erro ao salvar informações. Tente novamente.");
      }
    }
  };

  // Função para atualizar o nome nas perguntas do usuário
  const updateQuestionNames = async (newName) => {
    const perguntasQuery = query(
      collection(db, "perguntas"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(perguntasQuery);

    const updates = querySnapshot.docs.map(doc => {
      return setDoc(doc.ref, { nome: newName }, { merge: true });
    });

    await Promise.all(updates); // Aguarda todas as atualizações serem concluídas
  };

  // ________________________________
  // ________________________________
  // Código para as perguntas

  const [perguntas, setPerguntas] = useState([]); // Armazena as perguntas
  const [respostas, setRespostas] = useState([]); // Armazena as respostas
  const [showPerguntas, setShowPerguntas] = useState(false); // Conteudo do Perguntas
  const [showRespostas, setShowRespostas] = useState(false); // Conteudo das Respostas
  const [showButtons, setShowButtons] = useState(true);
  const [showFechar, setShowFechar] = useState(false);


  // Função para mostrar as perguntas
  const handleShowPerguntas = () => {
    setShowPerguntas(true);
    setShowFechar(true);
    setShowRespostas(false);
    setShowButtons(false);
  };

  // Função para mostrar as respostas
  const handleShowRespostas = () => {
    setShowRespostas(true);
    setShowFechar(true);
    setShowPerguntas(false);
    setShowButtons(false);
  };

  const handleFechar = () => {
    setShowButtons(true);
    setShowRespostas(false);
    setShowPerguntas(false);
    setShowFechar(false);
  }

  // ____________________

  const renderPerguntas = () => {
    if (perguntas.length === 0) {
      return <p>Nenhuma pergunta foi feita ainda</p>;
    }

    return perguntas.map((pergunta, index) => (
      <div key={index} className="perguntaItem">
        <p>{pergunta.pergunta}</p> {/* Renderiza o campo "pergunta" */}
      </div>
    ));
  };


  // ________________________________

  return (
    <>
      <Header />
      <img src={Bannermelhor} alt="Banner" className='Bannerzinho' />

      <div className="perfilContainer">
        <div className="leftSection">
          <img
            src={profileImage}
            alt="User Profile"
            className="profileImage"
            onClick={handleProfileImageClick}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <h2 className='username'>{name}</h2>
          <h3 className='editar-button' onClick={openEditPopup}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="4B4B4B">
              <path d="M3.944 11.79a.5.5 0 0 1 .141-.277L14.163 1.435a.5.5 0 0 1 .707 0l3.89 3.89a.5.5 0 0 1 0 .706L8.68 16.11a.5.5 0 0 1-.277.14l-4.595.706a.5.5 0 0 1-.57-.57zm.964.314l-.577 3.76l3.759-.578l9.609-9.608l-3.183-3.182z"></path>
              <path d="m15.472 8.173l-3.537-3.53l.707-.708l3.536 3.53z"></path>
            </svg>  EDITAR PERFIL
          </h3>

          <h3 className='sair-button' onClick={handleLogout}>Sair da conta</h3>

          <div className="stats">
            <span>Respostas: {respostaCount}</span>
            <span>Perguntas: {perguntaCount}</span>
          </div>
        </div>

        {/* ______________________________________________ */}

        <div className="rightSection"> {/* perguntas e respostas que o usuario fez usuário */}

          {showButtons && ( // Deixa os botões aparecendo
            <>
              <button className='respostasbuttons' onClick={handleShowPerguntas}>Perguntas</button>
              <button className='respostasbuttons' onClick={handleShowRespostas}>Respostas</button>
            </>
          )}

          {showPerguntas && (
            <div>
              <div className="cima">
                <b className='conteudo-button-tittle'>Minhas Perguntas</b>
                <p className='fechar-x' onClick={handleFechar}>x</p>
              </div>
              <div className="conteudo-button">
                {renderPerguntas()} {/* Chama a função para renderizar as perguntas */}
              </div>
            </div>
          )}

          {showRespostas && ( // Exibe as respostas se showRespostas for verdadeiro
            <div>
              <div className="cima">
                <b className='conteudo-button-tittle'>Minhas Respostas</b>
                <p className='fechar-x' onClick={handleFechar}>x</p>
                <br />
              </div>
              <div className="conteudo-button">
                <p>Brubru aqui é respostas</p>
                {/* Acima você substitui pelo código que irá aparecer as respostas */}
              </div>
            </div>
          )}

        </div>

        {/* ______________________________________________________________ */}
        <div className="aboutSection">
          <h3>Sobre</h3>
          <p><strong>Escolaridade:</strong> {education || "Não definida"}</p>
          <p><strong>Começou em:</strong> 29 de agosto de 2024</p>
          <p><strong>Idade:</strong> {age || "Não definida"}</p>
          <p><strong>Idioma:</strong> {language || "Não definido"}</p>
          <p><strong>Profissão:</strong> {profession || "Não definida"}</p>
          <p><strong>Biografia:</strong> {biography || "Não definida"}</p>
        </div>
      </div>

      {/* Pop-up de Edição de Perfil */}
      {showEditPopup && (
        <div className="popup">
          <div className="popupContent">
            <div className="popupHeader">
              <h1 className="popupTitle">EDITAR PERFIL</h1>
              <span className="closePopup" onClick={closeEditPopup}>&times;</span>
            </div>

            <div className="popupField">
              <div className="popupFields">

                <div className="leftColumn">

                  <div className="popupField">
                    <label>Nome</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="popupField">
                    <label>Escolaridade</label>
                    <select
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option value="Ensino Fundamental">Ensino Fundamental</option>
                      <option value="Ensino Médio">Ensino Médio</option>
                      <option value="Ensino Técnico">Ensino Técnico</option>
                      <option value="Ensino Superior">Ensino Superior</option>
                    </select>
                  </div>
                </div>

                <div className="rightColumn">
                  <div className="popupField">
                    <label>Idade</label>
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                  </div>

                  <div className="popupField">
                    <label>Idioma</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option value="">Selecione</option>
                      <option value="Português">Português</option>
                      <option value="Inglês">Inglês</option>
                      <option value="Espanhol">Espanhol</option>
                      {/* Adicione outras opções de idiomas conforme necessário */}
                    </select>
                  </div>
                </div>
              </div>
              <div className="popupField">
                <label>Profissão</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
              </div>
              <div className="popupField">
                <label>Biografia</label>
                <textarea
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                ></textarea>
              </div>

              <button className="saveButton" onClick={handleSaveChanges}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Perfil;
