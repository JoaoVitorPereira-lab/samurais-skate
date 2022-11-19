import './index.scss'

import Cabecalho from '../../components/cabecalho'
import { useEffect, useState } from 'react'
import { ListarPromocoes, buscarimagem} from '../../../api/UsuarioApi';
import { useNavigate } from 'react-router-dom'

export default function Promocoes() {

    const [produto, setProduto] = useState([]);
    const [aval, setAval] = useState([]);
    const [busca, setBusca] = useState('');

    const navigate = useNavigate();

    async function CarregarProdutos() {
        const resp = await ListarPromocoes();
        setProduto(resp);
        
    }


    useEffect(() => {
        CarregarProdutos();
    }, [])

    function AbrirDetalhes(id) {
        navigate('/produto/' + id + '/detalhe')
    }

    

    return (
        <main className='promocao-container'>

            <Cabecalho value={busca} selecionado='promocoes' />

            <h1 className="titulo">Você está na página: <span className="titulo-span">HOME / PROMOÇOES</span></h1>

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