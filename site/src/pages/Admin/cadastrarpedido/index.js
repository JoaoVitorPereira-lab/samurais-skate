import "./index.scss";
import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';
import { EndPointCadastrarProduto, alterarProduto, ListarCategoria, ListarTipos,ListarMarcas, enviarimagem } from "../../../api/AdminAPI";
import { useEffect, useState } from 'react';

export default function CadastrarProduto(){

    const[categoriaas, setCategoriaas] = useState([]);
    const [tiposCategoria, setTiposCategoria] = useState([])
    const [marcas, setMarcas] = useState([])

    const [mostrar, setMostrar] = useState(false);
    const [imagem, setImagem] = useState()
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

    async function CarregarTipos(){
        const resp = await ListarTipos()
        setTiposCategoria(resp)
    }

    async function CarregarMarcas(){
        const resp = await ListarMarcas()
        setMarcas(resp)
    }

    useEffect(() =>{
        CarregarCategorias()
        CarregarTipos()
        CarregarMarcas()
    },[])

    function exibir(){
        setMostrar(true);
    }

    async function salvarClick(){
        try {
            if(!imagem)                     throw new Error('Escolha a imagem!')
            if(!nome)                       throw new Error('Escreva o nome do produto!')
            if(!preco)                      throw new Error('Digite o preço do produto!')
            if(!tipo)                       throw new Error('Escolha um tipo para o produto')
            if(!estoque || estoque <= 0)    throw new Error('Digite a quantidade de itens estocados')
            if(!descricao)                  throw new Error('Dê uma descrição para o produto!')
            if(!nome)                       throw new Error('Escreva o nome do produto!')

                const Novoproduto = await EndPointCadastrarProduto(marca, categoria, tipo, nome, descricao, promocao, preco, avaliacao, estoque);
                await enviarimagem(Novoproduto.id, imagem)

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
        setMarca('');
        setMostrar(false)
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
                                <img className="img-produto" src={MostrarImagem()}/>
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
                                            {tiposCategoria.map(item =>
                                                <div className="input-tipo-skate">
                                                    <input type="checkbox" class="check" />
                                                    <label id="label-tipo-skate" for="acessorios"> {item.nome} </label>
                                                </div>
                                            )}
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
                                    <div className="div-tipos-skate">
                                        {marcas.map(item =>
                                            <div className="input-tipo-skate">
                                                <input type="checkbox" class="check" />
                                                <label id="label-tipo-skate" for="acessorios"> {item.nome} </label>
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