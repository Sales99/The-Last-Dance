// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';
import IconHeader from '../../assets/Icons/IconHeader';
import { Link } from 'react-router-dom'; // Importando o Link


const Header = () => {
  return (
    <header className="header">
       <Link to="/"> 
        <img src="/src/assets/images/logo.png" alt="Logo" className="logo" />
      </Link>


      
        <input type="text" placeholder="Procurar..." className="search-bar" />
        <IconHeader/>
    </header>
  );
};

export default Header;
