import './index.scss'

export default function ConsultarTenis(){

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

                        <button>
                            ADICIONAR CARTÃO DE CRÉDITO
                        </button>

                        <div className="cartao-credito">
                            <div className="cartao-infos">
                                <p> Número do cartão </p>
                                <p> Nome do cartão </p>
                                <p> Vencimento </p>
                                <p> Código de segurança (CVV) </p>
                            </div>

                            <div className="cartao-inputs">
                                <input type="number"/>
                                <input type="number"/>
                                <input type="number"/>
                                <input type="number"/>
                                <label className="container">
                                    <br/>
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    Usar como meu pagamento padrão
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
            </aside>
        </main>
    )
}