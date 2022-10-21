import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import storage from 'local-storage'
import './index.scss'


import { Listar } from '../../../api/EnderecoAPI'
import CardEndereco from '../../components/cardEndereco';


export default function ContinuarPedido(){
    const navigate = useNavigate();

    const [mostrar, setMostrar] = useState(false);

    const [enderecos, setEnderecos] = useState([]);

    function ExibirCardClick(){
        setMostrar(true);
    }

    async function carregarEnderecos(){
        const id = Storage('usuario-logado').id;
        const r = await Listar(id);
        setEnderecos(r);
    }

    useEffect(() =>{
        carregarEnderecos();
    }, [])

    useEffect(() =>{
        if(!storage("usuario-logado")){
            navigate('/Login')
        }
    },[])

    function OcultarCardClick(){
        setMostrar(false)
    }

    return(
        <main className='main-continuarPedido'>
            <header className="header-pedido">
                <img src="../images/logo.png" alt="" width="200" height="200" style={{ marginLeft: 40 }}/>

                <div className="div-finalizarpedido">
                    <text> Total: </text>
                    <span> R$ 1029,90 </span>

                    <button> Finalizar Pedido </button>
                </div>
            </header>

            <aside className="aside-lado-a-lado">
                <section className="sec-enderecos">
                    <p> Endereços </p>

                    {enderecos.map(item =>
                        <CardEndereco item={item} />
                    )}

                    <div className="containers-endereco">
                        <div className="div-endereco">
                            <p className="p-1"> Casa </p>
                            <text> Av. Coronel Octaviano de Freitas Costa, 463 - Frei </text>
                            <p> 04773-000 - São Paulo/SP </p>
                        </div>

                        <div className="div-endereco">
                            <p className="p-1"> Casa </p>
                            <text> Av. Coronel Octaviano de Freitas Costa, 463 - Frei </text>
                            <p> 04773-000 - São Paulo/SP </p>
                        </div>

                        <div className="div-endereco">
                            <p className="p-1"> Casa </p>
                            <text> Av. Coronel Octaviano de Freitas Costa, 463 - Frei </text>
                            <p> 04773-000 - São Paulo/SP </p>
                        </div>
                    </div>

                    <div className="div-button">
                        <button> NOVO ENDEREÇO </button>
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