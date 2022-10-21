import "./index.scss";

import Cabecalho from '../../components/cabecalhoUser';
import Navs from '../../components/navs';
import Rodape from '../../components/rodape';

export default function Carrinho(){
    
    return(
        <main className="main-carrinho">
            <Cabecalho />

            <section className="sec-1">
                <p> Samurai’s Skate Shop </p>

                <div className="div-produto">
                    
                    <img src="../images/4.jpg" alt="" width="270" height="220"/>

                    <text> ROLAMENTO RED BONES</text>

                    <div>
                        <button> - </button>
                        <input type="number"/>
                        <button> + </button>
                    </div>

                    <span> R$ 199,90 </span>
                </div>

                <hr/>
            </section>


            <section className="sec-2">
                <div className="div-left">
                    <span> Frete </span>
                    <p> Valor fixo de R$ 20,00 </p>
                </div>

                <div className="div-right">
                    <text> Resumo do Pedido </text>
                    <hr/>
                    <div className="div-subtotal">
                        <span> SubTotal </span>
                        <span> R$ 1049,70 </span>
                    </div>

                    <div className="div-frete">
                        <span> Frete </span>
                        <span> R$ 20,00 </span>
                    </div>
                    <hr/>

                    <div className="div-total">
                        <span> Total do Pedido </span>
                        <div>
                            <text> R$ 1069,70 </text>
                            <p> R$ 997,215 no Boleto com desconto </p>
                            <p> ou 6x sem juros de R$ 174,95 no cartão de crédito </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sec-3">
                <button> Fechar Pedido </button>
            </section>

            <Rodape />
        </main>
    )
}