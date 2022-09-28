import './index.scss'
import { useEffect, useState } from 'react'

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';
import { ConsultarProduto } from '../../../api/AdminAPI';

export default function PageConsultarProduto(){

    const [produto, setProduto] = useState([]);

    async function CarregarProdutos(){
        const resp = await ConsultarProduto();
        return setProduto(resp); 
    }

    useEffect(() => {
        CarregarProdutos();
    })

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

                    <div className="div-disponivel">
                        <img src="./images/disponivel.png" alt=""/>
                    </div>

                    <div className="div-editar-deletar" style={{display: "flex", flexDirection: "row"}}>
                        <button className="editar-button">
                            <img src="./images/editar.png"  alt=""/> 
                        </button>

                        <button className="excluir-button">
                            <img src="./images/excluir.png" alt=""/>
                        </button>
                    </div>
                </div>
            )}

        </main>
    )
}