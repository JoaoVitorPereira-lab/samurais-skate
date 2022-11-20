import { API_URL } from '../../../api/config'
import { useState } from 'react'
import Storage from 'local-storage'

import './index.scss'

export default function Carrinho({ item: { produto: { id, nome, preco, imagem }, qtd, tamanho } }) {
    const [qtdProduto, setQtdProduto] = useState(qtd);

    const t = tamanho;
    console.log(t)

    function alterarQuantidade(novaQtd) {
        setQtdProduto(novaQtd);

        let carrinho = Storage('carrinho');
        let itemStorage = carrinho.find(item => item.id == id);
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
            <div className='div-img-produto'>   
                <img src={exibirImagem()} alt="" className='img-produto'/>
            </div>

            <div className='div-infos-carrinho-item'>
                <text className='nome-produto'> {nome} </text>

                <select className='select-carrinho-item' onChange={e => alterarQuantidade(e.target.value)} value={qtdProduto}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>

                {tamanho &&
                    <span className='span-tamanho'> tamanho: {tamanho} </span>
                }

                <span className='preco-produto'> {preco.replace(".", ",")} </span>
            </div>
        </div>
    )
}