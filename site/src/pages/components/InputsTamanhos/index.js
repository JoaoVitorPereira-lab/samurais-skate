import './index.scss'

export default function CardEndereco({ item: {  tamanho }, selecionar, selecionado }) {

    return (
        <div className='comp-inputs-tamanhos'
             onClick={() => selecionar(tamanho)}
             style={{ borderColor: selecionado ? '#E52A45' : '' }}
        >
            <text> {tamanho} </text>
        </div>
    )
}