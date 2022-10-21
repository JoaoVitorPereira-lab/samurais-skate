import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BuscarProdutoPorID } from '../../../api/UsuarioApi';
import { API_URL } from '../../../api/config';
import './index.scss'

import Storage from 'local-storage'
import { toast } from 'react-toastify'

export default function ProdutoDetalhe() {

    const [produto, setProduto] = useState([]);

    const {id} = useParams();

    async function carregarPagina() {
        const r = await BuscarProdutoPorID(id);
        setProduto(r);
    }

    function adicionarAoCarrinho(){
        let carrinho = []
        if(Storage('carrinho')) {
            carrinho = Storage('carrinho');
        }
        if(!carrinho.find(item => item.id ==- id)){
            carrinho.push({
                id: id,
                qtd: 1
            })

            Storage('carrinho', carrinho);
        }

        toast.dark('Produto adicionado ao carrinho')
    }

    useEffect(() => {
        carregarPagina();
    }, [])

    return (
        <main>
            <div>
                <img src={API_URL + '/' + produto.imagem} alt="" />
                <p>{produto.nome}</p>
                <p>{produto.marca}</p>
                <p>{produto.preco}</p>
                <button onClick={adicionarAoCarrinho}>Adicionar ao carrinho</button>
                <p>{produto.descricao}</p>
            </div>
        </main>
    );
}