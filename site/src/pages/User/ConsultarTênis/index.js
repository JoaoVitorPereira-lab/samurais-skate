import './index.scss'
import Cabecalho from '../../components/cabecalhoUser'
import { useEffect, useState } from 'react'
import { ListarTenis, buscarimagem, BuscarTenisPorNome } from '../../../api/UsuarioApi';
 export default function ConsultarTenis(){

    const [produto, setProduto] = useState([]);
    const [busca, setBusca] = useState('');
    
    async function CarregarProdutos () {
        const resp = await ListarTenis();
        setProduto(resp);
        
    }

    async function BuscarNome () {
        const resp = await BuscarTenisPorNome();
        return resp;
        
    }

    useEffect(() => {
        CarregarProdutos()
    }, [])

    return(
        <main className='tenis-container'>
            <Cabecalho value={busca} change={e => setBusca(e.target.value)} click = {BuscarNome()} />
            <h1 className="titulo">Você está na página: <span className="titulo-span">HOME / TÊNIS</span></h1>

            <div className='contents'>
                <div className="filtros">
                    
                </div>
                <div className='produtos'>
                {produto.map(item =>
                    <div className='div-produto'>
                        <img src={buscarimagem(item.imagem)} alt="" />
                        <h3>{item.produto}</h3>
                        <img src="../images/aval3.png" alt="" />
                        <h4>por: {item.preco}</h4>
                        
                    </div>
                )}
                    
                    
                </div>
            </div>
        </main>
    )
 }