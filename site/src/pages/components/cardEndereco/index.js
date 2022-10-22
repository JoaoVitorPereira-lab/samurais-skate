import './index.scss'

export default function CardEndereco({ item: { id, referencia, cep, rua, bairro, cidade, estado, numero, complemento }, selecionar, selecionado }) {

    return (
        <div className='comp-card-endereco'
             onClick={() => selecionar(id)}
             style={{ borderColor: selecionado ? '#E52A45' : '' }}
        >
            <div className='referencia'>{referencia}</div>
            <div className='end'>{rua}, {numero} - {complemento}</div>
            <div className='cep'>{cep} - {bairro}, {cidade}/{estado}</div>
        </div>
    )
}