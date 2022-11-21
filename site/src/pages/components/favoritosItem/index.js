import { API_URL } from '../../../api/config'
import { useNavigate } from "react-router-dom";

import Avaliacao from '../../components/Avaliacao'

import './index.scss'

export default function Favoritos({ item: { produto: { id, nome, preco, imagem, estrela } } }, props ) {

    function exibirImagem() {
        if (imagem) {
            return API_URL + '/' + imagem; 
        }
    }

    function BuscarProdutoFavorito(id){
        if(id){
            navigate(`/produto/${id}/detalhe`)
        }
    }

    const navigate = useNavigate()

    return (
        <div className="card-produtos-curtidos" onClick={() => BuscarProdutoFavorito(id)}>
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
                    <Avaliacao aval={estrela} />
                </div>
            </div>
        </div>
    )
}