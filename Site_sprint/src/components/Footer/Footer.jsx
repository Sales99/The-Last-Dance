// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import logo from '/src/assets/images/logodouradasemfundo.png'; // Substitua pelo caminho correto da sua logo
import instagramIcon from '/src/assets/images/instagram.png';
import twitterIcon from '/src/assets/images/x.png';
import facebookIcon from '/src/assets/images/facebook.png';
import whatsappIcon from '/src/assets/images/whatsapp.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img className='Logo' src={logo} alt="Primezone Logo" />
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="#login">Login</a></li>
            <li><a href="#cadastro">Cadastro</a></li>
            <li><a href="#ajuda">Central de ajuda</a></li>
            <li><a href="#sobre">Quem somos</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Redes sociais</h4>
          <div className="social-icons">
            <a href="#instagram"><img src={instagramIcon} alt="Instagram" /></a>
            <a href="#twitter"><img src={twitterIcon} alt="Twitter" /></a>
            <a href="#facebook"><img src={facebookIcon} alt="Facebook" /></a>
            <a href="#whatsapp"><img src={whatsappIcon} alt="Whatsapp" /></a>
          </div>
        </div>
      </div>
      <br />
      <div className="footer-bottom">
        <p>© Copyright 2024 Copyright.com.br - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
