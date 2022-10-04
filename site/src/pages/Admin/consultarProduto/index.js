import './index.scss'
import { toast } from 'react-toastify';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';
import { ConsultarProduto, BuscarProdutoPorNome, RemoverProduto } from '../../../api/AdminAPI';

export default function PageConsultarProduto(){

    const navigate = useNavigate();

    const [produto, setProduto] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        CarregarProdutos();
    })

    async function EditarProduto(id) {
        navigate(`/alterarproduto/${id}`)
    }

    async function CarregarProdutos(){
        const resp = await ConsultarProduto();
        return setProduto(resp); 
    }

    async function Filtrar() {
        const resp = await BuscarProdutoPorNome(filtro);
        return setProduto(resp);
    }

    async function DeletarProduto(id) {
        try {
            await RemoverProduto(id);
            await CarregarProdutos();
            toast.dark('Produto removido com sucesso');
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }

    return(
        <main className="page-consultar-produto">

            <aside className="comps">
                <Cabecalho />
                <Navs />
            </aside>

            <section className="sec-explicando-page">
                <div>
                    <text> O produto está com as informações dentro do card, que está organizada da seguinte forma: </text>
                </div>

                <div className="div-ul">
                    <ul>
                        <li> Produto; </li>
                        <li> Tipo; </li>
                        <li> Marca; </li>
                        <li> Preço; </li>
                        <li> Disponibilidade; </li>
                        <li> Editar; </li>
                        <li> Excluir. </li>
                    </ul>
                </div>
            </section>

            <div className='caixa-busca'>
                <input type="text" 
                       placeholder='Buscar produto por nome'
                       value={filtro}
                       onChange={e => setFiltro(e.target.value)}
                />
                <img src='../images/buscar.png' alt='buscar' onClick={Filtrar}/>
            </div>
                
            {produto.map(item =>
                <div className="div-card-produto">
                    <div className="div-produto" style={{display: "flex", flexDirection: "column"}}>
                        <text> {item.nome} </text>
                        <text> #0{item.id} </text>
                    </div>

                    <div className="div-tipo">
                        <text> {item.tipo} </text>
                    </div>

                    <div className="div-marca">
                        <text> {item.marca} </text>
                    </div>

                    <div className="div-preco">
                        <text> {item.preco} </text>
                    </div>

                    {item.estoque >= 1 &&
                        <div className="div-disponivel">
                            <img src="../images/disponivel.png" alt=""/>
                        </div>
                    }
                    {item.estoque <= 0 &&
                        <div className="div-disponivel">
                            <img src="../images/naodisponivel.png" alt=""/>
                        </div>
                    }

                    <div className="div-editar-deletar" style={{display: "flex", flexDirection: "row"}}>
                        <button className="editar-button" onClick={() => EditarProduto(item.id)}>
                            <img src="../images/editar.png"  alt=""/> 
                        </button>

                        <button className="excluir-button" onClick={() => DeletarProduto(item.id)}>
                            <img src="../images/excluir.png" alt=""/>
                        </button>
                    </div>
                </div>
            )}

        </main>
    )
}