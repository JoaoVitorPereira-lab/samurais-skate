import "./index.scss";

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';

import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import Storage from "local-storage";
import { useNavigate } from "react-router-dom";

import { ListarPedidosAdm } from "../../../api/PedidoAdminAPI";

export default function PageCadastrarProduto(){
    const [pedido, setPedido] = useState([]);

    const navigate = useNavigate();

    async function CarregarPedidos(){
        const resp = await ListarPedidosAdm()
        setPedido(resp)
    }

    useEffect(() => {
        if(!Storage('admin-logado') || Storage('admin-logado').length === 0) {
            toast.dark('Área apenas para administradores')
            navigate('/')
        }
        
        CarregarPedidos()
    }, [])

    return(
        <main className="page-detalhe-pedido">

            <div className="comps">
                <Cabecalho />
                <Navs selecionado='pedido-adm'/>
            </div>

            <div className="tite">
                <hr />
                <h2> Pedido do <span> Bruno Oliveira </span> </h2>
            </div>

            <div className='itens'>
                <table>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Data da Compra</th>
                            <th>Valor</th>
                            <th>Código do Produto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className='celula-item'>
                                    <img src="/images/logo.png" />
                                    <div>
                                        <h3> asdasdasd </h3>
                                    </div>
                                </div>
                            </td>
                            <td>
                                20
                            </td>
                            <td>
                                R$ 20
                            </td>
                            <td>
                                R$ 400,00
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>

            <div className="div-final">
                <text> Total: R$200,00 </text>

                <div className="div-btns">
                    <button> Cancelar Pedido </button>
                    <button> Alterar Status </button>
                </div>
            </div>

        </main>
    );
}