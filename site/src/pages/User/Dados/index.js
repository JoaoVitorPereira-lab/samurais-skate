import Cabecalho from '../../components/cabecalho'
import Rodape from '../../components/rodape'
import Menu from '../../components/MenuConfig'
import storage from 'local-storage'
import { useState,useEffect } from 'react'

import './index.scss'

export default function Dados(){
    const[nome,setNome] = useState()
    const[sobrenome,setSobrenome] = useState()
    const[email,setEmail] = useState()
    const[senha,setSenha] = useState()
    const[usuario,setUsuario] = useState([])

    useEffect(() =>{
        if(storage('usuario-logado')){
            const nome = storage('usuario-logado')
            setUsuario(nome)
        }
    },[])
    return(
        <main className='main-dados'>
            <Cabecalho/>
            <Menu/>
            <div className='div-dados'>

                <div className='titulo-dados'>
                    <h1> Meus Dados </h1>
                    <label> Gerencie seus dados pessoais: </label>
                </div>

                <div className='infos-dados'>

                    <div className='nome-dados'>
                        <label> Nome: </label> <input type="text" value={nome} placeholder={usuario.nome} onChange={e => setNome(e.target.value)} />
                    </div>  

                    <div className='sobrenome-dados'>
                        <label> Sobrenome: </label> <input type="text" value={sobrenome} placeholder={usuario.sobrenome} onChange={e =>setSobrenome(e.target.value)} />               
                    </div>

                    <div className='email-dados'>
                        <label> Email: </label> <input type="text" value={email} placeholder={usuario.Email} onChange={e => setEmail(e.target.value)} />
                    </div>      

                    <div className='senha-dados'>
                        <label> Senha: </label> <input type="text" value={senha} placeholder="****" onChange={e => setSenha(e.target.value)} />
                    </div>      
                </div>

                <div className='botao-dados'>
                    <button> Alterar </button>
                </div>

            </div>
            <Rodape/>
        </main>
    )
}