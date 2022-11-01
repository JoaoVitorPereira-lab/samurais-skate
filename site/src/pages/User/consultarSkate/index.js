import './index.scss'

import Cabecalho from '../../components/cabecalho'
import { useEffect, useState } from 'react'
import { ListarSkate, buscarimagem, buscarAvaliacao } from '../../../api/UsuarioApi';
import { useNavigate } from 'react-router-dom'

export default function ConsultarSkate() {

    const [produto, setProduto] = useState([]);
    const [aval, setAval] = useState([]);
    const [busca, setBusca] = useState('');

    const navigate = useNavigate();

    async function CarregarProdutos() {
        const resp = await ListarSkate();
        setProduto(resp);
        
    }

   

    useEffect(() => {
        CarregarProdutos();
        
    }, [])

    function AbrirDetalhes(id) {
        navigate('/produto/' + id + '/detalhe')
    }

    console.log(produto);

    return (
        <main className='skate-container'>

            <Cabecalho value={busca} selecionado='skate' />

            <h1 className="titulo">Você está na página: <span className="titulo-span">HOME / SKATE</span></h1>

            <div className='contents'>
                <div className="filtros">

                </div>
                <div className='produtos'>
                    {produto.map(item =>
                        <div className='div-produto' onClick={() => AbrirDetalhes(item.id)}>
                            <img src={buscarimagem(item.imagem)} height='100px' width="auto" />
                            <h3 className='largura-h3'>{item.produto}</h3>
                            {buscarAvaliacao(item.id)}
                            <h4>por: R${item.preco.replace(".", ",")}</h4>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}