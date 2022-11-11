import "./index.scss";

import { toast } from "react-toastify"

import Storage from "local-storage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';
import { Listar } from "../../../api/PedidoAdminAPI";

export default function PageCadastrarProduto(){
    const [pedido, setPedido] = useState([]);
    
    const navigate = useNavigate()

    async function CarregarPedidos(){
        const resp = await Listar()
        setPedido(resp)
    }

    function AbrirDetalhes(id) {
        navigate(`/detalhe/pedido/admin/${id}`)
    }

    useEffect(() => {
        if(!Storage('admin-logado') || Storage('admin-logado').length === 0) {
            toast.dark('Área apenas para administradores')
            navigate('/')
        }

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

                            <button className="btn-ver-pedido"
                                    onClick={() => AbrirDetalhes(item.id)}
                            >
                                Ver Pedido
                            </button>
                        </div>
                    </div>
                )}
            </section>

        </main>
    );
}