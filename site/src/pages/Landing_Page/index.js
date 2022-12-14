import './index.scss'

import { useEffect } from 'react';
import Storage from 'local-storage';

import { useRef} from "react"
import { Link} from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Cabecalho from '../components/cabecalho'
import Rodape from '../components/rodape'


//* IMAGENS PARA O CARROSSEL*//

import images1 from './images/1.jpg'
import images2 from './images/2.jpg'
import images3 from './images/3.png'

// *FIM DAS IMGS CARROSSEL* //


import images4 from './images/entrega.png'
import images5 from './images/cartao.png'
import images6 from './images/pix.png'
import images7 from './images/HOCKS 1.png'
import images8 from './images/NINECLOUDS.png'
import images9 from './images/HONDAR 1.png'
import images10 from './images/SANTA-CRUZ.png'
import images11 from './images/TRASHER.png'
import images12 from './images/GRIZZLY.png'
import images13 from './images/Screenshot2.png'
import images14 from './images/Screenshot_1.png'
import images15 from './images/tenis_para_andar_de_skate.png'

export default function Landing_Page() {

    const ref = useRef()

    useEffect(() => {
        if(!Storage('carrinho')){
            Storage('carrinho', [])
        }
        if(!Storage('favoritos')){
            Storage('favoritos', [])
        }
        if(!Storage('admin-logado')){
            Storage('admin-logado', [])
        }
    }, [])

    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 500, min: 100 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }


    }

    return (
        <main className='landing-page'>

            <div className='componentes'>
                <Cabecalho />
            </div>

            <section className="paf">
                <Carousel
                    swipeable={false}
                    draggable={false}

                    responsive={responsive}
                    ssr={true}


                    infinite={true}
                    autoPlaySpeed={4000}
                    autoPlay={true}

                    transitionDuration={700}

                >

                    <div><img src={images1} alt="" /></div>
                    <div><img src={images2} alt="" /></div>
                    <div><img src={images3} alt="" /></div>

                </Carousel>
            </section>

            <div className='aviso'>Imagens meramente ilustrativas</div>

            <section className='info'>
                <div className='entrega'>
                    <img className='carro' src={images4} />
                    <label className='vermelho'>ENTREGA PARA TODO O BRASIL</label>
                    <label className='txt'>de forma r??pida e eficiente</label>
                </div>


                <div className='entrega'>
                    <img className='carro' src={images5} />
                    <label className='vermelho'>PARCELE SUAS COMPRAS</label>
                    <label className='txt'>em at?? 6x sem juros</label>
                </div>

                <div className='entrega'>
                    <img className='carro' src={images6} />
                    <label className='vermelho'>PAGAMENTO VIA PIX OU BOLETO</label>
                    <label className='txt'>5% de desconto</label>
                </div>
            </section>

            <hr />

            <section className='marca'>
                <div >
                    <h1 className='titulo-marca'>Nossas Marcas</h1>
                </div>
            </section>


            <section className="page">

                <div> <img src={images7} alt="a" /> </div>
                <div> <img src={images8} alt="a" /> </div>
                <div> <img src={images9} alt="a" /> </div>
                <div> <img src={images10} alt="a" /> </div>
                <div> <img src={images11} alt="a" /> </div>
                <div> <img src={images12} alt="a" /> </div>

            </section>

            <section className='texto'>
                <div>
                    <h1 className='titulo'>Samurai's SkateShop</h1>
                    <label className='subtitulo'>A sua skateshop online, com os melhores pre??os nos produtos das grandes marcas do skate mundial.</label>
                </div>
            </section>

            <section className='part5'>

                <div className='imgs'>
                    <Link to='/consultarskate'>
                        <img className='skateimg' src={images13}/>
                        <p></p>
                        <label className='skate'>
                            <li>
                                Skates
                            </li>
                        </label>
                    </Link>

                    <Link to='/consultarbone'>
                        <img className='bonesimg' src={images14}/>
                        <p></p>
                        <label className='bones'>
                            <li>
                                Bon??s
                            </li>
                        </label>
                    </Link>

                    <Link to='/consultartenis'>
                        <img className='tenisimg' src={images15}/>
                        <p></p>
                        <label className='tenis'>
                            <li>
                                T??nis
                            </li>
                        </label>
                    </Link>
                </div>

            </section>

            <Rodape />

        </main>
    );
}