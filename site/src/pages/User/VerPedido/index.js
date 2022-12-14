import './index.scss'
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Storage from 'local-storage'

import { API_URL } from '../../../api/config';
import { toast } from "react-toastify"

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { DetalhesPedido } from '../../../api/UsuarioApi';
import { AlterarStatus } from '../../../api/StatusAPI';

export default function VerPedido() {
    const [pedido, setPedido] = useState([]);
    const [status, setStatus] = useState('');
    const [aval, setAval] = useState(false);

    const navigate = useNavigate();
    const { idPedido, idUser } = useParams();
    

    function PegarStatus(){
        const stts = pedido.map(item => item.status);
        setStatus(stts)
    }

    async function CancelarPedido(id) {
        confirmAlert({
            title: 'Cancelar Pedido',
            message: `Deseja cancelar o pedido ${id}?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        await AlterarStatus(id, "Cancelado");

                        toast.dark('pedido cancelado com sucesso!');
                        navigate('/pedidos');
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

    function Voltar() {
        navigate('/pedidos')
    }

    async function CarregarDetalhePedido(){
        const resp = await DetalhesPedido(idPedido, idUser)
        setPedido(resp)
    }

    function calcularTotal() {
        let total = 0;
        for (let item of pedido) {
            total = total + Number(item.valor) * Number(item.qtd);
        }
        return total + 20;
    }

    function avaliar () {
        setAval(true)
    }

    useEffect(() => {
        CarregarDetalhePedido();
        PegarStatus();
    }, [status])

    console.log(pedido)

	return (
		<main className="main-verpedido">
			<Cabecalho />

			<section className="sec-row-2">
                <div className="tite">
                    <hr />
                    <h2> Detalhe do seu pedido: <span className="span-status"> {status[0]} </span> </h2>
                </div>
                
                    <div className='itens'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Data da Compra</th>
                                    <th>Valor Unitário</th>
                                    <th>Quantidade comprada</th>
                                    <th>Código do Produto</th>
                                    {status[0] == 'Entregue' &&
                                        <th>
                                          Avalie seu produto 
                                        </th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                            {pedido.map(item =>
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
                                        {item.qtd}
                                    </td>
                                    <td>
                                        #00{item.idProduto}
                                    </td>
                                    {item.status == 'Entregue' &&
                                        <td className='avaliar' onClick={() => navigate(`/avaliar/produto/${item.idProduto}/pedido/${idPedido}/usuario/${idUser}`)}>
                                          Avaliar  
                                        </td>
                                    }
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                
			</section>
            <div className="div-final">
                <text> Total: R$ {calcularTotal()} </text>

                <div className="div-btns">
                    {status != "Cancelado" &&
                        <button onClick={e => {
                                            e.stopPropagation();
                                            CancelarPedido(idPedido);
                                        }}
                        > 
                            Cancelar Pedido 
                        </button>
                    }
                    <button onClick={() => Voltar()}>
                        Voltar
                    </button>
                </div>
            </div>
			<Rodape />
		</main>
	);
}
