import './index.scss'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { AlterarStatus } from '../../../api/StatusAPI';

export default function ModalStatus({ id, exibir, fechar }) {
    const [status, setStatus] = useState('');

    async function MudarStatus() {
        try {
            await AlterarStatus(id, status);
            toast.dark('Status modificado com sucesso!!!');

            fechar();
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }

    return (
        <div className='comp-modal-status'>
            <div className={`modal-status ${exibir ? 'exibir' : ''}`}>
                <div className='conteudo'>
                    <h1 className='h1-conteudo'> Alterar Status </h1>

                    <div className='form'>
                        <div className='div-form'>
                            <input type='radio' value="Pedido em Preparação" onChange={e => setStatus(e.target.value)}  name="input-radio"/> Pedido em Preparação
                        </div>
                        <div className='div-form'>
                            <input type='radio' value="Confirmando Pagamento" onChange={e => setStatus(e.target.value)} name="input-radio"/> Confirmando Pagamento
                        </div>
                        <div className='div-form'>
                            <input type='radio' value="Entregue" onChange={e => setStatus(e.target.value)} name="input-radio"/> Entregue
                        </div>
                        <div className='div-form'>
                            <input type='radio' value="Cancelado" onChange={e => setStatus(e.target.value)} name="input-radio"/> Cancelado
                        </div>

                        <div className='div-btn'>
                            <div className='btn div-form'>
                                <button onClick={MudarStatus}> Alterar </button>
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