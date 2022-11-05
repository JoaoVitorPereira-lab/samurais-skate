import './index.scss'

export default function CardCartao({ item: { id, nome, numero, tipoCartao }, selecionar, selecionado }) {

    return (
        <div className='comp-card-cartao'
             onClick={() => selecionar(id)}
             style={{ borderColor: selecionado ? '#E52A45' : '' }}
        >
            <div className='nome-cartao'>{nome}</div>
            <div className='numero-cartao'> {numero} </div>
            <div className='tipo-cartao'> {tipoCartao} </div>
        </div>
    )
}