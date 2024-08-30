// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';
import IconHeader from '../../assets/Icons/IconHeader';

const Header = () => {
  return (
    <header className="header">
      <img src="/src/assets/images/logo.png" alt="Logo" className="logo" />
        <input type="text" placeholder="Procurar..." className="search-bar" />
        <ul>
          <li><link to="/" className='link'></link></li>
        </ul>
        <IconHeader/>
    </header>
  );
};

export default Header;
