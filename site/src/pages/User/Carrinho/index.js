import "./index.scss";

import Storage from 'local-storage'
import { BuscarPorID } from '../../../api/AdminAPI'
import Carrinho from '../../components/carrinhoItem'

import Cabecalho from '../../components/cabecalhoUser';
import Navs from '../../components/navs';
import Rodape from '../../components/rodape';
import { useEffect, useState } from "react";

export default function PageCarrinho(){
    const [itens, setItens] = useState([]);
    const [subTotal, setSubTotal] = useState();

    async function CarregarCarrinho(){
        let carrinho = Storage('carrinho');
        if (carrinho) {
            let temp = [];

            for (let produto of carrinho){
                let p = await BuscarPorID(produto.id);
                temp.push(...itens, {
                    produto: p,
                    qtd: produto.qtd
                })
            }
            setItens(temp);
        }
    }

    useEffect(() => {
        CarregarCarrinho();
    }, [])
    
    return(
        <main className="main-carrinho">
            <Cabecalho />

            <section className="sec-1">
                <p> Samurai’s Skate Shop </p>

                {itens.map(item =>
                    <Carrinho item={item} />
                )}
                
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