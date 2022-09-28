import './index.scss'

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';

export default function PageConsultarProduto(){

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

            <div className="div-card-produto">
                
                <div className="divs-iguais div-produto">
                    <text> Kit Joelheira Fast Forward</text>
                    <text> #01 </text>
                </div>

                <div className="divs-iguais div-tipo">
                    <text> Acessórios</text>
                </div>

                <div className="divs-iguais div-marca">
                    <text> Hondar </text>
                </div>

                <div className="divs-iguais div-preco">
                    <text> 100,99 </text>
                </div>

                <div className="divs-iguais div-disponivel">
                    <img src="./images/disponivel.png" alt=""/>
                </div>

                <div className="div-editar-deletar">
                    <button>
                        <img src="./images/editar.png"  alt=""/> 
                    </button>

                    <button>
                        <img src="./images/excluir.png" alt=""/>
                    </button>
                </div>
            </div>

        </main>
    )
}