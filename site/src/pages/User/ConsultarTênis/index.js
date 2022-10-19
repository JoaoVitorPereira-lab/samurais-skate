import './index.scss'
import Cabecalho from '../../components/cabecalhoUser'
import { useEffect, useState } from 'react'
import { ListarTenis, buscarimagem, BuscarTenisPorNome } from '../../../api/UsuarioApi';
import { useNavigate } from 'react-router-dom'

export default function ConsultarTenis(){

    const [produto, setProduto] = useState([]);
    const [busca, setBusca] = useState('');

    const navigate = useNavigate();
    
    async function CarregarProdutos () {
        const resp = await ListarTenis();
        setProduto(resp);
        
    }

    async function BuscarNome () {
        const resp = await BuscarTenisPorNome(busca);
        setProduto(resp)
        
    }

    useEffect(() => {
        CarregarProdutos()
    }, [])

    function AbrirDetalhes(id) {
        navigate('/produto/' + id + '/detalhe')
    }

    return(
        <main className='tenis-container'>
            <Cabecalho value={busca} change={e => setBusca(e.target.value)} click = {BuscarNome()} />
            <h1 className="titulo">Você está na página: <span className="titulo-span">HOME / TÊNIS</span></h1>

            <div className='contents'>
                <div className="filtros">
                    
                </div>
                <div className='produtos'>
                {produto.map(item =>
                    <div className='div-produto' onClick={() => AbrirDetalhes (item.id)}>
                        <img src={buscarimagem(item.imagem)} alt="" width="100px" />
                        <h3 className='largura-h3'>{item.produto}</h3>
                        <img src="../images/aval3.png" alt="" />
                        <h4>por: {item.preco.replace(".", ",")}</h4>
                        
                    </div>
                )}
                    
                    
                </div>
            </div>
        </main>
    )
 }