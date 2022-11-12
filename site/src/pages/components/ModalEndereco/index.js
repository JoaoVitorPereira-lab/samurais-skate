import { useEffect, useState } from 'react'
import './index.scss'
import { Salvar } from '../../../api/EnderecoAPI';
import Storage from 'local-storage'
import { toast } from 'react-toastify'

export default function ModalEndereco({ exibir, fechar }) {

    const [referencia, setReferencia] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    function formatCep(cep) {
        return cep.replace(/\D/g, '')
                  .replace(/(\d{5})(\d)/, '$1-$2')
                  .replace(/(-\d{3})\d+?$/, '$1')
    }

    function formatNum(num) {
        return num.replace(/\D/g, '')
                  .replace(/(\d{7})(\d)/, '$1')
    }

    async function salvarEndereco() {
        try {
            const id = Storage('usuario-logado').id;
            const r = await Salvar(id, referencia, cep, rua, numero, complemento, bairro, cidade, estado );
            toast.dark('Endereço salvo');

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
                            <label id="lb"> Referência: </label>
                            <input type='text' value={referencia} onChange={e => setReferencia(e.target.value)} maxLength={30}/>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> &nbsp; </label>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> CEP: </label>
                            <input type='text' value={cep}  onChange={e => setCep(formatCep(e.target.value))}/>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> Rua: </label>
                            <input type='text' value={rua} onChange={e => setRua(e.target.value)} maxLength={30}/>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> Número: </label>
                            <input type='text' value={numero}  onChange={e => setNumero(formatNum(e.target.value))}/>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> Complemento: </label>
                            <input type='text' value={complemento}  onChange={e => setComplemento(e.target.value)} maxLength={30}/>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> Bairro: </label>
                            <input type='text' value={bairro}  onChange={e => setBairro(e.target.value)} maxLength={30}/>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> &nbsp; </label>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> Cidade: </label>
                            <input type='text' value={cidade}  onChange={e => setCidade(e.target.value)} maxLength={30}/>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> Estado: </label>
                            <input type='text' value={estado}  onChange={e => setEstado(e.target.value)} maxLength={30}/>
                        </div>
                        <div className='div-form'>
                            <label id="lb"></label>
                            <div className='btn div-form'>
                                <button onClick={salvarEndereco}> Salvar </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}