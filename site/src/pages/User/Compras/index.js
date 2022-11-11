import './index.scss'

import Cabecalho from "../../components/cabecalho";
import Menu from "../../components/MenuConfig";
import Rodape from "../../components/rodape";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Detalhes, Listar } from "../../../api/PedidoAdminAPI";

export default function Compras() {
	const [pedido, setPedido] = useState([]);
	const [valor, setValor] = useState([]);

    const navigate = useNavigate()

    async function CarregarPedidos(){
        const resp = await Listar()
        setPedido(resp)
    }

    function AbrirDetalhes(id) {
        navigate(`/detalhe/pedido/usuario/${id}`)
    }

	function calcularTotal() {
        let total = 0;
        for (let item of valor) {
            total = total + Number(item.valor);
        }
        return total + 20;
    }

    useEffect(() => {
        CarregarPedidos();
    }, [])

	return (
		<main className="main-compras">
			<Cabecalho />

			<section className="sec-row">
				<Menu />

				<section className='sec-card'>
					{pedido.length == 0 &&
						<div>
							<p> loremsad asdasd asd asd asd as as dasdasdasda asd sadasd asd </p>
						</div>
					}
					{pedido.map(item =>
						<div className="div-card">
							<section className="sec-1">
								<div className="esquerda-card">
									<div className="nome-pedido">
										<h2> Pedido de {item.nome} {item.sobrenome} </h2>
									</div>

									<div className="ver-pedido" onClick={() => AbrirDetalhes(item.id)}>
										<text> Ver pedido completo </text>
									</div>
								</div>

								<div className="direita-card">
									<div className="status-pedido">
										<img src="/images/em-preparacao.png" alt=""/>
										<h2> Aguardando Pagamento </h2>
									</div>

									<div className="ver-pedido" onClick={() => AbrirDetalhes(item.id)}>
										<text> Ver Valor </text>
									</div>
								</div>
							</section>

							<section className="sec-2">
								<div className="div-2">
									<hr/>
								</div>

								<div className="div-dir">
									<div className="div-chegara">
										<text> O produto pedido dia {item.data} </text>
									</div>

									<div className="div-total-cancelar">
										<button className="btn-cancelar"> Cancelar pedido </button>
									</div>
								</div>
							</section>
						</div>
						
					)}
				</section>
			</section>
			<Rodape />
		</main>
	);
}
