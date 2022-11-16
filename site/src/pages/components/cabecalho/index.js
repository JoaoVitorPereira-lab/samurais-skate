import "./index.scss";
import storage from 'local-storage';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export default function CabecalhoUsuarioNavs(props) {
    const [usuario,setUsuario] = useState('');
    const [email,setEmail] = useState('');
    const [popup, setPopUp] = useState(false)

    const navigate = useNavigate()

    function TenisClick(){
        navigate('/ConsultarTenis');
    }

    function MostrarPopUp(){
        setPopUp(true)
    }
    function OcultarPopUp(){
        setPopUp(false)
    }

    function ConfigClick(){
        navigate('/Config')
    }

    function PedidosClick(){
        navigate('/pedidos')
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

    function verificarMenuSelecionado(menu){
        if (menu === props.selecionado)
            return 'selecionado';
        else
            return '';
    }
    
    useEffect(() =>{
        if(storage('usuario-logado')){
            const nome = storage('usuario-logado')
            setUsuario(nome.nome)
            setEmail(nome.Email)
        }
    },[])

    return (
        <main className="header-container" id="inicio">

            <div className="div-logo">

                <div className="div-img-logo">
                    <img onClick={HomeClick} src="/images/logo-branco.gif" alt="" className='img-logo'/>
                </div>

                <div className="infos">

                    {!storage('usuario-logado') && 
                        <img onClick={Login} src="/images/favoritos.png" alt=""/>
                    }

                    {storage('usuario-logado') &&
                        <img onClick={FavoritosClick} src="/images/favoritos.png"  alt=""/>
                    }

                    {storage('usuario-logado') && popup === false &&
                        <div className='bolinha' onClick={MostrarPopUp}>
                            <h2> {usuario.toUpperCase()[0]} </h2>
                        </div>                    
                    }

                    {popup === true &&
                        <div className="div-popup"> 
                            <div className='bolinha' onClick={OcultarPopUp}>
                                <h2> {usuario.toUpperCase()[0]}  </h2>
                            </div>
                            <div className='container-popUp'>
                                
                                <div className='sair-popUp' onClick={SairClick}>
                                    <div className='bolinha' >
                                        <text> {usuario.toUpperCase()[0]} </text>
                                    </div>

                                    <div className='email'>
                                        <h2> {email} </h2>
                                        <text className="trocar-usuario"> Trocar Usuário </text>
                                    </div>
                                </div>
                                
                                <div className='sair-popUp' onClick={ConfigClick}>

                                    <div className='img-config-popUp'>
                                        <img src="/images/Services.png" alt="" />
                                    </div>

                                    <div className="div-right">
                                        <h2 className='config-popUp' > Configuração </h2>
                                    </div>
                                </div>

                                <div className='sair-popUp div-pedidos' onClick={PedidosClick}>

                                    <div className='img-pedidos-popUp'>
                                        <img src="/images/Shopping Bag Full.png" alt="" />
                                    </div>

                                    <div className='pedidos-popUp div-right'>
                                        <h2> Pedidos </h2>
                                    </div>

                                </div>
                            </div>                        
                        </div>
                    }

                    {!storage('usuario-logado') && popup === false &&
                        <img onClick={Login} src="/images/teste-entrar 1.png" alt=""/>
                    }

                    {!storage('usuario-logado') &&
                        <img onClick={Login} src="/images/carrinho.png" alt=""/>
                    }

                    {storage('usuario-logado') &&
                        <img onClick={CarrinhoClick} src="/images/carrinho.png" alt=""/>
                    }
                </div>

            </div>

            <nav className="navs-container-grande">
                <div className="div-navs">
                    <Link to='/consultarskate' className={verificarMenuSelecionado('skate')}>
                        <div className="navs-produtos not">
                            <img src="/images/skate.png" className="imgs-nav" alt=""/>
                            <span> Skate </span>
                        </div>
                    </Link>

                    <Link to='/consultartenis' className={verificarMenuSelecionado('tenis')}>
                        <div className="navs-produtos" onClick={TenisClick}>
                            <img src="/images/tenis.png" className="imgs-nav" alt=""/>
                            <span> Tênis </span>
                        </div>
                    </Link>

                    <Link to='/consultarbone' className={verificarMenuSelecionado('bone')}>
                        <div className="navs-produtos">
                            <img src="/images/bone.png" className="imgs-nav" alt=""/>
                            <span> Boné </span>
                        </div>
                    </Link>

                    <Link to='/consultaracessorios' className={verificarMenuSelecionado('acessorios')}>
                        <div className="navs-produtos">
                            <img src="/images/acessorios.png" className="imgs-nav" alt=""/>
                            <span> Acessórios </span>
                        </div>
                    </Link>

                    <Link to='/promocoes' className={verificarMenuSelecionado('promocoes')}>
                        <div className="navs-produtos">
                            <img src="/images/promocoes.png" className="imgs-nav" alt=""/>
                            <span> Promoções </span>
                        </div>
                    </Link>
                </div>

                <div className="div-buscar">
                    <input type="text" className="buscar-input" placeholder="Buscar" value={props.value} onChange={props.change} />
                    <div>
                        <img src="/images/buscar.png" className="buscar-img" alt="" onClick={Search} />
                    </div>
                </div>
            </nav>
            
            <nav className="navs-container-pequena">
                <div className="div-navs">
                    <Menu pageWrapId={"page-wrap"} outerContainerId={"App"} className="aa">
                        <Link to='/consultarskate' className={verificarMenuSelecionado('skate')}>
                            <div className="navs-produtos not">
                                <img src="/images/skate.png" className="imgs-nav" alt=""/>
                                <span> Skate </span>
                            </div>
                        </Link>

                        <Link to='/consultartenis' className={verificarMenuSelecionado('tenis')}>
                            <div className="navs-produtos" onClick={TenisClick}>
                                <img src="/images/tenis.png" className="imgs-nav" alt=""/>
                                <span> Tênis </span>
                            </div>
                        </Link>

                        <Link to='/consultarbone' className={verificarMenuSelecionado('bone')}>
                            <div className="navs-produtos">
                                <img src="/images/bone.png" className="imgs-nav" alt=""/>
                                <span> Boné </span>
                            </div>
                        </Link>

                        <Link to='/consultaracessorios' className={verificarMenuSelecionado('acessorios')}>
                            <div className="navs-produtos">
                                <img src="/images/acessorios.png" className="imgs-nav" alt=""/>
                                <span> Acessórios </span>
                            </div>
                        </Link>

                        <Link to='/consultarPromocoes' className={verificarMenuSelecionado('promocoes')}>
                            <div className="navs-produtos">
                                <img src="/images/promocoes.png" className="imgs-nav" alt=""/>
                                <span> Promoções </span>
                            </div>
                        </Link>
                    </Menu>
                </div>
                

                <div className="div-buscar">
                    <input type="text" className="buscar-input" placeholder="Buscar" onChange={props.change} />
                    <div>
                        <img src="/images/buscar.png" className="buscar-img" alt="" onClick={Search} />
                    </div>
                </div>
            </nav>

        </main>

  );
}