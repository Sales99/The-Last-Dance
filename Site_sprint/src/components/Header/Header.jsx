// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';
import IconHeader from '../../assets/Icons/IconHeader';
import { Link } from 'react-router-dom'; // Importando o Link
// import pesquisar from '../../assets/Icons/pesquisa-icon.png'


const Header = () => {
  return (
    <header className="header">
       <Link to="/"> 
        <img src="/src/assets/images/logo.png" alt="Logo" className="logo" />
      </Link>
      
        <input type="text" placeholder="Procurar..." className="search-bar" />
        <Link to="/perfil">
          <IconHeader/>
        </Link>
    </header>
  );
};

export default Header;
