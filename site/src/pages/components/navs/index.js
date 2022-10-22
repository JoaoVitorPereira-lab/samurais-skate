import React from "react";
import "./index.scss";

export default function Navs() {
  return (
    <nav className="navs-container">

        <div className="div-navs">
            <div className="navs-produtos not">
                <img src="../images/skate.png" className="imgs-nav" alt=""/>
                <span> Skate </span>
            </div>

            <div className="navs-produtos">
                <img src="../images/tenis.png" className="imgs-nav" alt=""/>
                <span> Tênis </span>
            </div>

            <div className="navs-produtos">
                <img src="../images/bone.png" className="imgs-nav" alt=""/>
                <span> Boné </span>
            </div>

            <div className="navs-produtos">
                <img src="../images/acessorios.png" className="imgs-nav" alt=""/>
                <span> Acessórios </span>
            </div>

            <div className="navs-produtos">
                <img src="../images/promocoes.png" className="imgs-nav" alt=""/>
                <span> Promoções </span>
            </div>
        </div>

        <div className="div-buscar">
            <input type="text" className="buscar-input" placeholder="Buscar"/>
            <div>
                <img src="../images/buscar.png" className="buscar-img" alt=""/>
            </div>
        </div>

    </nav>
  );
}