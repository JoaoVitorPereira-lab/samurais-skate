import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BuscarProdutoPorID } from '../../../api/UsuarioApi';
import { API_URL } from '../../../api/config';
import './index.scss'

export default function ProdutoDetalhe() {

    const [produto, setProduto] = useState({});

    const {id} = useParams();

    async function carregarPagina() {
        const r = await BuscarProdutoPorID(id);
        setProduto(r);
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
                <button>Adicionar ao carrinho</button>
                <p>{produto.descricao}</p>
            </div>
        </main>
    );
}