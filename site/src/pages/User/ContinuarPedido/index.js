import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Storage from 'local-storage'
import './index.scss'


import { Listar } from '../../../api/EnderecoAPI'
import CardEndereco from '../../components/cardEndereco';
import ModalEndereco from '../../components/ModalEndereco';

export default function ContinuarPedido(){
    const navigate = useNavigate();

    const [mostrar, setMostrar] = useState(false);

    const [exibirEndereco, setExibirEndereco] = useState(false);
    const [enderecos, setEnderecos] = useState([]);
    const [idEndereco, setIdEndereco] = useState();

    function ExibirCardClick(){
        setMostrar(true);
    }

    function OcultarCardClick(){
        setMostrar(false)
    }

    function exibirNovoEndereco() {
        setExibirEndereco(true);
    }

    function fecharNovoEndereco() {
        setExibirEndereco(false);
        carregarEnderecos();
    }

    async function carregarEnderecos(){
        const id = Storage('usuario-logado').id;
        const r = await Listar(id);
        console.log(r);
        setEnderecos(r);
    }

    useEffect(() =>{
        carregarEnderecos();
        if(!Storage("usuario-logado")){
            navigate('/Login')
        }
    },[])

    return(
        <main className='main-continuarPedido'>
            <ModalEndereco exibir={exibirEndereco} fechar={fecharNovoEndereco} />

            <header className="header-pedido">
                <img src="/images/logo.png" alt="" width="200" height="200" style={{ marginLeft: 40 }}/>

                <div className="div-finalizarpedido">
                    <text> Total: </text>
                    <span> R$ 1029,90 </span>

                    <button> Finalizar Pedido </button>
                </div>
            </header>

            <aside className="aside-lado-a-lado">
                <section className="sec-enderecos">
                    <p> Endereços </p>

                    <div className='card-endereco-row'>
                        {enderecos.map(item =>
                            <CardEndereco item={item} selecionar={setIdEndereco} selecionado={item.id == idEndereco} />
                        )}
                    </div>

                    <div className="div-button">
                        <button onClick={exibirNovoEndereco}> NOVO ENDEREÇO </button>
                    </div>
                </section>

                <section className="sec-pagamento">
                    <div className="div-boleto">
                        <h2> Boleto </h2>

                        <div className="boleto">
                            <input type="checkbox"/>
                            <img src="../images/boleto.png" alt=""/>
                            <text> Vencimento em 1 dia útil. A data de entrega será alterada devido ao tempo de processamento do Boleto. Veja mais na próxima página. </text>
                        </div>
                    </div>

                    <div className="div-pix">
                        <h2> Pix </h2>

                        <div className="pix">
                            <input type="checkbox"/>
                            <img src="../images/pix-rodape.png" alt=""/>
                            <text> Vencimento em 30 minutos. Após o pagamento seu pedido será processado.</text>
                        </div>
                    </div>

                    <div className="div-cartao-credito">
                        <h2> Cartões de Crédito </h2>
                        
                        {mostrar === true &&
                            <button onClick={OcultarCardClick}>
                                ADICIONAR CARTÃO DE CRÉDITO
                            </button>
                        }

                        {mostrar === false &&
                            <button onClick={ExibirCardClick}>
                                ADICIONAR CARTÃO DE CRÉDITO
                            </button>
                        }

                        {mostrar === true &&
                            <div className="cartao-credito">
                                <div className="cartao-infos">
                                    <p className="cartao-p-1"> Número do cartão </p>
                                    <p> Nome do cartão </p>
                                    <p> Vencimento </p>
                                    <p> Código de segurança (CVV) </p>
                                </div>

                                <div className="cartao-inputs">
                                    <input type="number" id="input-1"/>
                                    <br/>
                                    <input type="text"   id="input-2"/>
                                    <br/>
                                    <input type="number" id="vencimento-dia"/>
                                    <input type="number" id="vencimento-ano"/>
                                    <br/>
                                    <input type="number" id="code-seg"/>
                                    <label className="container">
                                        <input type="checkbox"/>
                                        <span className="checkmark"></span>
                                        Usar como meu pagamento padrão
                                    </label>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </aside>
        </main>
    )
}