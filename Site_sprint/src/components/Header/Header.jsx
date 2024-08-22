// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src="/path-to-your-logo.png" alt="Logo" className="logo" />
      <input type="text" placeholder="Search..." className="search-bar" />
      <div className="icon profile-icon">👤</div>
      <div className="icon menu-icon">☰</div>
    </header>
  );
};

export default Header;
