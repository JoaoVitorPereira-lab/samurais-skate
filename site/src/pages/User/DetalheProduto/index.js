import { useEffect, useState } from 'react';
import Cabecalho from '../../components/cabecalhoUser'
import { useParams } from 'react-router-dom';
import { BuscarProdutoPorID } from '../../../api/UsuarioApi';
import { API_URL } from '../../../api/config';
import './index.scss'

import Storage from 'local-storage'
import { toast } from 'react-toastify'

export default function ProdutoDetalhe() {

    const [produto, setProduto] = useState([]);
    const [desconto, setDesconto] = useState(produto.preco);

    const { id } = useParams();

    async function carregarPagina() {
        const r = await BuscarProdutoPorID(id);
        setProduto(r);
        
    }
console.log(produto)
    function adicionarAoCarrinho() {
        let carrinho = []
        if (Storage('carrinho')) {
            carrinho = Storage('carrinho');
        }
        if (!carrinho.find(item => item.id == - id)) {
            carrinho.push({
                id: id,
                qtd: 1
            })

            Storage('carrinho', carrinho);
        }

        toast.dark('Produto adicionado ao carrinho')
    }

    function desc () {
        let comDesconto = produto.preco * 0.9;
        return comDesconto.toFixed(2);
    }

    useEffect(() => {
        carregarPagina();
    }, [])

    return (
        <main className='page-detalhes'>
            <Cabecalho />
            <div className='div-detalhes-pai'>
                <div>
                    <h1 className='Nome-samurais'> Samurai’s Skate Shop </h1>
                </div>
                <div className='div-detalhes'>

                    <div className='imgs'>

                        <img src={API_URL + '/' + produto.imagem} alt="" />

                    </div>

                    <div className='infos'>

                        <div className='nome-produto'>
                            <p>{produto.nome}</p>
                        </div>

                        <div className='avaliacao'>
                            <img src="../images/aval3.png" alt="" />
                        </div>

                        <div className='nome-marca'>
                            <p>Marca: {produto.marca}</p>
                        </div>


                        <div className='preco-produto'>
                            <p>R${produto.preco}</p>
                        </div>

                        <div className='nome-marca'>
                            <p>R${desc()} à vista com desconto</p>
                        </div>


                        <div className='div-btn-carrinho'>
                            <div>
                                <img src="../images/Favorite.png" alt="" />
                            </div>
                            <button className='btn-carrinho' onClick={adicionarAoCarrinho}>Carrinho</button>
                        </div>

                    </div>

                </div>
            </div>
        </main>

    );
}