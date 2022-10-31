import "./index.scss"

import Storage from 'local-storage'
import { useEffect, useState } from 'react'

export default function Cabecalho(){
    const [usuario,setUsuario] = useState('');

    useEffect(() =>{
        if(Storage('usuario-logado')){
            const nome = Storage('usuario-logado')
            setUsuario(nome.nome)
        }
    },[])

    return(
        <div className="comp-cabecalho">
            <a href="/">
                <img src="/images/logo-branco.gif" alt=""/>
            </a>
            <p> Seja bem-vindo, Admin </p>
            <div className="bolinha">
                <span> {usuario[0]} </span>
            </div>
        </div>
    );
}