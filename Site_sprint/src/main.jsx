import React from 'react';
import ReactDOM from 'react-dom/client'; // Importando ReactDOM
import './index.css';
import Rotas from './Rotas';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Rotas />
  </BrowserRouter>
);
