import { useState } from 'react'
import './index.scss'
import { Salvar } from '../../../api/EnderecoAPI';
import Storage from 'local-storage'
import { toast } from 'react-toastify'

export default function ModalEndereco({ exibir, fechar }) {

    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [cvv, setCvv] = useState('');
    const [tipo, setTipo] = useState('');
    const [parcela, setParcela] = useState('');

    async function salvarCartao() {
        try {
            const id = Storage('usuario-logado').id;
            const r = await Salvar();
            toast.dark('Cartão salvo');

            fechar();
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }


    return (
        <div className='comp-modal-endereco'>
            <div className={`modal-endereco ${exibir ? 'exibir' : ''}`}>
                <div className='conteudo'>
                    <h1 className='h1-conteudo'> Novo Endereço </h1>

                    <div className='form'>
                        <div className='div-form'>
                            <label id="lb"> Nome do cartão: </label>
                            <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
                        </div>
                        <div className='div-form'>
                            <label id="lb"> N° do Cartão: </label>
                            <input type='text' value={numero}  onChange={e => setNumero(e.target.value)}  />
                        </div>
                        <div className='div-form'>
                            <label id="lb"> Vencimento: </label>
                            <input type='text' value={vencimento}  onChange={e => setVencimento(e.target.value)}  />
                        </div>
                        <div className='div-form'>
                            <label id="lb"> CVV: </label>
                            <input type='number' value={cvv}  onChange={e => setCvv(e.target.value)}  />
                        </div>
                        <div className='div-form-select div-form-select-1'>
                            <label id="lb"> Tipo: </label>
                            <select value={tipo} onChange={e => setTipo(e.target.value)}   >
                                <option disabled hidden selected>Selecione</option>
                                <option>Crédito</option>
                                <option>Débito</option>
                            </select>
                        </div>
                        <div className='div-form-select div-form-select-2'>
                            <label id="lb"> Parcela: </label>
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

                        <div className='div-form'>
                            <label id="lb"></label>
                            <div className='btn div-form'>
                                <button> Salvar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}