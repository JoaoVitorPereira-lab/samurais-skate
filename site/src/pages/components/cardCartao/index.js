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
                        const resposta = await RemoverCartao(id, nome);

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
            <div className='nome-cartao'>{nome}</div>
            <div className='numero-cartao'> {numero} </div>
            <div className='tipo-cartao'> {tipoCartao} </div>

            <div className="div-editar-deletar" style={{display: "flex", flexDirection: "row"}}>
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