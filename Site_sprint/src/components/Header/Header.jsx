import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Header.css'; // Alterado para header.css
import Logo from '../components/images/logo/logo.png';

const Header = ({ search, setSearch, searchproduct }) => {
  return (
    <div className='header'>
      <div className='mid_header'>
        {/* Logo */}
        <div className='logo'>
          <img className='Logo' src={Logo} alt='logo' />
        </div>

        {/* Caixa de pesquisa */}
        <div className='search_box'>
          <input
            type='text'
            value={search}
            placeholder='Pesquisar'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchproduct}>
            <AiOutlineSearch />
          </button>
        </div>

        {/* Navegação */}
        <div className='nav'>
          <ul>
            <li>
              <Link to='/' className='link'>Home</Link>
            </li>
            <li>
              <Link to='/shop' className='link'>Loja</Link>
            </li>
            <li>
              <Link to='/cart' className='link'>Carrinho</Link>
            </li>
            <li>
              <Link to='/contact' className='link'>Contato</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
