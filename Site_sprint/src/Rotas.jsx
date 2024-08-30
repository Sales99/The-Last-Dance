import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import LogarPage from './Pages/LogarPage/LogarPage';
import CadastroPage from './Pages/Cadastro/Cadastro';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LogarPage />} />
        <Route path='/cadastro' element={<CadastroPage />} />
      </Routes>
    </div>
  );
};

export default App;
