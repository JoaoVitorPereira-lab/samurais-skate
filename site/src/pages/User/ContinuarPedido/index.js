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
import { API_URL } from '../../../api/config';
import Rodape from '../../components/rodape';

export default function ContinuarPedido(){
    const [enderecos, setEnderecos] = useState([]);
    const [itens, setItens] = useState([]);

    const [mostrar, setMostrar] = useState(false);

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

    function ExibirCardClick(){
        setMostrar(true);
    }

    function OcultarCardClick(){
        setMostrar(false)
    }

    function exibirNovoEndereco() {
        setExibirEndereco(true);
    }

    function fecharNovoEndereco() {
        setExibirEndereco(false);
        CarregarEnderecos();
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

            const r = await SalvarNovoPedido(id, pedido);
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
        CarregarItens();
        CarregarEnderecos();
    },[])

    return(
        <main className='main-continuarPedido'>
            <ModalEndereco exibir={exibirEndereco} fechar={fecharNovoEndereco} />

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
                        
                        {mostrar === true &&
                            <button onClick={OcultarCardClick}>
                                ADICIONAR CARTÃO
                            </button>
                        }

                        {mostrar === false &&
                            <button onClick={ExibirCardClick}>
                                ADICIONAR CARTÃO
                            </button>
                        }

                        {mostrar === true &&
                            <div className="cartao-credito">
                                <div className="cartao-infos">
                                    <p className="cartao-p-1"> Nome do cartão </p>
                                    <p> Número do cartão </p>
                                    <p> Vencimento </p>
                                    <p> CVV </p>
                                    <p> Tipo de Pagamento: </p>
                                    <p> Parcelas: </p>
                                </div>

                                <div className="cartao-inputs">
                                    <input type="text"   id="input-1" value={nome} onChange={e => setNome(e.target.value)}/>
                                    <br/>
                                    <input type="number" id="input-2" value={numero} onChange={e => setNumero(e.target.value)}/>
                                    <br/>
                                    <input type="number" id="vencimento" value={vencimento} onChange={e => setVencimento(e.target.value)}/>
                                    <br/>
                                    <input type="number" id="cvv" value={cvv} onChange={e => setCvv(e.target.value)}/>
                                    <br/>
                                    <div>
                                        <select value={tipo} onChange={e => setTipo(e.target.value)}   >
                                            <option disabled hidden selected>Selecione</option>
                                            <option>Crédito</option>
                                            <option>Débito</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select className='select-parcela' value={parcela} onChange={e => setParcela(e.target.value)}  >
                                            <option disabled hidden selected>Selecione</option>
                                            <option value={1}>01x à Vista</option>
                                            <option value={1}>01x sem Juros</option>
                                            <option value={2}>02x sem Juros</option>
                                            <option value={3}>03x sem Juros</option>
                                            <option value={4}>04x sem Juros</option>
                                            <option value={5}>05x sem Juros</option>
                                            <option value={6}>06x sem Juros</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
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