import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/MenuConfig'
import Rodape from '../../components/rodape'
import { Listar } from '../../../api/EnderecoAPI'
import storage from 'local-storage'
import ModalEndereco from '../../components/ModalEndereco'

import './index.scss'
import { useState, useEffect } from 'react';
import CardEndereco from '../../components/cardEndereco'
import Storage from 'local-storage'

export default function Endereco() {

    const [exibirEndereco, setExibirEndereco] = useState(false)
    const [endereco, setEndereco] = useState([])
    const [idCartao, setIdCartao] = useState();

    function exibirNovoEndereco() {
        setExibirEndereco(true);
    }

    function fecharNovoEndereco() {
        setExibirEndereco(false);
        ListarEnderecos();
    }

    async function ListarEnderecos() {
        const id = Storage('usuario-logado').id;
        const r = await Listar(id);
        setEndereco(r);
    }

    useEffect(() => {
        ListarEnderecos();
    }, [endereco])

    return (
        <main className='main-endereco'>
            <ModalEndereco exibir={exibirEndereco} fechar={fecharNovoEndereco} />
            <Cabecalho />

            <section className='sec-row'>
                <Menu selecionado='endereco'/>

                <div className='div-endereco'>
                    <div className='titulo-enderecos'>
                        <h1> Meus Endereços </h1>
                        <label> Gerencie seus endereços </label>
                    </div>

                    <div className='card-endereco'>
                        {endereco.map(item =>
                            <CardEndereco item={item} selecionar={setIdCartao} selecionado={item.id == idCartao} />
                        )}
                    </div>

                    <div className='add-endereco'>
                        <button onClick={exibirNovoEndereco}> ADICIONAR ENDEREÇO </button>
                    </div>
                </div>
            </section>

            <Rodape />
        </main>
    )
}