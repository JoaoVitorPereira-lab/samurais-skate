import "./index.scss";

import { toast } from "react-toastify"

import Navs from '../componentsAdmin/navs';
import Cabecalho from '../componentsAdmin/cabecalho';

import { CadastrarProduto, enviarimagem, AlterarProduto, BuscarPorID, BuscarImagem, ListarCategoria } from "../../../api/AdminAPI";
import { ListarMarcas, ListarTipos, ListarTiposSkate } from "../../../api/ListarAPI";
import { API_URL } from "../../../api/config";
import Storage from "local-storage";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function PageCadastrarProduto() {
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
    const [tamanho, setTamanho] = useState();
    const [importado, setImportado] = useState(false);
    const [promocao, setPromocao] = useState(false);
    const [preco, setPreco] = useState();
    const [estoque, setEstoque] = useState(0);

    const [id, setId] = useState(0);

    const { idParam } = useParams();

    const navigate = useNavigate();

    function MostrarImagem(imagem) {
        if (imagem == undefined) {
            return '../images/upload.png'
        }
        else {
            return URL.createObjectURL(imagem)
        }
    }

    async function CarregarProduto() {
        const r = await BuscarPorID(idParam);

        setImagem(r.imagem)

        setNome(r.nome);
        setDescricao(r.descricao);
        setPreco(r.preco.toString());
        setEstoque(r.estoque);
        setPromocao(r.promocao)

        setIdTipos(r.tipo);
        setIdMarcas(r.marca);

        setId(r.id);
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
            if (!imagem)
                throw new Error('Escolha a imagem!');

            if (id === 0) {
                const novoProduto = await CadastrarProduto(IdMarcas, IdCategoria, IdTipos, nome, descricao, tamanho, importado, promocao, preco, estoque);

                await enviarimagem(novoProduto.id, imagem, imagem2);

                navigate('/consultarproduto')
                setId(novoProduto.id)

                toast.success('Produto cadastrado com sucesso 🚀');
            }
            else {
                await AlterarProduto(id, IdMarcas, IdCategoria, IdTipos, nome, descricao, promocao, preco, estoque);
                if (typeof (imagem) == 'object') {
                    await enviarimagem(idParam, imagem)
                }
                toast.success('Produto alterado com sucesso 🚀');
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
        setIdTipoSkate('Tipo do Skate');
        setIdCategoria('Categoria');
        setIdTipos('Tipos');
        setIdMarcas('Marca');
    }

    function EscolherImagem(inputId) {
        document.getElementById(inputId).click();
    }

    useEffect(() => {
        MostrarImagem()
    }, [imagem])

    useEffect(() => {
        if (!Storage('admin-logado') || Storage('admin-logado').length === 0) {
            toast.dark('Área apenas para administradores')
            navigate('/')
        }

        CarregarCategorias()
        CarregarTipos()
        CarregarMarcas()
        CarregartiposSkate()

        if (idParam) {
            CarregarProduto();
        }
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
                        <div className="img1" onClick={() => EscolherImagem("clickFoto")}>
                            <img src={MostrarImagem(imagem)} className="img-produto" alt="" />
                            <input type="file" id="clickFoto" onChange={e => setImagem(e.target.files[0])} />
                        </div>
                        <p>Imagem 1 do produto</p>
                        <div className="img2" onClick={() => EscolherImagem("clickFoto1")}>
                            <img src={MostrarImagem(imagem2)} className="img-produto" alt="" />

                            <input type="file" id="clickFoto1" onChange={e => setImagem2(e.target.files[0])} />
                        </div>
                        <p>Imagem 2 do produto</p>
                    </section>



                    <hr className="linha" />



                    <section className="sec-infos-produto-1">

                        <div className="div-infos-1">
                            <label for="nome" id="nome-titulo"> Nome: </label>
                            <input type="text" id="nome" placeholder="Nome do Produto"
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

                            {IdTipos == 3 &&
                                <div className="div-marcas">
                                    <label id="marca-titulo"> Tamanho: </label>
                                    <select value={IdMarcas} onChange={e => setIdMarcas(e.target.value)}>
                                        <option selected disabled hidden> Marca </option>


                                        <option>
                                            a
                                        </option>

                                    </select>
                                </div>
                            }
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