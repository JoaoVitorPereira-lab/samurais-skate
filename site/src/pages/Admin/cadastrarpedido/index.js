import "./index.scss";

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';

import { EndPointCadastrarProduto, ListarCategoria, ListarTipos,ListarMarcas, enviarimagem, ListarTiposSkate } from "../../../api/AdminAPI";
import { useEffect, useState } from 'react';

export default function CadastrarProduto(){

    const [IdTipos, setTipos] = useState([]);
    const [IdMarcas, setMarcas] = useState([]);
    const [IdCategoria, setCategoria] = useState([]);
    const [tipoSkate, setTipoSkate] = useState([]);

    const [skate, setSkate] = useState(false);

    const [mostrar, setMostrar] = useState(false);
    const [imagem, setImagem] = useState();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [promocao, setPromocao] = useState(false);
    const [preco, setPreco] = useState();
    const [estoque, setEstoque] = useState();
    
    const [id, setId] = useState(0);


    async function CarregarCategorias(){
        const resp = await ListarCategoria()
        setCategoria(resp)
    }

    async function CarregarTipos(){
        const resp = await ListarTipos()
        setTipos(resp)
    }

    async function CarregarMarcas(){
        const resp = await ListarMarcas()
        setMarcas(resp)
    }

    async function CarregartiposSkate(){
        const resp = await ListarTiposSkate()
        setTipoSkate(resp)
    }

    useEffect(() =>{
        CarregarCategorias()
        CarregarTipos()
        CarregarMarcas()
        CarregartiposSkate()
    },[] );

    function exibir(){
        setMostrar(true);
    }

    async function salvarClick(){
        try {
            if(!imagem)
                throw new Error('Escolha a imagem!');

            const Novoproduto = await EndPointCadastrarProduto(IdMarcas, IdCategoria, IdTipos, nome, descricao, promocao, preco, estoque);
            await enviarimagem(Novoproduto.id, imagem);
            alert('cadastrado com sucesso 🚀');
        } catch (err) {
            if(err.response)
                alert(err.response.data.erro);  
            else{
                alert(err.message);
            }
        }
        
    }

    function novoClick(){
        setNome('');
        setDescricao('');
        setPreco(0);
        setEstoque(0);
        setId(0);
        setPromocao(false);
    }

    function EscolherImagem() {
        document.getElementById('ClickFoto').click();
    }

    function MostrarImagem(){
        return URL.createObjectURL(imagem)
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
                        
                        <div className='foto-upload' onClick={EscolherImagem}>
                            {!imagem &&
                                <img src="../images/upload.png" alt=""/>
                            
                            }
                            {imagem &&
                                <img className="img-produto" src={MostrarImagem()} alt=""/>
                            }

                            <input type="file" id='ClickFoto' onChange={e  => setImagem(e.target.files[0])}/>
                        </div>
                        
                        <p className="p1"> Imagem 1 do produto </p>
                    
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

                                <div className="tipo-produto">

                                    <div className="tipos-produtos">
                                        {IdTipos.map(item => 
                                            <div className="div-tipos">
                                                <input type="radio" 
                                                       id="tipos-input" 
                                                       name="inputs-tipos"
                                                       value={item.id}
                                                       onClick={exibir}
                                                /> {item.nome}
                                                &nbsp; &nbsp; &nbsp; &nbsp;
                                            </div>
                                        )}
                                    </div>

                                    { mostrar === true &&
                                        <div className="div-tipos-skate">
                                            {tipoSkate.map(item =>
                                                <div className="input-tipo-skate">
                                                    <input type="radio" 
                                                           class="check" 
                                                           name="igual2"
                                                           value={item.id}
                                                    />
                                                    <label id="label-tipo-skate" for="acessorios"> 
                                                        {item.nome} 
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="div-infos-3">
                                <label id="titulos"> Estoque: </label>
                                <input type="number" 
                                       id="estoque" 
                                       value={estoque} 
                                       onChange={e=> setEstoque(Number(e.target.value))}
                                />

                                <div className="promocao">
                                    <input type="radio"
                                           value={promocao}
                                           onChange={e => setPromocao(e.target.value    )}     
                                    />
                                    <label> Promoção </label>
                                </div>
                            </div>

                            <div className="div-infos-4">
                                <label id="titulos"> Marca: </label>

                                <div className="div-marca-skate">
                                    {IdMarcas.map(item =>
                                        <div className="input-marca-skate">
                                            <input type="radio"
                                                   class="check"
                                                   name="Marcas"
                                                   value={item.id} 
                                            />
                                            <label id="label-marca-skate" for="acessorios"> 
                                                {item.nome}
                                            </label>
                                        </div>
                                    )}
                                </div>
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
                                <textarea placeholder="Descrição do Produto" value={descricao} onChange={e => setDescricao(e.target.value)}/>
                            </div>

                            <div className="div-categoria">
                                <label id="titulos"> Categoria: </label>

                                <div className="div-map-categorias">
                                    {IdCategoria.map(item => 
                                        <div className="div-categorias">
                                            <div className="div-inputs-categorias">
                                                <input type="radio" 
                                                       id="categoria"
                                                       name="Categoria"
                                                       value={item.id}    
                                                />
                                                <label for="categoria"> 
                                                    {item.nome}
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="div-button-salvar-novo">
                    <button onClick={salvarClick}> { id === 0 ? 'SALVAR' : 'ALTERAR' } </button> <nbsp/> <nbsp/>
                    <button className="novo" onClick={novoClick}>NOVO</button>
                </div>
            </div>
        </section>
    );
}