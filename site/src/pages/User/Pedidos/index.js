import './index.scss'

import Cabecalho from "../../components/cabecalho";
import Menu from "../../components/MenuConfig";
import Rodape from "../../components/rodape";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConsultarPedido } from "../../../api/UsuarioApi";
import Storage from 'local-storage';

export default function Compras() {
	const [pedido, setPedido] = useState([]);

    const navigate = useNavigate()

    async function CarregarPedidos(){
		const r = Storage('usuario-logado').id;
        const resp = await ConsultarPedido(r)
        setPedido(resp)
    }

    function AbrirDetalhes(idPedido, idUser) {
        navigate('/detalhe/pedido/' + idPedido + '/usuario/' + idUser)
    }

    useEffect(() => {
        CarregarPedidos();
    }, [])

	return (
		<main className="main-compras">
			<Cabecalho />

			<section className="sec-row">
				<Menu selecionado='pedidos'/>

				<section className='sec-card'>
					<div className='titulo-dados'>
                        <h1> Seus Pedidos </h1>
                        <span> Veja seus pedidos: </span>
                    </div>

					<div className="card-pedido">
						{pedido.map(item =>
							<div className="div-card">
								<section className="sec-1">
									<div className="esquerda-card">
										<div className="nome-pedido">
											<h2> Pedido de {item.nome} {item.sobrenome} </h2>
										</div>

										<div className="ver-pedido" onClick={() => AbrirDetalhes(item.id, item.idUser)}>
											<text> Ver pedido completo </text>
										</div>
									</div>

									<div className="direita-card">
										{item.status == "Pedido em Preparação" &&
											<div className="status-pedido">
												<img src="/images/em-preparacao.png" alt=""/>
												<h2> {item.status} </h2>
											</div>
										}

										{item.status == "Confirmando Pagamento" &&
											<div className="status-pedido">
												<img src="/images/confirm-pag.png" alt=""/>
												<h2> {item.status} </h2>
											</div>
										}

										{item.status == "Entregue" &&
											<div className="status-pedido">
												<img src="/images/entregue.png" alt=""/>
												<h2> {item.status} </h2>
												&nbsp; &nbsp;
												<img src="/images/estrela-vermelha.png" alt=""/>
												<h2> Avaliar </h2>
											</div>
										}


										{item.status == "Cancelado" &&
											<div className="status-pedido">
												<img src="/images/cancelado.png" alt=""/>
												<h2> {item.status} </h2>
											</div>
										}

										<div className="ver-pedido" onClick={() => AbrirDetalhes(item.id, item.idUser)}>
											<text> Ver Total </text>
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
									</div>
								</section>
							</div>
						)}
					</div>
				</section>
			</section>
			<Rodape />
		</main>
	);
}
