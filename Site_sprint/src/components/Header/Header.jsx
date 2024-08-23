// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src="/src/assets/images/logo.png" alt="Logo" className="logo" />
      <input type="text" placeholder="Search..." className="search-bar" />
        <img src="/src/assets/images/perfil.png" alt="Perfil" className='icon' />
      </header>
  );
};

export default Header;
