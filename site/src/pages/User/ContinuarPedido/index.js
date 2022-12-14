import './index.scss'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify'

import Storage from 'local-storage'

import { API_URL } from '../../../api/config';
import { EnviarAoComprar } from '../../../api/GmailAPI';
import { BuscarPorIDCarrinho } from '../../../api/CarrinhoAPI'
import { SalvarNovoPedido } from '../../../api/PedidoAPI'
import { Listar } from '../../../api/EnderecoAPI'
import { BuscarCartao } from '../../../api/CartaoAPI';

import CardCartao from '../../components/cardCartao';
import CardEndereco from '../../components/cardEndereco';

import ModalEndereco from '../../components/ModalEndereco';
import ModalCartao from '../../components/ModalCartao';

import Rodape from '../../components/rodape';

export default function ContinuarPedido(){
    const [enderecos, setEnderecos] = useState([]);
    const [itens, setItens] = useState([]);

    const [cartao, setCartao] = useState([]);
    const [idCartao, setIdCartao] = useState();
    const [exibirCartao, setExibirCartao] = useState(false);

    const [exibirEndereco, setExibirEndereco] = useState(false);
    const [idEndereco, setIdEndereco] = useState();
    const [total, setTotal] = useState();

    const [parcelas, setParcelas] = useState('');

    const navigate = useNavigate();

    function exibirNovoEndereco() {
        setExibirEndereco(true);
    }

    function fecharNovoEndereco() {
        setExibirEndereco(false);
        CarregarEnderecos();
    }

    function exibirNovoCartao() {
        setExibirCartao(true);
    }

    function fecharNovoCartao() {
        setExibirCartao(false);
        CarregarCartoes();
    }

    async function CarregarEnderecos(){
        const id = Storage('usuario-logado').id;
        const r = await Listar(id);
        setEnderecos(r);
    }

    async function CarregarCartoes(){
        const id = Storage('usuario-logado').id;
        const r = await BuscarCartao(id)
        setCartao(r)
    }

    async function CarregarItens(){
        let carrinho = Storage('carrinho');
        if (carrinho) {
            let temp = [];

            for (let produto of carrinho){
                let p = await BuscarPorIDCarrinho(produto.id);
                if(carrinho.tamanho == undefined){
                    temp.push({
                        produto: p,
                        qtd: produto.qtd,
                        tamanho: produto.tamanho
                    })
                }
                else{
                    temp.push({
                        produto: p,
                        qtd: produto.qtd
                    })
                }
            }
            setItens(temp);
        }
    }

    function calcularTotal() {
        let total = 0;
        for (let item of itens) {
            total = total + item.produto.preco * item.qtd;
        }
        setTotal(Number(total + 20));
    }

    function exibirImagem(item) {
        if (item.produto.imagem.length > 0)
            return API_URL + '/' + item.produto.imagem;
        else
            return '';
    }

    async function SalvarPedido() {
        try {
            let produtos = Storage('carrinho');
            let id = Storage('usuario-logado').id;
            let nome = Storage('usuario-logado').nome;
            let sobrenome = Storage('usuario-logado').sobrenome;
            let email = Storage('usuario-logado').Email;

            let pedido =
            {
                idEndereco: idEndereco,
                tipoPagamento: 'Cart??o',
                idCartao: idCartao,
                parcelas: parcelas,
                produtos: produtos
            }

            await SalvarNovoPedido(id, pedido);
            await EnviarAoComprar(nome, sobrenome, email);
            toast.dark('Pedido foi inserido com sucesso');
            Storage('carrinho', []);
            navigate('/');
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }

    useEffect(() =>{
        if(!Storage("usuario-logado")){
            navigate('/Login')
        }

        CarregarCartoes();
        calcularTotal();
        CarregarItens();
        CarregarEnderecos();

        if(!Storage('carrinho') || Storage('carrinho').length === 0){
            toast.error('Carrinho vazio, Coloque um item no carrinho')
            navigate('/')
        }
    },[enderecos, cartao])

    return(
        <main className='main-continuarPedido'>
            <ModalEndereco exibir={exibirEndereco} fechar={fecharNovoEndereco} />
            <ModalCartao   exibir={exibirCartao}   fechar={fecharNovoCartao} />

            <header className="header-pedido">
                <Link to='/'>
                    <img src="/images/logo-branco.gif" alt="" width="200" height="200" style={{ marginLeft: 40 }}/>
                </Link>

                <div className="div-finalizarpedido">
                    <text> Total: </text>
                    <span> {total} </span>

                    <button onClick={SalvarPedido}> Finalizar Pedido </button>
                </div>
            </header>

            <aside className="aside-lado-a-lado">
                <section className="sec-enderecos">
                    <p> Endere??os </p>

                    <div className='card-endereco-row'>
                        {enderecos.map(item =>
                            <CardEndereco item={item} selecionar={setIdEndereco} selecionado={item.id == idEndereco} />
                        )}
                    </div>

                    <div className="div-button">
                        <button onClick={exibirNovoEndereco}> NOVO ENDERE??O </button>
                    </div>
                </section>

                <section className="sec-pagamento">
                    <div className="div-cartao-credito">
                        <h2> Cart??o </h2>

                        <div className='card-cartao-row'>
                            {cartao.map(item =>
                                <CardCartao item={item} selecionar={setIdCartao} selecionado={item.id == idCartao} />
                            )}
                        </div>

                        <button className='btn-add-cartao' onClick={exibirNovoCartao}>
                            ADICIONAR CART??O
                        </button>

                        {idCartao &&
                            <div className='div-cupom'>
                                <h2> Parcelamento </h2>
                                <div className='form'>
                                <select className='select-parcela' value={parcelas} onChange={e => setParcelas(e.target.value)}  >
                                    <option disabled hidden selected>Selecione</option>
                                    <option value={1}>01x sem Juros</option>
                                    <option value={2}>02x sem Juros</option>
                                    <option value={3}>03x sem Juros</option>
                                    <option value={4}>04x sem Juros</option>
                                    <option value={5}>05x sem Juros</option>
                                    <option value={6}>06x sem Juros</option>
                                </select>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </aside>

            <div className='itens'>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantidade</th>
                            <th>Tamanho</th>
                            <th>Pre??o Unit??rio</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>

                        {itens.map(item =>
                            <tr>
                                <td>
                                    <div className='celula-item'>
                                        <img src={exibirImagem(item)} />
                                        <div>
                                            <h3> {item.produto.nome} </h3>
                                            <h4> {item.produto.nmtipo} </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.qtd}
                                </td>
                                <td>
                                    {item.tamanho}
                                </td>
                                <td>
                                    R$ {item.produto.preco}
                                </td>
                                <td>
                                    R$ {item.qtd * item.produto.preco}
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

            <Rodape />
        </main>
    )
}