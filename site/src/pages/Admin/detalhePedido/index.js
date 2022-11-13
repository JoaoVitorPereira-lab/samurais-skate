import "./index.scss";

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';
import ModalStatus from "../../components/ModalStatus";

import { useEffect, useState } from "react";
import { API_URL } from '../../../api/config';
import { toast } from "react-toastify"
import Storage from "local-storage";
import { useNavigate, useParams } from "react-router-dom";

import { Detalhes, InfoUser } from "../../../api/PedidoAdminAPI";

export default function PageDetalheProduto(){
    const [pedido, setPedido] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [status, setStatus] = useState(false);
    const [exibirStatus, setExibirStatus] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    function PegarStatus(){
        const stts = pedido.map(item => item.status);
        setStatus(stts)
    }

    async function CarregarDetalhePedido(){
        const resp = await Detalhes(id)
        setPedido(resp)
    }

    async function CarregarUsuario(){
        const resp = await InfoUser(id)
        setUsuario(resp)
    }

    function calcularTotal() {
        let total = 0;
        for (let item of pedido) {
            total = total + Number(item.valor);
        }
        return total + 20;
    }

    function Voltar() {
        navigate('/consultarpedidos')
    }

    function exibirNovoStatus() {
        setExibirStatus(true);
    }

    function fecharNovoStatus() {
        setExibirStatus(false);
    }

    useEffect(() => {
        if(!Storage('admin-logado') || Storage('admin-logado').length === 0) {
            toast.dark('Área apenas para administradores')
            navigate('/')
        }
        
        CarregarUsuario();
        CarregarDetalhePedido();
        PegarStatus();
    }, [status])

    return(
        <main className="page-detalhe-pedido">
            <ModalStatus exibir={exibirStatus}  fechar={fecharNovoStatus} id={id}/>

            <div className="comps">
                <Cabecalho />
                <Navs selecionado='pedido-adm'/>
            </div>

            <div className="tite">
                <hr />
                {usuario.map(item =>
                    <h2> Pedido do <span> {item.nome} {item.sobrenome} </span> </h2>
                )}
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
                                    #00{item.idProduto}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            )}

            <div className="div-final">
                <text> Total: R$ {calcularTotal()} </text>

                <div className="div-btns">
                    {status != "Cancelado" &&
                        <button onClick={exibirNovoStatus}>
                            Alterar Status
                        </button>
                    }
                    <button onClick={() => Voltar()}>
                        Voltar
                    </button>
                </div>
            </div>

        </main>
    );
}