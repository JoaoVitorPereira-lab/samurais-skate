import "./index.scss";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';

import { useEffect, useState } from "react";
import { API_URL } from '../../../api/config';
import { toast } from "react-toastify"
import Storage from "local-storage";
import { useNavigate, useParams } from "react-router-dom";

import { Detalhes, Remover } from "../../../api/PedidoAdminAPI";

export default function PageCadastrarProduto(){
    const [pedido, setPedido] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();

    async function CarregarDetalhePedido(){
        const resp = await Detalhes(id)
        setPedido(resp)
    }

    async function DeletarPedido(id) {
        confirmAlert({
            title: 'Cancelar/Deletar Pedido',
            message: `Deseja cancelar/deletar o pedido ${id}?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        const resposta = await Remover(id);

                        toast.dark('pedido removido com sucesso!');
                        navigate('/consultarpedidos');
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

    useEffect(() => {
        if(!Storage('admin-logado') || Storage('admin-logado').length === 0) {
            toast.dark('Área apenas para administradores')
            navigate('/')
        }
        
        CarregarDetalhePedido();
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

            {pedido.map(item =>
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
                                        <img src={API_URL + '/' + item.imagem} />
                                        <div>
                                            <h3> {item.nome_produto} </h3>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.data}
                                </td>
                                <td>
                                    R$ {item.valor}
                                </td>
                                <td>
                                    {item.codigo}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            )}

            <div className="div-final">
                <text> Total: R$200,00 </text>

                <div className="div-btns">
                    <button onClick={e => {
                                        e.stopPropagation();
                                        DeletarPedido(id);
                                    }}
                    > 
                        Cancelar Pedido 
                    </button>
                    <button> Alterar Status </button>
                </div>
            </div>

        </main>
    );
}