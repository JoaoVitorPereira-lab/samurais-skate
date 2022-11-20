import './index.scss'

import Cabecalho from '../../components/cabecalho'
import Avaliacao from '../../components/Avaliacao'
import { useEffect, useState } from 'react'
import { buscarimagem } from '../../../api/UsuarioApi';
import { useNavigate } from 'react-router-dom'
import { ListarMarcaskate } from '../../../api/ListarAPI';
import { ListarSkate } from '../../../api/ConsultasAPI';

export default function ConsultarSkate() {

    const [produto, setProduto] = useState([]);
    const [aval, setAval] = useState([]);
    const [busca, setBusca] = useState('');
    const [marca, setMarca] = useState([]);

    const navigate = useNavigate();

    async function CarregarProdutos() {
        const resp = await ListarSkate();
        setProduto(resp);

    }

    async function CarregarMarcas() {
        const resp = await ListarMarcaskate();
        setMarca(resp);
    }

    useEffect(() => {
        CarregarProdutos();
        CarregarMarcas();
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
                

                <div className='produtos'>
                    {produto.map(item =>
                        <div className='div-produto' onClick={() => AbrirDetalhes(item.id)}>
                            <img src={buscarimagem(item.imagem)} height='100px' width="auto" />
                            <h3 className='largura-h3'>{item.produto}</h3>
                            <Avaliacao aval={item.avaliacao} />
                            <h4>por: R${item.preco.replace(".", ",")}</h4>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}