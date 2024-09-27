// src/Pages/Perfil/Perfil.jsx

import React, { useEffect, useState, useRef } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Bannermelhor from '../../assets/images/bannermelhor.png';
import Rd from '../../assets/images/rddesgracado.jpg'; // Imagem de perfil padrão
import './Perfil.css';
import { storage, auth } from '../../DB/Conexao_Firebase'; // Importar storage e auth do Firebase

const Perfil = () => {
  const [username, setUsername] = useState("Carregando...");
  const [profileImage, setProfileImage] = useState(Rd); // Estado para a imagem de perfil
  const fileInputRef = useRef(null); // Referência para o input de arquivo

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || "Nome não disponível");
        if (user.photoURL) {
          setProfileImage(user.photoURL);
        }
      } else {
        setUsername("Nome não disponível");
      }
    });

    // Limpeza do efeito
    return () => unsubscribe();
  }, []);

  // Função para lidar com o clique na imagem de perfil
  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Abre o seletor de arquivos
    }
  };

  // Função para lidar com a seleção do arquivo
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && auth.currentUser) {
      try {
        // Referência no Firebase Storage
        const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}/${file.name}`);

        // Upload do arquivo
        await uploadBytes(storageRef, file);

        // Obter a URL de download
        const downloadURL = await getDownloadURL(storageRef);

        // Atualizar o profileURL do usuário
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });

        // Atualizar o estado local para exibir a nova imagem
        setProfileImage(downloadURL);

        // Opcional: Notificar o usuário sobre o sucesso
        alert("Imagem de perfil atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar a foto de perfil: ", error);
        alert("Falha ao atualizar a imagem de perfil. Tente novamente.");
      }
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
            onClick={handleProfileImageClick} // Adiciona o handler de clique
            style={{ cursor: 'pointer' }} // Muda o cursor para indicar que é clicável
          />
          {/* Input de arquivo oculto */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <h2 className='username'>{username}</h2> {/* Exibe o nome do usuário */}

          <div className="stats">
            <span>Respostas</span>
            <span>Perguntas</span>
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
