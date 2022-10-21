import React, { useEffect } from "react";
import "./index.scss";
import storage from 'local-storage'
import { useNavigate } from "react-router-dom";

export default function App(props) {

    const navigate = useNavigate()

    function TenisClick(){
        navigate('/ConsultarTenis')
    }

    function HomeClick(){
        navigate('/')
    }

    function CarrinhoClick(){
        navigate('/carrinho')
    }

    function FavoritosClick(){
        navigate('/favoritos')
    }

    function Search ( ) {
        return props.click;
    }

    function SairClick(){
        storage.remove('usuario-logado')
        navigate('/Login')
    }

    function Login (){
        navigate('/Login')
    }

    

  return (
    
    <main className="header-container">

        <div className="div-logo">

            <div>
            <img onClick={HomeClick} src="../images/logo.png" width="124.8px" alt=""/>
            </div>

            <div className="infos">
                <img src="../images/lua.png" width="40px" alt=""/>

                {storage('usuario-logado') && 
                
                <img onClick={FavoritosClick} src="../images/favoritos.png" width="40px" alt=""/>
                
                }

                {!storage('usuario-logado') &&
                
                
                <img onClick={Login} src="../images/favoritos.png" width="40px" alt=""/>

                }


                {storage('usuario-logado') &&
                <img onClick={SairClick} src="../images/User-logado.png" alt="" width='40px' />
                }

                {!storage('usuario-logado') &&
                
                <img onClick={Login} src="../images/teste-entrar 1.png" width="40px" alt=""/>
                
                }

               {!storage('usuario-logado') &&
                
                <img onClick={Login} src="../images/carrinho.png" width="40px" alt=""/>
            }
                

                {storage('usuario-logado') &&
                 <img onClick={CarrinhoClick} src="../images/carrinho.png" width="40px" alt=""/>
                 }
            </div>

        </div>

        <nav className="navs-container">
            

            <div className="div-navs">
                <div className="navs-produtos not">
                    <img src="../images/skate.png" className="imgs-nav" alt=""/>
                    <span> Skate </span>
                </div>

                <div className="navs-produtos" onClick={TenisClick}>
                    <img src="../images/tenis.png" className="imgs-nav" alt=""/>
                    <span> Tênis </span>
                </div>

                <div className="navs-produtos">
                    <img src="../images/bone.png" className="imgs-nav" alt=""/>
                    <span> Boné </span>
                </div>

                <div className="navs-produtos">
                    <img src="../images/acessorios.png" className="imgs-nav" alt=""/>
                    <span> Acessórios </span>
                </div>

                <div className="navs-produtos">
                    <img src="../images/promocoes.png" className="imgs-nav" alt=""/>
                    <span> Promoções </span>
                </div>
            </div>

            <div className="div-buscar">
                <input type="text" className="buscar-input" placeholder="Buscar" value={props.value} onChange={props.change} />
                <div>
                    <img src="../images/buscar.png" className="buscar-img" alt="" onClick={Search} />
                </div>
            </div>

        </nav>
    </main>

  );
}