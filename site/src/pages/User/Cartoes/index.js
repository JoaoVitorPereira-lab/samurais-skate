import "./index.scss";

import Cabecalho from "../../components/cabecalho";
import Menu from "../../components/MenuConfig";
import Rodape from "../../components/rodape";

import storage from 'local-storage'

import { useState, useEffect } from "react";
import { BuscarCartao, CadastrarCartao } from '../../../api/CartaoAPI'
import { toast } from "react-toastify"

import CardCartao from '../../components/cardCartao';
import ModalCartao from '../../components/ModalCartao';

export default function Pagamento() {
    const [cartao, setCartao] = useState([])
    const [idCartao, setIdCartao] = useState();
    const [exibirCartao, setExibirCartao] = useState(false);

    async function CarregarCartoes(){
        const id = storage('usuario-logado').id;
        const r = await BuscarCartao(id)
        setCartao(r)
    }

    function exibirNovoCartao() {
        setExibirCartao(true);
    }

    function fecharNovoCartao() {
        setExibirCartao(false);
        CarregarCartoes();
    }

    useEffect(() => {
        CarregarCartoes();
    }, [cartao])

    return (
        <main className="main-pagamento">
            <ModalCartao   exibir={exibirCartao}   fechar={fecharNovoCartao} />

            <Cabecalho/>
            
            <section className="sec-row-3">
                <Menu selecionado='cartoes'/>

                <div className="div-pagamento">
                    <div className="div-titulo-pagamento">
                        <h1> Cartões </h1>
                        <label> Gerencie seus cartões </label>
                    </div>

                    <div className='card-cartao-row'>
                        {cartao.map(item =>
                            <CardCartao item={item} selecionar={setIdCartao} selecionado={item.id == idCartao} />
                        )}
                    </div>

                    <button className="add-cartao" onClick={exibirNovoCartao}>
                        ADICIONAR CARTÃO
                    </button>
                </div>
            </section>    
            <Rodape />
        </main>
    );
}
