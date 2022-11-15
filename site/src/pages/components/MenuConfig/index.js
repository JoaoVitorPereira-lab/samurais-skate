import "./index.scss";
import { Link } from "react-router-dom";

export default function Menu(props) {

    function verificarMenuSelecionado(menu){
        if (menu === props.selecionado)
            return 'selecionado';
        else
            return '';
    }

    return (
        <main className="main-config">
            <div className="titulo">
                <h3> Meu Perfil </h3>
            </div>

            <div className="infos-div">
                <Link to='/pedidos' className={verificarMenuSelecionado('pedidos')}>
                    <div className="compras-config">
                        <div>
                            <img src="/images/Wallet.png" alt="" />
                        </div>
                        <div className="div-texto">
                            <label> Pedidos </label>
                        </div>
                    </div>
                </Link>

                <Link to='/Dados' className={verificarMenuSelecionado('dados')}>
                    <div className="compras-config">
                        <div>
                            <img src="/images/dados.png" alt="" />
                        </div>
                        <div className="div-texto">
                            <label> Meus Dados </label>
                        </div>
                    </div>
                </Link>

                <Link to='/cartoes' className={verificarMenuSelecionado('cartoes')}>
                    <div className="compras-config">
                        <div>
                            <img src="/images/Credit Card.png" alt="" />
                        </div>
                        <div className="div-texto">
                            <label> Cartões </label>
                        </div>
                    </div>
                </Link>

                <Link to='/endereco' className={verificarMenuSelecionado('endereco')}>
                    <div className="compras-config">
                        <div>
                            <img src="/images/Location.png" alt="" />
                        </div>
                        <div className="div-texto">
                            <label> Endereço </label>
                        </div>
                    </div>
                </Link>

                <Link to='/CentralAjuda' className={verificarMenuSelecionado('ajuda')}>
                    <div className="compras-config">
                        <div>
                            <img src="/images/Online Support.png" alt="" />
                        </div>
                        <div className="div-texto">
                            <label> Central de Ajuda </label>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="linha-config">
            </div>
        </main>
    );
}
