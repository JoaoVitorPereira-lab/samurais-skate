import { Link } from "react-router-dom";
import "./index.scss";

export default function Navs(props) {

    function verificarMenuSelecionado(menu){
        if (menu === props.selecionado)
            return 'selecionado';
        else
            return '';
    }

    return (
        <nav className="comp-navs">
            <div className="div-navs">
                <Link to='/cadastrarproduto' className={verificarMenuSelecionado('cadastrar-adm')}>
                    <div className="navs-produtos">
                        <img src="/images/cadastrar.png" className="imgs-nav" alt="" />
                        <span> Cadastrar </span>
                    </div>
                </Link>

                <Link to='/consultarproduto' className={verificarMenuSelecionado('consultar-produto-adm')}>
                    <div className="navs-produtos">
                        <img src="/images/skate.png" className="imgs-nav" alt="" />
                        <span> Produtos </span>
                    </div>
                </Link>

                <Link to='/consultarpedidos' className={verificarMenuSelecionado('pedido-adm')}>
                    <div className="navs-produtos">
                        <img src="/images/pedidos.png" className="imgs-nav" alt="" />
                        <span> Pedidos </span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}