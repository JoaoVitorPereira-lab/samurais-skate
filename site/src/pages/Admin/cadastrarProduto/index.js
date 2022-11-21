import "./index.scss";

import { toast } from "react-toastify"

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';

import { CadastrarProduto, AlterarProduto, BuscarPorID, ListarCategoria, SalvarImagens } from "../../../api/AdminAPI";
import { ListarMarcas, ListarTipos, ListarTiposSkate } from "../../../api/ListarAPI";
import { API_URL } from "../../../api/config";
import Storage from "local-storage";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function PageCadastrarr() {
    const [Tipos, setTipos] = useState([]);
    const [Marcas, setMarcas] = useState([]);
    const [Categoria, setCategoria] = useState([]);
    const [TiposSkate, setTiposSkate] = useState([]);

    const [IdTipos, setIdTipos] = useState()
    const [IdMarcas, setIdMarcas] = useState()
    const [IdCategoria, setIdCategoria] = useState()
    const [IdTipoSkate, setIdTipoSkate] = useState()

    const [imagem, setImagem] = useState();
    const [imagem2, setImagem2] = useState();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [importado, setImportado] = useState(false);
    const [promocao, setPromocao] = useState(false);
    const [preco, setPreco] = useState();
    const [estoque, setEstoque] = useState(0);

    const [id, setId] = useState(0);

    const { idParam } = useParams();

    const navigate = useNavigate();

    function exibirImagem(imagem) {
        if (imagem == undefined) {
            return '/images/download.svg';
        }
        else if (typeof (imagem) == 'string') {
            return `${API_URL}/${imagem}`
        }
        else {
            return URL.createObjectURL(imagem);
        }
    }

    async function CarregarProduto() {
        const r = await BuscarPorID(idParam);

        setId(r.info.id);
        setIdMarcas(r.info.marca);
        setIdTipos(r.info.tipo);
        setIdTipoSkate(r.info.tipoSkate);
        setIdCategoria(r.info.categoria);

        setNome(r.info.nome);
        setDescricao(r.info.descricao);
        setPromocao(r.info.promocao);
        setImportado(r.info.importado);
        setPreco(r.info.preco.toString())
        setEstoque(r.info.estoque);

        if (r.imagens.length > 0) {
            setImagem(r.imagens[0]);
        }
        if (r.imagens.length > 1) {
            setImagem2(r.imagens[1]);
        }
    }

    async function CarregarCategorias() {
        const resp = await ListarCategoria()
        setCategoria(resp)
    }

    async function CarregarTipos() {
        const resp = await ListarTipos()
        setTipos(resp)
    }

    async function CarregarMarcas() {
        const resp = await ListarMarcas()
        setMarcas(resp)
    }

    async function CarregartiposSkate() {
        const resp = await ListarTiposSkate()
        setTiposSkate(resp)
    }

    async function salvarClick() {
        try {
            if (!id || id === 0) {
                if (!imagem){
                    toast.error('Imagem 1 é obrigatória')
                }
                else{
                    const novoProduto = await CadastrarProduto(IdMarcas, IdCategoria, IdTipos, IdTipoSkate, nome, descricao, importado, promocao, preco, estoque);
                    await SalvarImagens(novoProduto.id, imagem, imagem2);

                    navigate('/consultarproduto');
                    toast.dark('Produto cadastrado com sucesso 🚀');
                }
            }
            else {
                await AlterarProduto(id, IdMarcas, IdCategoria, IdTipos, nome, descricao, promocao, preco, estoque);
                await SalvarImagens(id, imagem, imagem2);

                toast.dark('Produto alterado com sucesso 🚀');
                navigate('/consultarproduto')
            }
        } catch (err) {
            if (err.response)
                toast.error(err.response.data.erro);
            else {
                toast.error(err.message);
            }
        }

    }

    function novoClick() {
        setNome('');
        setDescricao('');
        setPreco('');
        setEstoque(0);
        setId(0);
        setPromocao(false);

        setImagem();
        setImagem2();
        setIdTipoSkate('Tipo do Skate');
        setIdCategoria('Categoria');
        setIdTipos('Tipos');
        setIdMarcas('Marca');
    }

    function EscolherImagem(inputId) {
        document.getElementById(inputId).click();
    }

    useEffect(() => {
        if(!Storage('admin-logado') || Storage('admin-logado').length == 0) {
            toast.dark('Área apenas para administradores')
            navigate('/')
        }

        CarregarCategorias();
        CarregarTipos();
        CarregarMarcas();
        CarregartiposSkate();
        CarregarProduto();

    }, [])

    return (
        <main className="page-cadastrar-produto">
            <div className="comps">
                <Cabecalho />
                <Navs selecionado='cadastrar-adm' />
            </div>

            <div className="div-cadastrar">
                <div className="tite">
                    <hr />
                    <h2> {id === 0 ? 'Cadastrar' : 'Alterar'} Produto </h2>
                </div>

                <div className="infos-cadastrar">

                    <section className="imgs">
                        <div className="img1">
                            <img src={exibirImagem(imagem)} className="img-produto" alt="" onClick={() => EscolherImagem('imagem')} />
                        </div>
                        <p>Imagem 1 do Produto</p>
                        <div className="img2">
                            <img src={exibirImagem(imagem2)} className="img-produto" alt="" onClick={() => EscolherImagem('imagem2')}/>
                        </div>
                        <p>Imagem 2 do Produto</p>

                        <input type='file' id='imagem'  onChange={e =>  setImagem (e.target.files[0])} />
                        <input type='file' id='imagem2' onChange={e =>  setImagem2(e.target.files[0])} />
                    </section>



                    <hr className="linha" />



                    <section className="sec-infos-produto-1">

                        <div className="div-infos-1">
                            <label for="nome" id="nome-titulo"> Nome: </label>
                            <input type="text" id="nome" placeholder="Nome"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />

                            <label for="preco" id="titulos" className="sla"> Preço: </label>
                            <input min={0} type="number" id="preco" placeholder="R$ 000,00"
                                value={preco}
                                onChange={e => setPreco(e.target.value)}
                            />
                        </div>

                        <div className="div-informacoes">

                            <div className="div-infos-2">
                                <label id="tipo-titulo"> Tipo: </label>
                                <select value={IdTipos} onChange={e => setIdTipos(e.target.value)}>
                                    <option selected disabled hidden> Tipos </option>

                                    {Tipos.map(item =>
                                        <option value={item.id}>
                                            {item.nome}
                                        </option>
                                    )}
                                </select>

                                {IdTipos == 1 &&
                                    <section className="aa">
                                        <select value={IdTipoSkate} onChange={e => setIdTipoSkate(e.target.value)}>
                                            <option selected disabled hidden> Tipo do Skate </option>

                                            {TiposSkate.map(item =>
                                                <option value={item.id}>
                                                    {item.nome}
                                                </option>
                                            )}

                                        </select>
                                    </section>
                                }

                            </div>

                            <div className="div-infos-3">
                                <label id="titulos"> Estoque: </label>
                                <input min={0} type="number"
                                    id="estoque"
                                    value={estoque}
                                    onChange={e => setEstoque(Number(e.target.value))}
                                />

                                <div className="promocao">
                                    <input type="checkbox"
                                        value={promocao}
                                        onChange={e => setPromocao(e.target.checked)}
                                    />
                                    <label> Promoção </label>
                                </div>
                            </div>

                            <div className="div-marcas">
                                <label id="marca-titulo"> Marca: </label>
                                <select value={IdMarcas} onChange={e => setIdMarcas(e.target.value)}>
                                    <option selected disabled hidden> Marca </option>

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


                        <hr className="linha2" />


                        <div className="div-informacoes2">
                            <div className="div-descricao">
                                <label id="titulos"> Descrição Geral: </label>
                                <textarea placeholder="Descrição do Produto"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                />
                            </div>
                            
                            {IdTipoSkate == 2 &&
                                <div className="div-categoria">
                                    <label id="categoria-titulo"> Categoria: </label>
                                    <select value={IdCategoria} onChange={e => setIdCategoria(e.target.value)}>
                                        <option selected disabled hidden >  Categoria  </option>

                                        {Categoria.map(item =>
                                            <option value={item.id}>
                                                {item.nome}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            }

                            {IdTipoSkate >= 4 &&
                                <div className="importado">
                                    <input type="checkbox"
                                        value={importado}
                                        onChange={e => setImportado(e.target.checked)}
                                    />
                                    <label id="importado-titulo"> Importado </label>
                                </div>
                            }

                        </div>
                    </section>
                </div>

                <div className="div-button-salvar-novo">
                    <button onClick={salvarClick}> {id === 0 ? 'SALVAR' : 'ALTERAR'} </button> <nbsp /> <nbsp />
                    <button className="novo" onClick={novoClick}>NOVO</button>
                </div>
            </div>
        </main>
    );
}