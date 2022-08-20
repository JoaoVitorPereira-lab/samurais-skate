import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";

export default function App() {
  return (
    <section className="marcas-container">

      <text id="foo">Nossas Marcas</text>

      <div className="div-marcas">

        <div>
          
          <img className="seta" src="../images/seta.png.png" alt=""/> 
          <img className="img-marcas" src="../images/HOCKS 1.png" alt="" />
        </div>

        <div>
          <img className="img-marcas"src="../images/NINECLOUDS.png" alt="" />
        </div>

        <div>
          <img className="img-marcas"src="../images/HONDAR 1.png" alt="" />
        </div>

        <div>
          <img className="img-marcas" src="../images/SANTA-CRUZ.png" alt="" />
        </div>

        <div>
          <img className="img-marcas"src="../images/TRASHER.png" alt="" />
        </div>

        <div>
          <img className="img-marcas"src="../images/GRIZZLY.png" alt="" />
          <img className="seta-direita" src="../images/direita-seta.png" alt=""/>
        </div>

      </div>
    </section>
  );
}
