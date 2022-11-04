import './index.scss'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify'

import Storage from 'local-storage'

import { BuscarPorIDCarrinho } from '../../../api/CarrinhoAPI'
import { Listar } from '../../../api/EnderecoAPI'
import { SalvarNovoPedido } from '../../../api/PedidoAPI'

import CardEndereco from '../../components/cardEndereco';
import ModalEndereco from '../../components/ModalEndereco';
import ModalCartao from '../../components/ModalCartao';
import { API_URL } from '../../../api/config';
import Rodape from '../../components/rodape';
import { BuscarCartao } from '../../../api/CartaoAPI';

export default function ContinuarPedido(){
    const [enderecos, setEnderecos] = useState([]);
    const [itens, setItens] = useState([]);
    const [usuario, setUsuario] = useState([]);

    const [cartao, setCartao] = useState([]);
    const [exibirCartao, setExibirCartao] = useState(false);

    const [exibirEndereco, setExibirEndereco] = useState(false);
    const [idEndereco, setIdEndereco] = useState();

    const [cupom, setCupom] = useState('');

    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [cvv, setCvv] = useState('');
    const [tipo, setTipo] = useState('');
    const [parcela, setParcela] = useState('');

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
        console.log(r);
        setEnderecos(r);
    }

    async function CarregarItens(){
        let carrinho = Storage('carrinho');
        if (carrinho) {
            let temp = [];

            for (let produto of carrinho){
                let p = await BuscarPorIDCarrinho(produto.id);
                temp.push({
                    produto: p,
                    qtd: produto.qtd
                })
            }
            setItens(temp);
        }
    }

    function calcularTotal() {
        let total = 0;
        for (let item of itens) {
            total = total + item.produto.preco * item.qtd;
        }
        return total + 20;
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

            let pedido =
            {
                cupom: cupom,
                idEndereco: idEndereco,
                tipoPagamento: 'Cartão',
                cartao: {
                    nome: nome,
                    numero: numero,
                    vencimento: vencimento,
                    codSeguranca: cvv,
                    parcelas: parcela
                },
                produtos: produtos
            }

            await SalvarNovoPedido(id, pedido);
            toast.dark('Pedido foi inserido com sucesso');
            Storage('carrinho', []);
            navigate('/');
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }

    function PegarUsuario(){
        const usuarioLogado = Storage('usuario-logado')
        setUsuario(usuarioLogado)
    }
    
    async function CarregarCartoes(){
      const resposta = await BuscarCartao(usuario.id)
      setCartao(resposta)
    }

    useEffect(() =>{
        if(!Storage("usuario-logado")){
            navigate('/Login')
        }
        PegarUsuario();
        CarregarCartoes();

        CarregarItens();
        CarregarEnderecos();
    }, [cartao])

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
                    <span> {calcularTotal()} </span>

                    <button onClick={SalvarPedido}> Finalizar Pedido </button>
                </div>
            </header>

            <aside className="aside-lado-a-lado">
                <section className="sec-enderecos">
                    <p> Endereços </p>

                    <div className='card-endereco-row'>
                        {enderecos.map(item =>
                            <CardEndereco item={item} selecionar={setIdEndereco} selecionado={item.id == idEndereco} />
                        )}
                    </div>

                    <div className="div-button">
                        <button onClick={exibirNovoEndereco}> NOVO ENDEREÇO </button>
                    </div>
                </section>

                <section className="sec-pagamento">
                    <div className="div-boleto">
                        <h2> Boleto </h2>

                        <div className="boleto">
                            <input type="checkbox"/>
                            <img src="../images/boleto.png" alt=""/>
                            <text> Vencimento em 1 dia útil. A data de entrega será alterada devido ao tempo de processamento do Boleto. Veja mais na próxima página. </text>
                        </div>
                    </div>

                    <div className="div-pix">
                        <h2> Pix </h2>

                        <div className="pix">
                            <input type="checkbox"/>
                            <img src="../images/pix-rodape.png" alt=""/>
                            <text> Vencimento em 30 minutos. Após o pagamento seu pedido será processado.</text>
                        </div>
                    </div>

                    <div className="div-cartao-credito">
                        <h2> Cartão </h2>

                        {cartao.map(item =>
                            <div className="div-cartoes-cadastrados">
                                <h3> {item.nome} </h3>
                            </div>
                        )}

                        <button onClick={exibirNovoCartao}>
                            ADICIONAR CARTÃO
                        </button>
                    </div>

                    <div className='div-cupom'>
                        <h2> Cupom </h2>
                        <div className='form'>
                            <div>
                                <input type='text' value={cupom} onChange={e => setCupom(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </section>
            </aside>

            <div className='itens'>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantidade</th>
                            <th>Preço Unitário</th>
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