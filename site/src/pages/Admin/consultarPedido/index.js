import "./index.scss";

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';

export default function PageCadastrarProduto(){

    return(
        <main className="page-consultar-pedido">

            <div className="comps">
                <Cabecalho />
                <Navs selecionado='pedido-adm'/>
            </div>

            <section className="section-cards-pedidos">
                <div className="card-pedido">
                    <div className="div-1">
                        <div className="div-letra-nome">
                            <text> B </text>
                        </div>

                        <div className="div-nome">
                            <p> Bruno Oliveira </p>
                        </div>

                        <div className="div-data-pedido">
                            <text> 11/09/22 </text>
                        </div>
                    </div>

                    <div className="div-2">
                        <div className="div-status">
                            <p> Status: Saiu para Entrega </p>
                        </div>

                        <button className="btn-ver-pedido">
                            Ver Pedido
                        </button>
                    </div>
                </div>
            </section>

        </main>
    );
}