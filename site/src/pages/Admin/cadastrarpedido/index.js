import "./index.scss";
import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';
import { EndPointCadastrarProduto, alterarProduto, ListarCategoria } from "../../../api/AdminAPI";
import { useEffect, useState } from 'react';

export default function CadastrarProduto(){

    const[categoriaas, setCategoriaas] = useState([]);

    const [mostrar, setMostrar] = useState(false);
    const [marca, setMarca] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tipo, setTipo] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [promocao, setPromocao] = useState(false);
    const [preco, setPreco] = useState();
    const [avaliacao, setAvaliacao] = useState(0);
    const [estoque, setEstoque] = useState(0);
    const [id, setId] = useState(0);

    async function CarregarCategorias(){
        const resp = await ListarCategoria()
        setCategoriaas(resp)
    }
    useEffect(() =>{
        CarregarCategorias();
    },[])

    function exibir(){
        setMostrar(true);
    }

    async function salvarClick(){
        try {
                const novoAgendamento = await EndPointCadastrarProduto(marca, categoria, tipo, nome, descricao, promocao, preco, avaliacao, estoque);

                setId(novoAgendamento.id);
                alert('Agendamento cadastrado com sucesso 🚀');
        } catch (err) {
            if(err.response)
                console.log(err.response.data.erro);  
            else{
                console.log(err.message);
            }
        }
        
    }

    function novoClick(){
        setMarca('');
        setCategoria('');
        setTipo('');
        setNome('');
        setDescricao(0);
        setPromocao(false);
        setPreco(0);
        setAvaliacao(0);
        setEstoque(0);
        setId(0);
    }

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


                    <section className="sec-linha1">
                        <hr />
                    </section>


                    <section className="sec-infos-produto-1">
                        
                            <div className="div-infos-1">
                                <label for="nome" id="titulos"> Nome: </label>
                                <input type="text" id="nome" placeholder="Nome do Produto" 
                                       value={nome} 
                                       onChange={e => setNome(e.target.value)}
                                />

                                <label for="preco" id="titulos" className="sla"> Preço: </label>
                                <input type="number" id="preco" placeholder="R$ 000,00"
                                       value={preco} 
                                       onChange={e => setPreco(e.target.value)}
                                />
                            </div>

                            <div className="div-informacoes">

                            <div className="div-infos-2">
                                <label id="titulos"> Tipo: </label>

                                <div className="tipo-skate">
                                    <div className="div-skate">
                                        <input type="checkbox" id="skate" onChange={exibir} />
                                        <label id="label" for="skate"> Skate </label>

                                        <div className="div-tipos div-bone">
                                            <input type="checkbox" id="bone"/>
                                            <label id="label" for="bone"> Boné </label>
                                        </div>
                                        
                                        <div className="div-tipos div-tenis">
                                            <input type="checkbox" id="tenis"/>
                                            <label id="label" for="tenis"> Tênis </label>
                                        </div>

                                        <div className="div-tipos div-acessorios">
                                            <input type="checkbox" id="acessorios"/>
                                            <label id="label" for="acessorios"> Acessórios </label>
                                        </div>
                                    </div>

                                    { mostrar == true &&
                                        <div className="div-tipos-skate">
                                            <div className="input-tipo-skate">
                                                <input type="checkbox" class="check" />
                                                <label id="label-tipo-skate" for="acessorios"> Equipamento de proteção </label>
                                            </div>

                                            <div className="input-tipo-skate">
                                                <input type="checkbox" class="check" />
                                                <label id="label-tipo-skate" for="acessorios"> Skate Montado </label>
                                            </div>

                                            <div className="input-tipo-skate">
                                                <input type="checkbox" class="check" />
                                                <label id="label-tipo-skate" for="acessorios"> Rolamento </label>
                                            </div>

                                            <div className="input-tipo-skate">
                                                <input type="checkbox" class="check" />
                                                <label id="label-tipo-skate" for="acessorios"> Shape </label>
                                            </div>

                                            <div className="input-tipo-skate">
                                                <input type="checkbox" class="check" />
                                                <label id="label-tipo-skate" for="acessorios"> Truck </label>
                                            </div>

                                            <div className="input-tipo-skate">
                                                <input type="checkbox" class="check" />
                                                <label id="label-tipo-skate" for="acessorios"> Roda </label>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="div-infos-3">
                                <label id="titulos"> Estoque: </label>
                                <input type="number" id="estoque"/>

                                <div className="promocao">
                                    <input type="checkbox"/>
                                    <label> Promoção </label>
                                </div>
                            </div>

                            <div className="div-infos-4">
                                <label id="titulos"> Marca: </label>
                            </div>
                        </div>
                    </section>

                    <section className="sec-infos-produtos-2">

                        <section className="sec-linha2">
                            <hr />
                        </section>

                        <div className="div-informacoes2">
                            <div className="div-descricao">
                                <label id="titulos"> Descrição Geral: </label>
                                <textarea placeholder="Descrição do Produto"/>
                            </div>

                            <div className="div-categoria">

                                <label id="titulos"> Categoria: </label>

                                {categoriaas.map(item => 
                                
                                <aside className="categorias">
                                <div className="div-categorias-not">
                                    <input type="checkbox" id="iniciante"/>
                                    <label for="iniciante"> {item.nome} </label>
                                </div>
                                </aside>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="div-button-salvar">
                    <button onClick={salvarClick}> { id === 0 ? 'SALVAR' : 'ALTERAR' } </button> <nbsp/> <nbsp/>
                    <button className="novo" onClick={novoClick}>NOVO</button>
                </div>
            </div>
        </section>
    );
}