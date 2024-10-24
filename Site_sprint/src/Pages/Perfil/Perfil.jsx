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
  console.log("FOdase imagem")

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          console.log("Fdase");
          setUsername(user.displayName || "Nome não disponível");
          if (user.photoURL) {
            setProfileImage(user.photoURL);
          }

          // Obtenha dados do Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name || '');
            setUsername(userData.name || user.displayName || "Nome não disponível");
            setAge(userData.age || '');
            setLanguage(userData.language || '');
            setEducation(userData.education || '');
            setProfession(userData.profession || '');
            setBiography(userData.biography || '');
          }

          // Contar perguntas
          const perguntasQuery = query(
            collection(db, "perguntas"),
            where("uid", "==", user.uid)
          );
          const querySnapshotPerguntas = await getDocs(perguntasQuery);
          setPerguntaCount(querySnapshotPerguntas.size);
          console.log("Pergunta Count:", querySnapshotPerguntas.size); // Log

          // Contar respostas
          const respostasQuery = query(
            collection(db, "respostas"),
            where("uid", "==", user.uid)
          );
          const querySnapshotRespostas = await getDocs(respostasQuery);
          setRespostaCount(querySnapshotRespostas.size);
          console.log("Resposta Count:", querySnapshotRespostas.size); // Log
        } else {
          setUsername("Nome não disponível");
          setPerguntaCount(0);
          setRespostaCount(0);
        }
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      }
    });

    return () => authListener();
  }, [db]);




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
  const [showRespostas, setShowRespostas] = useState(false); // Controla qual conteúdo mostrar

  // Função para mostrar as respostas
  const handleShowRespostas = () => {
    setShowRespostas(true);
  };

  // Função para mostrar as perguntas
  const handleShowPerguntas = () => {
    setShowRespostas(false);
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
          <h2 className='username'>{username}</h2>
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

          <div className="points">
            <button className="pointsButton">Pontos: 0</button>
          </div>
        </div>

        <div className="rightSection"> {/* perguntas e respostas que o usuario fez usuário */}
          <button className='respostasbuttons'>Perguntas</button>
          <button className='respostasbuttons'>Respostas</button>
        </div>

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
