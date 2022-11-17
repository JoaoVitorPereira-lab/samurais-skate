import './index.scss'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { RemoverCartao } from '../../../api/CartaoAPI';
import { toast } from "react-toastify"

export default function CardCartao({ item: { id, nome, numero, tipoCartao }, selecionar, selecionado }) {

    async function DeletarCartao(id, nome) {
        confirmAlert({
            title: 'Remover Cartão',
            message: `Deseja remover o cartão ${nome}?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        await RemoverCartao(id, nome);
                        toast.dark('🔥 Cartão removido');
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

    return (
        <div className='comp-card-cartao'
             onClick={() => selecionar(id)}
             style={{ borderColor: selecionado ? '#E52A45' : '' }}
        >
            <div className='div-infos-cartao'>
                <span className='nome-cartao'>{nome}</span>
                <div className='numero-cartao'> {numero} </div>
                <div className='tipo-cartao'> {tipoCartao} </div>
            </div>

            <div className="div-editar-deletar">
                <button className="excluir-button"
                        onClick={e => {
                                e.stopPropagation();
                                DeletarCartao(id, nome);
                            }}>
                    <img src="../images/excluir.png" alt=""/>
                </button>
            </div>
        </div>
    )
}

{/* <section class="credit-card">
    <div class="card">
        <div class="face front">
            <img src="/images/chip.svg" alt="Chip" id="chip" class="absolute" />
            <img src="/images/signal.svg" alt="Signal" id="signal" class="absolute" />
            <p id="owner" class="absolute">MAIATTO DEVasdasd asd asdasd as d asdasdsadasd asdasdadsa asdasdad</p>
        </div>
        <div class="face back absolute">
            <div id="graybar" class="absolute"></div>
            <div id="card-info" class="absolute">
                <p id="card-number">1234 5678 9999 0000</p>
                <div class="flex">
                    <p class="flex informations">
                        <span class="label">MEMBER SINCE</span>
                        <span>01/01</span>
                    </p>
                    <p class="flex informations">
                        <span class="label">VALID THRU</span>
                        <span>12/29</span>
                    </p>
                    <p class="flex informations">
                        <span class="label">SECURITY CODE</span>
                        <span>000</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section> */}