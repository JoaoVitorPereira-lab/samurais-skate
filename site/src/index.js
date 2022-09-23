import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Rotas from './Routes.js'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
    <Rotas/>
  </React.StrictMode>
);
