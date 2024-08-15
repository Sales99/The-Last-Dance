// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';
import Logo from '../images/logoPZ.png'


const Header = () => {
  return (
    <header className="header">
      <img className='logo' src={Logo} alt='logo'></img>
      <input type="text" placeholder="Search..." className="search-bar" />
      <div className="icon profile-icon">👤</div>
      <div className="icon menu-icon">☰</div>
    </header>
  );
};

export default Header;
