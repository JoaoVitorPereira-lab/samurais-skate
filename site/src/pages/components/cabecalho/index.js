import React from "react";
import "./index.scss";
import { useNavigate } from 'react-router-dom'

export default function App() {

    const navigate = useNavigate();

  return (
    <header className="cabecalho-container">

        <div className="div-logo">
            <img src="../images/logo.png" alt="logo" className="logo"/>
        </div>

        <div className="div-icons">
            <div className="fav">
                <img src="../images/favoritos.png" alt="fav-img" className="icons-header ent"/> 
            </div>

            <div className="ent">
                <img src="../images/entrar.png" alt="ent-img" className="icons-header ent"/> 
            </div>

            <div className="carrinho" onClick={navigate('/ContinuarPedido')}>
                <img src="../images/carrinho.png" alt="carrinho-img" className="icons-header ent"/> 
            </div>   
        </div>

    </header>
  );
}