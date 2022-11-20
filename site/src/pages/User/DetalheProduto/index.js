import { useEffect, useState } from 'react';

import Cabecalho from '../../components/cabecalho'
import Avaliacao from '../../components/Avaliacao'

import { useParams } from 'react-router-dom';
import { buscarAval2, BuscarProdutoPorID } from '../../../api/UsuarioApi';
import { API_URL } from '../../../api/config';
import './index.scss'

import Storage from 'local-storage'
import { toast } from 'react-toastify'

export default function ProdutoDetalhe() {
    const favoritos = Storage('favoritos');

    const [produto, setProduto] = useState([]);
    const [descricao, setDescricao] = useState(false);
    const [avaliacao, setAvaliacao] = useState(true);
    const [aval, setAval] = useState([]);

    const { id } = useParams();

    async function carregarPagina() {
        const r = await BuscarProdutoPorID(id);
        setProduto(r);
    }

    function adicionarAoCarrinho() {

        let carrinho = [];
        
        if(Storage('carrinho')) {
            carrinho = Storage('carrinho');
        }
        if(!Storage('usuario-logado')){
            toast.error('Produto não pode ser adicionado, Logue com um usuário');
        }
        else if(carrinho.find(item => item.id == id)){
            toast.error('Produto já está no carrinho')
        }
        else if (!carrinho.find(item => item.id == - id)) {
            carrinho.push({
                id: id,
                qtd: 1
            })

            Storage('carrinho', carrinho);
            toast.dark('Produto adicionado ao carrinho')
        }
    }

    async function carregarAvaliacoes() {
        const r = await buscarAval2(produto.id);
        setAval(r);
    }

    function adicionarAoFavoritos() {
        let favoritos = [];
        
        if(Storage('favoritos')) {
            favoritos = Storage('favoritos');
        }
        if(!Storage('usuario-logado')){
            toast.error('Produto não pode ser adicionado, Logue com um usuário');
        }
        else if(favoritos.find(item => item.id == id)){
            toast.error('Produto já está nos favoritos')
        }
        else if (!favoritos.find(item => item.id == - id)) {
            favoritos.push({
                id: id
            })

            Storage('favoritos', favoritos);
            toast.dark('Produto adicionado aos favoritos')
        }
    }

    function desc () {
        let comDesconto = produto.preco * 0.9;
        return comDesconto.toFixed(2);
    }

    function parc () {
        let parcelado = produto.preco / 6;
        return parcelado.toFixed(2);
    }

    function descClick() {
        setDescricao(true);
        setAvaliacao(false)
    }

    function avalClick() {
        setAvaliacao(true);
        setDescricao(false);
    }

    useEffect(() => {
        carregarPagina();
        carregarAvaliacoes();
    }, [favoritos])

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

                    <div className='infos-produto'>

                        <div className='nome-produto'>
                            <p>{produto.nome}</p>
                        </div>

                        <div className='avaliacao'>
                            <img src="/images/aval3.png" alt="" />
                        </div>

                        <div className='nome-marca'>
                            <p>Marca: {produto.marca}</p>
                        </div>


                        <div className='preco-produto'>
                            <p>R${produto.preco}</p>
                        </div>

                        <div className='nome-marca'>
                            <p>R${desc().replace('.', ',')} à vista com desconto </p>
                            <p>6x sem juros de R${parc().replace('.', ',')}</p>
                        </div>

                        <div className='div-btn-carrinho'>

                            {!favoritos.find(item => item.id == id) &&
                                <div className='div-btn-favoritos' onClick={adicionarAoFavoritos}>
                                    <img src="/images/Favorite.png" alt="" width="50" height="50"/>
                                </div>
                            }

                            {favoritos.find(item => item.id == id) && 
                                <div className='div-btn-favoritos' onClick={adicionarAoFavoritos}>
                                    <img src="/images/coracao-vermelho.png" alt=""/>
                                </div>
                            }
    
                            <button className='btn-carrinho' onClick={adicionarAoCarrinho}>Carrinho</button>
                        </div>

                    </div>

                </div>
                <hr/>
                <div className='descs'>
                    <label className='descricao'>
                                <li onClick={descClick}>
                                    Descrição
                                </li>
                    </label>
                    <label>
                                <li onClick={avalClick}>
                                    Avaliações
                                </li>
                    </label>
                </div>
                <div className='descs-txt'>
                    {descricao === true &&
                        <p>{produto.descricao}</p>
                    }
                    
                    {avaliacao === true &&
                        <section className='avaliacoes'>
                            {aval.map(item =>
                                <div>
                                    <div className='username'>
                                        <img src="/images/Usuario.png" alt="" width='70px' height= '50'/>
                                        <div>
                                            <h3>{item.nome}</h3>
                                            <Avaliacao aval={item.nota} width='100px' />
                                        </div>
                                    </div>
                                    <div className='descricao-aval'>
                                        <p>{item.descricao}</p>
                                    </div>
                                </div>
                            )}
                        </section>
                    }
                </div>

            </div>
        </main>

    );
}

/*
{!favoritos.find(item => item.id == - id) &&
    <div className='div-btn-favoritos' onClick={adicionarAoFavoritos}>
        <img src="/images/Favorite.png" alt="" width="50" height="50"/>
    </div>
}
*/