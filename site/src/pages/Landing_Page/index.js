import './index.scss'
import { useRef, useState } from "react"
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { toast } from 'react-toastify'

import Cabecalho from '../components/cabecalhoUser'


//* IMAGENS PARA O CARROSSEL*//

import images1 from './images/1.jpg'
import images2 from './images/2.jpg'
import images3 from './images/3.jpg'








export default function Landing_Page() {

    const navigate = useNavigate()
    const ref = useRef()

    return (
        <main className='landing-page'>

            <div className='componentes'>
                <Cabecalho />
            </div>

            <section className='carrosel'>


                <div className='slides'>

                    <input className='radio-btn' type="radio" id='radio1' />
                    <input className='radio-btn' type="radio" id='radio2' />
                    <input className='radio-btn' type="radio" id='radio3' />


                    <div className='foto1'>
                        <img className='image1' src={images1} />
                    </div>

                    <div className='foto2'>
                        <img className='image2' src={images2} />
                    </div>

                    <div className='foto3'>
                        <img className='image3' src={images3} />
                    </div>


                    <div className='nav-auto'>

                        <div className='auto-btn1'></div>
                        <div className='auto-btn2'></div>
                        <div className='auto-btn3'></div>

                    </div>

                    <div className='nav-manual'>

                        <label for='radio1' className='manual-btn1'></label>
                        <label for='radio2' className='manual-btn2'></label>
                        <label for='radio3' className='manual-btn3'></label>

                    </div>



                </div>



            </section>
        </main>
    );
}