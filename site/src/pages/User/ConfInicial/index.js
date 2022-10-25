import storage from 'local-storage'
import Cabecalho from '../../components/cabecalho'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { useState } from 'react'

export default function Configuracao(){


    return (
        <main className='mae-config-inicial'>
            <Cabecalho/>            
        </main>
    )
}