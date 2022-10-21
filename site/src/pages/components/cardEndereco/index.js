import './index.scss'

export default function CardEndereco({ item: { id, referencia, cep, rua, bairro, cidade, estado, numero, complemento }, selecionar, selecionado }) {

    return (
        <div className='comp-card-endereco'
             onClick={() => selecionar(id)}
            style={{ borderColor: selecionado ? '#b512da' : '#a3a3a3' }}
        >
            <div className='tipo'>{referencia}</div>
            <div>
                <div className='end'>{rua}, {numero} - {complemento}</div>
                <div className='cep'>{cep} - {bairro}, {cidade}/{estado}</div>
            </div>
        </div>
    )
}