import { useEffect, useState } from 'react';

import Cabecalho from '../../components/cabecalho'
import Avaliacao from '../../components/Avaliacao'
import Rodape from '../../components/rodape'

import { useParams } from 'react-router-dom';
import { buscarAval2, BuscarPorID } from '../../../api/UsuarioApi';
import { ListarTamanhos } from '../../../api/ConsultasAPI';
import { API_URL } from '../../../api/config';
import './index.scss'

import Storage from 'local-storage'
import { toast } from 'react-toastify'
import InputsTamanhos from '../../components/InputsTamanhos';

export default function ProdutoDetalhe() {
    const [produto, setProduto] = useState({ imagens: [], info: {} });
    const [tamanhos, setTamanhos] = useState([]);
    const [idTamanhos, setIdTamanhos] = useState();
    const [imagemPrincipal, setImagemPrincipal] = useState(0);

    const [descricao, setDescricao] = useState(true);
    const [avaliacao, setAvaliacao] = useState(false);
    const [aval, setAval] = useState([]);

    const { id } = useParams();

    async function CarregarTamanhos() {
        const resp = await ListarTamanhos();
        setTamanhos(resp);
    }

    async function carregarPagina() {
        const r = await BuscarPorID(id);
        setProduto(r);
    }
    
    function exibirImagemPrincipal() {
        if (produto.imagens.length > 0) {
            return API_URL + '/' + produto.imagens[imagemPrincipal];
        }
        else {
            return '/produto-padrao.png';
        }
    }

    function exibirImagemProduto(imagem) {
        return API_URL + '/' + imagem;
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
            if(produto.info.tipo === 3){
                carrinho.push({
                    id: id,
                    qtd: 1,
                    tamanho: Number(idTamanhos)
                })

                Storage('carrinho', carrinho);
                toast.dark('Produto adicionado ao carrinho')
            }
            else{
                carrinho.push({
                    id: id,
                    qtd: 1
                })

                Storage('carrinho', carrinho);
                toast.dark('Produto adicionado ao carrinho')
            }
        }
    }

    async function carregarAvaliacoes() {
        const r = await buscarAval2(produto.info.id);
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
        let comDesconto = produto.info.preco * 0.9;
        return comDesconto.toFixed(2);
    }

    function parc () {
        let parcelado = produto.info.preco / 6;
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
        CarregarTamanhos();
        carregarAvaliacoes();
    }, [produto])

    return (
        <main className='page-detalhes'>
            <Cabecalho />
            <div className='div-detalhes-pai'>
                <div>
                    <h1 className='Nome-samurais'> Samurai’s Skate Shop </h1>
                </div>
                <div className='div-detalhes'>

                    <div className='imagens'>
                        <div className='opcoes'>
                            {produto.imagens.map((item, pos) => 
                                <img src={exibirImagemProduto(item)} onClick={() => setImagemPrincipal(pos)} />
                            )}
                        </div>
                        <div className='atual'>
                            <img src={exibirImagemPrincipal()} />
                        </div>
                    </div>

                    <div className='infos-produto'>

                        <div className='nome-produto'>
                            <p>{produto.info.nome}</p>
                        </div>

                        <div className='avaliacao'>
                            <img src="/images/aval3.png" alt="" />
                        </div>

                        <div className='nome-marca'>
                            <p>Marca: {produto.info.marca}</p>
                        </div>

                        <div className='preco-produto'>
                            <p>R${produto.info.preco}</p>
                        </div>

                        {produto.info.tipo == 3 &&
                            <div className='tamanho-produto'>
                                {tamanhos.map(item =>
                                    <div className='aa'>
                                        <InputsTamanhos item={item} selecionar={setIdTamanhos} selecionado={item.tamanho == idTamanhos}/>
                                    </div>
                                )}
                            </div>
                        }

                        <div className='nome-marca'>
                            <p>R${desc().replace('.', ',')} à vista com desconto </p>
                            <p>6x sem juros de R${parc().replace('.', ',')}</p>
                        </div>

                        <div className='div-btn-carrinho'>

                            {!Storage('favoritos').find(item => item.id == id) &&
                                <div className='div-btn-favoritos' onClick={adicionarAoFavoritos}>
                                    <img src="/images/Favorite.png" alt="" width="50" height="50"/>
                                </div>
                            }

                            {Storage('favoritos').find(item => item.id == id) && 
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
                        <p className='desc'>{produto.info.descricao}</p>
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
            <Rodape />
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