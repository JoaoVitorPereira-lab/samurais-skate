import storage from 'local-storage'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.scss";

export default function CabecalhoUsuarioNavs(props) {

    const navigate = useNavigate()

    function TenisClick(){
        navigate('/ConsultarTenis')
        
        setTimeout(() => {
            navigate('/'); 
        }, 3000);
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
    

    return (
        <main className="header-container">

            <div className="div-logo">

                <div>
                    <img onClick={HomeClick} src="/images/logo-branco.gif" width="128px" height="128px" alt=""/>
                </div>

                <div className="infos">
                    <img src="/images/lua.png" width="40px" alt=""/>

                    {storage('usuario-logado') && 
                        <img onClick={FavoritosClick} src="/images/favoritos.png" width="40px" alt=""/>
                    }

                    {!storage('usuario-logado') &&
                        <img onClick={Login} src="/images/favoritos.png" width="40px" alt=""/>
                    }

                    {storage('usuario-logado') &&
                        <img onClick={SairClick} src="/images/User-logado.png" alt="" width='40px' />
                    }

                    {!storage('usuario-logado') &&
                        <img onClick={Login} src="/images/teste-entrar 1.png" width="40px" alt=""/>
                    }

                    {!storage('usuario-logado') &&
                        <img onClick={Login} src="/images/carrinho.png" width="40px" alt=""/>
                    }

                    {storage('usuario-logado') &&
                        <img onClick={CarrinhoClick} src="/images/carrinho.png" width="40px" alt=""/>
                    }
                </div>

            </div>

            <nav className="navs-container">
                <div className="div-navs">
                    <Link to='/consultartenis' className={verificarMenuSelecionado('skate')}>
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

                    <Link to='/consultartenis' className={verificarMenuSelecionado('bone')}>
                        <div className="navs-produtos">
                            <img src="/images/bone.png" className="imgs-nav" alt=""/>
                            <span> Boné </span>
                        </div>
                    </Link>

                    <Link to='/consultartenis' className={verificarMenuSelecionado('acessorios')}>
                        <div className="navs-produtos">
                            <img src="/images/acessorios.png" className="imgs-nav" alt=""/>
                            <span> Acessórios </span>
                        </div>
                    </Link>

                    <Link to='/consultartenis' className={verificarMenuSelecionado('promocao')}>
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
        </main>

  );
}