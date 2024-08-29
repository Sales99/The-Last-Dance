// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';


const Header = () => {
  return (
    <header className="header">
      <img src="/src/assets/images/logo.png" alt="Logo" className="logo" />
        <input type="text" placeholder="Procurar..." className="search-bar" />
    </header>
  );
};

export default Header;
