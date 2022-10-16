import './index.scss'
import { useRef, useState } from "react"
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { toast } from 'react-toastify'

import Cabecalho from '../components/cabecalhoUser';






export default function Landing_Page() {

    const navigate = useNavigate()
    const ref = useRef()

    return (
        <main className='landing-page'>

            <div className='componentes'>
                <Cabecalho/>   
            </div>

            <section className='carrosel'>
                <div className='fotos'>
                   <img src="./images/1" alt="" />
                
                </div>
            </section>
        </main>
    );
}