import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {toast} from 'react-toastify'

import Cabecalho from '../../components/cabecalho'
import Avaliacao from '../../components/Avaliacao'
import './index.scss'
import { alterarAvaliacao, avaliarProduto, buscarAval1, deletarAvaliacao } from '../../../api/UsuarioApi';

export default function Avaliar() {
    const [nota, setNota] = useState(0);
    const [desc, setDesc] = useState('');

    const [id, setId] = useState(0);

    const navigate = useNavigate();
    const {idProduto, idPedido, idUsuario} = useParams();

    function novoClick() {
        setNota(0);
        setDesc('');
    }

    async function CarregarAval() {
        const r = await buscarAval1(idProduto, idUsuario);
        console.log(r)
        setNota(r[0].nota)
        setDesc(r[0].descricao)
        setId(r[0].id)

    }

    async function salvarClick() {
        try {
            if (id === 0) {
                const novaAval = await avaliarProduto(idProduto, idUsuario, desc, nota);
                navigate(`/detalhe/pedido/${idPedido}/usuario/${idUsuario}`)
                setId(novaAval.id)
                toast.success('Avaliação enviada 🚀');
            }
            else {
                navigate(`/detalhe/pedido/${idPedido}/usuario/${idUsuario}`)
            }
        } catch (err) {
            if (err.response) 
                toast.error(err.response.data.erro);
            else {
                toast.error(err.message)
            }
        }
    }

    console.log(id)

    useEffect(() => {
        
       CarregarAval()
        
        
       
    })



    return(
        <main className='aval-container'>
            <Cabecalho />
            <section className='info'>
                <div className='titulo'>
                    <hr />
                    <h2> Avalie o produto: <span className="span-status">a  </span> </h2>
                </div>
                <div className='nota'>
                    <h2>Que nota você dá para esse produto?</h2>
                    <div className='opcoes'>
                        <button onClick={() => setNota(1)}>1</button>
                        <button onClick={() => setNota(2)}>2</button>
                        <button onClick={() => setNota(3)}>3</button>
                        <button onClick={() => setNota(4)}>4</button>
                        <button onClick={() => setNota(5)}>5</button>
                    </div>
                    <Avaliacao aval={nota} />
                </div>
                <div className='inputs'>
                    <h2>Descreva sua avaliação: </h2>
                    <textarea placeholder='Avaliação' cols="50" rows="10" value={desc} onChange={e => setDesc(e.target.value)}></textarea>
                </div>
                <div className='btns-final'>
                    <button onClick={salvarClick}> {id === 0 ? 'SALVAR' : 'VOLTAR'}  </button> 
                    {id === 0 &&
                        <button onClick={novoClick}>NOVO</button>
                    }
                    
                </div>
                
            </section>
        </main>
    );
}