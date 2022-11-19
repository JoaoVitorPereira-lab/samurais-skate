import storage from 'local-storage'
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/MenuConfig'
import Rodape from '../../components/rodape'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react'


export default function Configuracao(){

    useEffect(() =>{

    },[])

    return (
        <main className='mae-config-inicial'>
            <Cabecalho/>
            <Menu/>
            <Rodape/>
        </main>
    )
}