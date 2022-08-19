import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import "./index.scss";

export default function App() {

  return (
    <div className="slider-container">
    <Carousel>
        <Carousel.Item autoPlay={true} interval={2000}>
          <img
            className="imgs"
            src="../images/1.png"
            alt=""
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="imgs"
            src="../images/2.jpg"
            alt=""
          />
        </Carousel.Item>
    </Carousel>  

    <text>
        Imagens meramente ilustrativas
    </text>

    <div className="div-vantagens">
        <div className="div-infos">
            <img src="../images/entrega.png" alt="" className="lg-vantagens img-01"/>
            <p> <span> ENTREGA PARA TODO O BRASIL </span> de forma rápida e eficiente </p>
        </div>

        <div className="div-infos">
            <img src="../images/cartao.png" alt="" className="lg-vantagens img-02"/>
            <p> <span> PARCELE SUAS COMPRAR </span> em até 6x sem juros </p>
        </div>

        <div className="div-infos">
            <img src="../images/pix.png" alt="" className="lg-vantagens img-03"/>
            <p> <span> PAGAMENTO VIA PIX OU BOLETO </span> 5% de desconto </p>
        </div>
    </div>

    <hr/>

    </div>
  );
}