import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import LogarPage from './Pages/LogarPage/LogarPage';
import CadastroPage from './Pages/Cadastro/Cadastro';
import Quemsomos from './Pages/Quemsomos/Quemsomos';
import Ajuda from './Pages/CentralDeAjuda/Ajuda';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LogarPage />} />
        <Route path='/cadastro' element={<CadastroPage />} />
        <Route path='/quemsomos' element={<Quemsomos />} />
        <Route path='/ajuda' element={<Ajuda />}/>
      </Routes>
    </div>
  );
};

export default App;
