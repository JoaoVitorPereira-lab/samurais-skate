import React from "react";

import './index.scss'

export default function Fixo(){
    return(
        <section className="Div-Pai-fixo">

            <div className="Titulo">
                <h1> Samurai’s Skate Shop </h1>
            </div>

            <div className="Subtitulo">
                <h6> A sua skateshop online, com os melhores preços nos produtos das grandes marcas do skate mundial. </h6>
            </div>

            <div className="div-principal-fixa">

                <div className="espaco-entre-eles">
              <img src="../images/Screenshot2.png" alt="" />
                <h4 className="desc-fixo"> Skates Montados </h4>
                <div className="linha"></div>
                </div>

                <div className="espaco-entre-eles">
              <img src="../images/Screenshot_1.png" alt="" />
              <h4 className="desc-fixo"> Bonés </h4>
              <div className="linha"></div>
                </div>

                <div>
               <img src="../images/tenis_para_andar_de_skate.png" alt="" />         
               <h4 className="desc-fixo"> Tênis </h4> 
               <div className="linha"></div>         
                </div>

            </div>

            

        </section>

    )
}