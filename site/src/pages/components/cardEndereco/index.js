import './index.scss'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify"
import { RemoverEndereco } from '../../../api/EnderecoAPI';

export default function CardEndereco({ item: { id, referencia, cep, rua, bairro, cidade, estado, numero, complemento }, selecionar, selecionado }) {

    async function DeletarEndereco(id, nome) {
        confirmAlert({
            title: 'Remover Endereço',
            message: `Deseja remover o Endereço ${nome}?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        await RemoverEndereco(id, nome);
                        toast.dark('🔥 Endereço removido');
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

    return (
        <div className='comp-card-endereco'
             onClick={() => selecionar(id)}
             style={{ borderColor: selecionado ? '#E52A45' : '' }}
        >
            <div className='div-infos-endereco'>
                <div className='referencia'>{referencia}</div>
                <div className='end'>{rua}, {numero} - {complemento}</div>
                <div className='cep'>{cep} - {bairro}, {cidade}/{estado}</div>
            </div>

            <div className="div-editar-deletar">
                <button className="excluir-button"
                        onClick={e => {
                                e.stopPropagation();
                                DeletarEndereco(id, referencia);
                            }}>
                    <img src="../images/excluir.png" alt=""/>
                </button>
            </div>
        </div>
    )
}