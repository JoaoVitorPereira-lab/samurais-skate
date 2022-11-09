import './index.scss'

import Cabecalho from "../../components/cabecalho";
import Menu from "../../components/MenuConfig";
import Rodape from "../../components/rodape";

import Storage from "local-storage";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Listar } from "../../../api/PedidoAdminAPI";

export default function Compras() {
	const [pedido, setPedido] = useState([]);

    const navigate = useNavigate()

    async function CarregarPedidos(){
        const resp = await Listar()
        setPedido(resp)
    }

    function AbrirDetalhes(id) {
        navigate(`/verpedido/` + id)
    }

    useEffect(() => {
        CarregarPedidos()
    }, [])

	return (
		<main className="main-compras">
			<Cabecalho />

			<section className="sec-row">
				<Menu />

				<section className='sec-card'>
					{pedido.map(item =>
						<div className="div-card">
							<section className="sec-1">
								<div className="esquerda-card">
									<div className="nome-pedido">
										<h2> Pedido de Bruno de Oliveira </h2>
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

									<div className="valor-pedido">
										<text> R$239,90 </text>
									</div>
								</div>
							</section>

							<section className="sec-2">
								<div className="div-2">
									<hr/>
								</div>

								<div className="div-dir">
									<div className="div-chegara">
										<text> O produto deve chegar em 00/00/00 </text>
									</div>

									<div className="div-total-cancelar">
										<text> Total do pedido:  &nbsp; <span> R$ 239,90 </span> </text>
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
