import "./index.scss";

import Storage from 'local-storage'
import { toast } from 'react-toastify'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BuscarPorIDCarrinho } from '../../../api/CarrinhoAPI'
import Carrinho from '../../components/carrinhoItem'

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';

export default function PageCarrinho(){
    const [itens, setItens] = useState([]);

    const navigate = useNavigate();

    function qtdItens() {
        return itens.length;
    }

    async function CarregarCarrinho(){
        let carrinho = Storage('carrinho');
        if (carrinho) {
            let temp = [];

            for (let produto of carrinho){
                let p = await BuscarPorIDCarrinho(produto.id);
                temp.push({
                    produto: p,
                    qtd: produto.qtd
                })
            }
            setItens(temp);
        }
    }

    function calcularValorTotal() {
        let total = 0;
        for (let item of itens) {
            total = total + item.produto.preco * item.qtd;
        }
        return total + 20;
    }

    function removerItem(id) {
        let carrinho = Storage('carrinho');
        carrinho = carrinho.filter(item => item.id != id);

        Storage('carrinho', carrinho);
        if(!Storage('carrinho') || Storage('carrinho').length === 0){
            toast.error('Carrinho vazio, coloque um item no carrinho')
            navigate('/')
        }
        else{
            CarregarCarrinho();
        }
    }

    // function remover() {
    //     removerItem(itens.id);
    // }

    function calcularSubtotal() {
        let t = 0;
        for (let item of itens){
            t = t + item.produto.preco * item.qtd;
        }
        return t;
    }

    useEffect(() => {
        if(!Storage('carrinho') || Storage('carrinho').length === 0){
            toast.error('Carrinho vazio, Coloque um item no carrinho')
            navigate('/')
        }
        else{
            CarregarCarrinho();
        }
    }, [])
    
    return(
        <main className="main-carrinho">
            <Cabecalho />

            <section className="sec-1">
                <p> Samurai’s Skate Shop </p>

                {itens.map(item =>
                    <div className="excluir">
                        <Carrinho item={item} />
                        <div onClick={() => removerItem(item.produto.id)} className="botao-excluir">
                            Excluir
                        </div>
                    </div>
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
                        <span> R$ {calcularSubtotal()} </span>
                    </div>

                    <div className="div-frete">
                        <span> Frete </span>
                        <span> R$ 20,00 </span>
                    </div>

                    <div className="div-frete">
                        <span> Quantidade de itens </span>
                        <span> ({qtdItens()} Itens) </span>
                    </div>
                    <hr/>

                    <div className="div-total">
                        <span> Total do Pedido </span>
                        <div>
                            <text> R$ {calcularValorTotal()} </text>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sec-3">
                <button onClick={async () => {
                        try {
                            navigate("/ContinuarPedido")
                        } catch (err) {
                                
                        }
                    }}> Fechar Pedido </button>
            </section>

            <Rodape />
        </main>
    )
}

/*
    <p> R$ 997,215 no Boleto com desconto </p>
    <p> ou 6x sem juros de R$ 174,95 no cartão de crédito </p>
*/