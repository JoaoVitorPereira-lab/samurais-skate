import './index.scss'

import Cabecalho from '../../components/cabecalho'
import Avaliacao from '../../components/Avaliacao'

import { useEffect, useState } from 'react'
import { buscarimagem} from '../../../api/UsuarioApi';
import { useNavigate } from 'react-router-dom'
import { ListarBone } from '../../../api/ConsultasAPI';

export default function ConsultarBone() {

    const [produto, setProduto] = useState([]);
    const [aval, setAval] = useState([]);
    const [busca, setBusca] = useState('');

    const navigate = useNavigate();

    async function CarregarProdutos() {
        const resp = await ListarBone();
        setProduto(resp);
        
    }

    useEffect(() => {
        CarregarProdutos();
    }, [])

    function AbrirDetalhes(id) {
        navigate('/produto/' + id + '/detalhe')
    }

    

    return (
        <main className='bone-container'>

            <Cabecalho value={busca} selecionado='bone' />

            <h1 className="titulo">Você está na página: <span className="titulo-span">HOME / BONÉ</span></h1>

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