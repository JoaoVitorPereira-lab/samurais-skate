import React from "react";
import "./index.scss"

import SliderImg from './components/slider-img'
import SliderMarcas from './components/slider-marcas'
import Cabecalho from '../components/cabecalho'
import Navs from '../components/navs'
import Rodape from "../components/rodape";
import Fixo from "./components/fixos";

export default function Index(){

    return(
    <div className="lp-page">
        <Cabecalho />
        <Navs />
        <SliderImg />
        <SliderMarcas />
        <Fixo/>
        <Rodape/>
    </div>
    )
}