// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';
import IconH from '../../assets/IconHeader';

const Header = () => {
  return (
    <header className="header">
      <img src="/src/assets/images/logo.png" alt="Logo" className="logo" />
        <input type="text" placeholder="Procurar..." className="search-bar" />
        <IconH/>
    </header>
  );
};

export default Header;
