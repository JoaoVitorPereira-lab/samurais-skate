import "./index.scss"
import Navs from '../componentsAdmin/navs'
import Cabecalho from '../componentsAdmin/cabecalho'

export default function CadastrarProduto(){
    return(
        <section className="page-cadastrar-produto">
            <div className="comps">
                <Cabecalho />
                <Navs />
            </div>

            <div className="div-cadastrar">
                <div className="tite">
                    <hr />
                    <h2> Cadastrar Novo Produto </h2>
                </div>

                <div className="infos-cadastrar">

                    <section className="sec-inputs-imgs">
                        <label for='input-img1'>
                            <img src="./images/upload.png" alt=""/>
                        </label>
                        <input type="file" id="input-img1" name="input-img1" accept=".jpg, .jpeg, .png"/>
                        <p className="p1"> Imagem 1 do produto </p>

                        <label for='input-img2'>
                            <img src="./images/upload.png" alt=""/>
                        </label>
                        <input type="file" id="input-img2" name="input-img2"/>
                        <p className="p2"> Imagens complementares do produto </p>
                    </section>



                    <section className="sec-infos-produto-1">
                        <hr />

                        <div>
                            <label for="nome"> Nome: </label>
                            <input type="text" id="nome" placeholder="Nome do Produto"/>

                            <label for="preco"> Preço: </label>
                            <input type="number" id="preco" placeholder="R$ 000,00"/>
                        </div>

                        <div>
                            <label> Tipo: </label>

                            <input type="checkbox" id="skate"/>
                            <label for="skate"> Skate </label>

                            <input type="checkbox" id="bone"/>
                            <label for="bone"> Boné </label>

                            <input type="checkbox" id="tenis"/>
                            <label for="tenis"> Tênis </label>

                            <input type="checkbox" id="acessorios"/>
                            <label for="acessorios"> Acessórios </label>
                        </div>

                        <div>
                            <label> Estoque: </label>
                            <input type="number" id="estoque"/>
                            <button> + </button>

                            <input type="checkbox"/>
                            <label> Promoção </label>
                        </div>

                        <div>
                            <label> Marca: </label>
                        </div>
                    </section>

                    <section className="sec-linha">
                        <hr />
                    </section>

                    <section className="sec-infos-produtos-2">

                        <div>
                            <label> Descrição Geral: </label>
                            <input type="text" placeholder="Descrição do Produto"/>
                        </div>

                        <div>
                            <label> Categoria: </label>
                            <div>
                                <div>
                                    <input type="checkbox" id="iniciante"/>
                                    <label for="iniciante"> Iniciante </label>
                                </div>

                                <div>
                                    <input type="checkbox" id="semi"/>
                                    <label for="semi"> Semi-Profissional </label>
                                </div>

                                <div>
                                    <input type="checkbox" id="profissional"/>
                                    <label for="profissional"> Profissional </label>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div>
                    <button> Salvar </button>
                </div>
            </div>
        </section>
    );
}