import { API_URL } from '../../../api/config'
import { useState } from 'react'

import './index.scss'

export default function Carrinho({ item: { produto: { nome, preco, imagem }, qtd } } ) {
    const [qtdProduto, setQtdProduto] = useState(qtd);

    function alterarQuantidade(novaQtd) {
        setQtdProduto(novaQtd);
        
        let carrinho = Storage('carrinho');
        let itemStorage = carrinho.find(item => item.id == item.produto.id);
        itemStorage.qtd = novaQtd;

        Storage('carrinho', carrinho);
    }

    function exibirImagem() {
        if (imagem) {
            return API_URL + '/' + imagem; 
        }
    }

    return (
        <div className="div-produto">        
            <img src={exibirImagem()} alt="" width="270" height="220"/>

            <text> {nome} </text>

            <select onChange={e => alterarQuantidade(e.target.value)} value={qtdProduto}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>

            <span> {preco} </span>

            <div> 
                Excluir
            </div>
        </div>
    )
}