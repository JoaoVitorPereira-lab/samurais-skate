import './index.scss'
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import { API_URL } from '../../../api/config';
import { toast } from "react-toastify"

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { DetalhesPedido } from '../../../api/UsuarioApi';
import { AlterarStatus } from '../../../api/StatusAPI';

export default function VerPedido() {
    const [pedido, setPedido] = useState([]);
    const [status, setStatus] = useState('');

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
            total = total + Number(item.valor);
        }
        return total + 20;
    }

    useEffect(() => {
        CarregarDetalhePedido();
        PegarStatus();
    }, [status])

	return (
		<main className="main-verpedido">
			<Cabecalho />

			<section className="sec-row-2">
                <div className="tite">
                    <hr />
                    <h2> Detalhe do seu pedido: <span className="span-status"> {status} </span> </h2>
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
