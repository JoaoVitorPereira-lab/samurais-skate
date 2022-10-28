import { API_URL } from '../../../api/config'

import './index.scss'

export default function Favoritos({ item: { produto: { nome, preco, imagem } } } ) {

    function exibirImagem() {
        if (imagem) {
            return API_URL + '/' + imagem; 
        }
    }

    return (
        <div className="card-produtos-curtidos">
            <div className="img-produto">
                <img
                    className="produtos-imgs"
                    src={exibirImagem()}
                    alt=""
                    width="200px"
                />
            </div>

            <div className="infos-produto">
                <div className="nome-produto">
                    <p className="titulo"> {nome} </p>
                </div>

                <div>
                    <h1 className="preco-produtos"> {preco} </h1>
                </div>

                <div className="Avaliacao">
                    <img src="../images/aval3.png" alt="" />
                </div>
            </div>
        </div>
    )
}