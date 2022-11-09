import './index.scss'
import Cabecalho from "../../components/cabecalho";
import Menu from "../../components/MenuConfig";
import Rodape from "../../components/rodape";

import { API_URL } from '../../../api/config';
import { Detalhes } from "../../../api/PedidoAdminAPI";
import { toast } from "react-toastify"
import Storage from 'local-storage';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Compras() {
    const [pedido, setPedido] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    async function CarregarDetalhePedido(){
        const resp = await Detalhes(id)
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
        if(!Storage('admin-logado') || Storage('admin-logado').length === 0) {
            toast.dark('Área apenas para administradores')
            navigate('/')
        }
        
        CarregarDetalhePedido();
    }, [])

	return (
		<main className="main-compras">
			<Cabecalho />

			<section className="sec-row">
				<Menu />

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
			<Rodape />
		</main>
	);
}
