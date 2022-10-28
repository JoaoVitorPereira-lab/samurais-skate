import './index.scss'

import Cabecalho from '../../components/cabecalho'
import { useEffect, useState } from 'react'
import { ListarAcessorios, buscarimagem, buscarAvaliacao } from '../../../api/UsuarioApi';
import { useNavigate } from 'react-router-dom'

export default function ConsultarAcessorio() {

    const [produto, setProduto] = useState([]);
    const [aval, setAval] = useState([]);
    const [busca, setBusca] = useState('');

    const navigate = useNavigate();

    async function CarregarProdutos() {
        const resp = await ListarAcessorios();
        setProduto(resp);
        
    }

    async function CarregarAvaliacoes() {
        const resp = await buscarAvaliacao(produto[0].tipo);
        setAval(resp);
    }

    useEffect(() => {
        CarregarProdutos();
        CarregarAvaliacoes();
    }, [])

    function AbrirDetalhes(id) {
        navigate('/produto/' + id + '/detalhe')
    }

    

    return (
        <main className='acessorio-container'>

            <Cabecalho value={busca} selecionado='acessorios' />

            <h1 className="titulo">Você está na página: <span className="titulo-span">HOME / ACESSÓRIOS</span></h1>

            <div className='contents'>
                <div className="filtros">

                </div>
                <div className='produtos'>
                    {produto.map(item =>
                        <div className='div-produto' onClick={() => AbrirDetalhes(item.id)}>
                            <img src={buscarimagem(item.imagem)} height='100px' width="auto" />
                            <h3 className='largura-h3'>{item.produto}</h3>
                            <img src="../images/aval3.png" alt="" />
                            <h4>por: R${item.preco.replace(".", ",")}</h4>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}