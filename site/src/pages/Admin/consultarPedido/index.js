import "./index.scss";

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';
import { useEffect, useState } from "react";
import { ListarPedidosAdm } from "../../../api/PedidoAdminAPI";

export default function PageCadastrarProduto(){
    const [pedido, setPedido] = useState([]);

    async function CarregarPedidos(){
        const resp = await ListarPedidosAdm()
        setPedido(resp)
    }

    useEffect(() => {
        CarregarPedidos()
    }, [])

    return(
        <main className="page-consultar-pedido">

            <div className="comps">
                <Cabecalho />
                <Navs selecionado='pedido-adm'/>
            </div>

            <section className="section-cards-pedidos">
                {pedido.map(item =>
                    <div className="card-pedido">
                        <div className="div-1">
                            <div className="div-letra-nome">
                                <text> {item.nome[0]} </text>
                            </div>

                            <div className="div-nome">
                                <p> {item.nome} {item.sobrenome} </p>
                            </div>

                            <div className="div-data-pedido">
                                <text> {item.data} </text>
                            </div>
                        </div>

                        <div className="div-2">
                            <div className="div-status">
                                <p> Status: {item.status} </p>
                            </div>

                            <button className="btn-ver-pedido">
                                Ver Pedido
                            </button>
                        </div>
                    </div>
                )}
            </section>

        </main>
    );
}