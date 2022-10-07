import React from "react";
import "./index.scss";

export default function App(props) {
  return (
    
    <main className="header-container">

        <div className="div-logo">

            <div>
            <img src="../images/logo.png" width="124.8px" />
            </div>

            <div className="infos">
                <img src="../images/lua.png" width="40px" />
                <img src="../images/favoritos.png" width="40px" />
                <img src="../images/user.png" width="40px" />
                <img src="../images/carrinho.png" width="40px" />
            </div>

        </div>

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
                <input type="text" className="buscar-input" placeholder="Buscar" value={props.value} onChange={props.change} />
                <div>
                    <img src="../images/buscar.png" className="buscar-img" alt="" onClick={props.click} />
                </div>
            </div>

        </nav>
    </main>

  );
}