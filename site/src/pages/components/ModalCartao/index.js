import { useState } from 'react'
import './index.scss'
import { CadastrarCartao } from '../../../api/CartaoAPI';
import Storage from 'local-storage'
import { toast } from 'react-toastify'

export default function ModalEndereco({ exibir, fechar }) {

    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [cvv, setCvv] = useState('');
    const [tipo, setTipo] = useState('');

    function formatNCartao(v) {
        v = v.replace(/\D/g,""); // Permite apenas dígitos
        v = v.replace(/(\d{4})/g, "$1-"); // Coloca um ponto a cada 4 caracteres
        v = v.replace(/\.$/, ""); // Remove o ponto se estiver sobrando
        v = v.substring(0, 19)// Limita o tamanho

        return v;
    }

    function formatVencCartao(v) {
        v = v.replace(/\D/g, ""); // Permite apenas dígitos
        v = v.replace(/(\d{2})/g, "$1/"); // Coloca um ponto a cada 4 caracteres
        v = v.substring(0, 5)// Limita o tamanho

        return v;
    }

    function formatCvv(v) {
        v = v.replace(/\D/g, "");
        v = v.replace(/(\d{3})/g, "$1/");
        v = v.substring(0, 3);

        return v;
    }

    async function salvarCartao() {
        try {
            const id = Storage('usuario-logado').id;
            await CadastrarCartao(id, nome, numero, vencimento, cvv, tipo);
            toast.dark('Cartão salvo');

            fechar();
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }


    return (
        <div className='comp-modal-cartao'>
            <div className={`modal-cartao ${exibir ? 'exibir' : ''}`}>
                <div className='conteudo'>
                    <h1 className='h1-conteudo'> Novo Cartão </h1>

                    <div className='form'>
                        <div className='div-form'>
                            <label id="lb"> Nome do cartão: </label>
                            <input type='text' value={nome} onChange={e => setNome(e.target.value)} maxLength={30}/>
                        </div>
                        <div className='div-form'>
                            <label id="lb"> N° do Cartão: </label>
                            <input type='text' value={numero}  onChange={e => setNumero(formatNCartao(e.target.value))}  />
                        </div>
                        <div className='div-form'>
                            <label id="lb"> Vencimento: </label>
                            <input type='text' value={vencimento}  onChange={e => setVencimento(formatVencCartao(e.target.value))}  />
                        </div>
                        <div className='div-form'>
                            <label id="lb"> CVV: </label>
                            <input type='number' value={cvv}  onChange={e => setCvv(formatCvv(e.target.value))}  />
                        </div>
                        <div className='div-form-select div-form-select-1'>
                            <label id="lb"> Tipo: </label>
                            <select value={tipo} onChange={e => setTipo(e.target.value)}>
                                <option disabled hidden selected>Selecione</option>
                                <option>Crédito</option>
                                <option>Débito</option>
                            </select>
                        </div>

                        <div className='div-form'>
                            <label id="lb"></label>
                            <div className='btn div-form'>
                                <button onClick={salvarCartao}> Salvar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* 
<div className='div-form-select div-form-select-2'>
    <label id="lb"> Parcela: </label>
    <select className='select-parcela' value={parcela} onChange={e => setParcela(e.target.value)}  >
        <option disabled hidden selected>Selecione</option>
        <option value={0}>01x à Vista</option>
        <option value={1}>01x sem Juros</option>
        <option value={2}>02x sem Juros</option>
        <option value={3}>03x sem Juros</option>
        <option value={4}>04x sem Juros</option>
        <option value={5}>05x sem Juros</option>
        <option value={6}>06x sem Juros</option>
    </select>
</div> 
*/