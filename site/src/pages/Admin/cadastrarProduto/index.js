import "./index.scss";

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';

import { CadastrarProduto, ListarCategoria, ListarTipos,ListarMarcas, enviarimagem, AlterarProduto, BuscarPorID, ListarTiposSkate } from "../../../api/AdminAPI";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export default function PageCadastrarProduto(){

    const [Tipos, setTipos] = useState([]);
    const [Marcas,setMarcas] = useState([]);
    const [Categoria,setCategoria] = useState([]);
    const [TiposSkate, setTiposSkate] = useState([]);

    const [IdTipos, setIdTipos] = useState()
    const [IdMarcas,setIdMarcas] = useState()
    const [IdCategoria,setIdCategoria] = useState()
    const [IdTipoSkate, setIdTipoSkate] = useState()

    const [imagem, setImagem] = useState();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [promocao, setPromocao] = useState(false);
    const [preco, setPreco] = useState();
    const [estoque, setEstoque] = useState('');

    const [id, setId] = useState(0);

    const { idParam } = useParams();

    async function CarregarProduto(){
        const resposta = await BuscarPorID(idParam);

        console.log(resposta);

        setNome(resposta.nome);
        setDescricao(resposta.descricao);
        setPreco(resposta.preco);
        setEstoque(resposta.estoque);
        setPromocao(resposta.promocao);

        setIdTipos(resposta.IdTipo);
        setIdCategoria(resposta.IdCategoria);
        setIdMarcas(resposta.IdMarca);

        setId(resposta.id);
    }


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
        setTiposSkate(resp)
    }


    useEffect(() =>{
        if(idParam){
            CarregarProduto();
        }
        CarregarCategorias()
        CarregarTipos()
        CarregarMarcas()
        CarregartiposSkate()
    },[] )

    async function salvarClick(){
        try {
            if(!imagem)
                throw new Error('Escolha a imagem!');

            if(id === 0){
                const novoProduto = await CadastrarProduto(IdMarcas, IdCategoria, IdTipos, nome, descricao, promocao, preco, estoque);

                await enviarimagem(novoProduto.id, imagem);
            
                setId(novoProduto.id)
                alert('Produto cadastrado com sucesso 🚀');
            }
            else{
                await AlterarProduto(id, IdMarcas, IdCategoria, IdTipos, nome, descricao, promocao, preco, estoque);
                alert('Produto alterado com sucesso 🚀');
            }
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
        setPreco('');
        setEstoque(0);
        setId(0);
        setPromocao(false);

        setIdCategoria('Categoria');
        setIdTipos('Tipos');
        setIdMarcas('Marcas');
    }

    function EscolherImagem() {
        document.getElementById('ClickFoto').click();
    }

    function MostrarImagem(){
        return URL.createObjectURL(imagem)
    }

    

    return(
        <main className="page-cadastrar-produto">
            <div className="comps">
                <Cabecalho />
                <Navs />
            </div>

            <div className="div-cadastrar">
                <div className="tite">
                    <hr />
                    <h2> {id===0 ? 'Cadastrar' : 'Alterar' } Novo Produto </h2>
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
                                <label for="nome" id="nome-titulo"> Nome: </label>
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
                                <label id="tipo-titulo"> Tipo: </label>
                                <select value={IdTipos} onChange={e => setIdTipos(e.target.value) }>
                                    <option selected disabled hidden> Tipos </option>

                                    {Tipos.map(item =>
                                        <option value={item.id}> 
                                            {item.nome}
                                        </option>
                                    )}

                                </select>

                                <select value={TiposSkate} onChange={e => setTiposSkate(e.target.value) }>
                                    <option> Tipos Skate </option>

                                    {TiposSkate.map(item =>
                                        <option value={item.id}> 
                                            {item.nome}
                                        </option>
                                    )}

                                </select>
                                
                            </div>

                            <div className="div-infos-3">
                                <label id="titulos"> Estoque: </label>
                                <input type="number" 
                                       id="estoque" 
                                       value={estoque} 
                                       onChange={e=> setEstoque(Number(e.target.value))}
                                />

                                <div className="promocao">
                                    <input type="checkbox"
                                           value={promocao}
                                           onChange={e => setPromocao(e.target.checked )}     
                                    />
                                    <label> Promoção </label>
                                </div>
                            </div>

                            <div className="div-marcas">
                                <label id="marca-titulo"> Marca: </label>
                                <select value={IdMarcas} onChange={e=> setIdMarcas(e.target.value)}>
                                    <option selected disabled hidden> Marcas </option>

                                    {Marcas.map(item =>
                                        <option value={item.id}>
                                            {item.nome}
                                        </option>    
                                    )}
                                </select>
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
                                <textarea placeholder="Descrição do Produto"
                                          value={descricao}
                                          onChange={e => setDescricao(e.target.value)}
                                />
                            </div>

                            <div className="div-categoria">
                                <label id="categoria-titulo"> Categoria: </label>
                                <select value={IdCategoria} onChange={e=> setIdCategoria(e.target.value)}>
                                        <option selected disabled hidden >  Categoria  </option>

                                        {Categoria.map(item =>
                                            <option value={item.id}>
                                                {item.nome}
                                            </option>    
                                        )}
                                </select>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="div-button-salvar-novo">
                    <button onClick={salvarClick}> { id === 0 ? 'SALVAR' : 'ALTERAR' } </button> <nbsp/> <nbsp/>
                    <button className="novo" onClick={novoClick}>NOVO</button>
                </div>
            </div>
        </main>
    );
}