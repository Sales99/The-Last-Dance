import React, { useEffect, useState, useRef } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Importa Firestore
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Bannermelhor from '../../assets/images/bannermelhor.png';
import DefaultProfileImage from '../../assets/images/defaultProfileImage.png'; // Imagem de perfil padrão
import './Perfil.css';
import { storage, auth } from '../../DB/Conexao_Firebase';

const Perfil = () => {
  const [username, setUsername] = useState("Carregando...");
  const [profileImage, setProfileImage] = useState(DefaultProfileImage); // Começa com imagem de perfil padrão
  const [perguntaCount, setPerguntaCount] = useState(0); // Estado para contar perguntas
  const fileInputRef = useRef(null); // Referência para o input de arquivo
  const navigate = useNavigate(); // Hook de navegação

  const db = getFirestore(); // Inicializa Firestore

  const [respostaCount, setRespostaCount] = useState(0); // Novo estado para contar respostas

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUsername(user.displayName || "Nome não disponível");
        if (user.photoURL) {
          setProfileImage(user.photoURL); // Se houver uma foto de perfil no Firebase, usa essa
        }
        
        // Buscar o número de perguntas feitas pelo usuário no Firestore
        const perguntasQuery = query(
          collection(db, "perguntas"),
          where("uid", "==", user.uid) // Assumindo que cada pergunta tem um campo 'uid' com o ID do usuário
        );
        const querySnapshotPerguntas = await getDocs(perguntasQuery);
        setPerguntaCount(querySnapshotPerguntas.size); // Define a contagem de perguntas
  
        // Buscar o número de respostas feitas pelo usuário no Firestore
        const respostasQuery = query(
          collection(db, "respostas"),
          where("uid", "==", user.uid) // Filtra respostas pelo UID do usuário
        );
        const querySnapshotRespostas = await getDocs(respostasQuery);
        setRespostaCount(querySnapshotRespostas.size); // Define a contagem de respostas
      } else {
        setUsername("Nome não disponível");
        setPerguntaCount(0);
        setRespostaCount(0);
      }
    });
  
    return () => unsubscribe();
  }, [db]);
  

  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Abre o seletor de arquivos
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && auth.currentUser) {
      try {
        const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}/${file.name}`);

        // Upload do arquivo
        await uploadBytes(storageRef, file);

        // Obter a URL de download
        const downloadURL = await getDownloadURL(storageRef);

        // Atualizar o profileURL do usuário
        await updateProfile(auth.currentUser, { photoURL: downloadURL });

        // Atualizar o estado local para exibir a nova imagem
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
          {/* Input de arquivo oculto */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <h2 className='username'>{username}</h2>
          <h3 className='sair-button' onClick={handleLogout}>Sair da conta</h3>

          <div className="stats">
            <span>Respostas: {respostaCount}</span> {/* Exibe o número de respostas */}
            <span>Perguntas: {perguntaCount}</span> {/* Exibe o número de perguntas */}
            <span>Elogios</span>
          </div>


          <div className="points">
            <button className="pointsButton">Pontos: 0</button>
          </div>
        </div>

        <div className="rightSection">
          <h3>Você ainda não tem Respostas</h3>
          <p>(responda perguntas para acumular pontos)</p>
        </div>

        <div className="aboutSection">
          <h3>Sobre</h3>
          <p><strong>Escolaridade:</strong> Ensino Médio (completo)</p>
          <p><strong>Começou em:</strong> 29 de agosto de 2024</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Perfil;
