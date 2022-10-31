import "./index.scss";

import { useEffect, useState } from 'react'
import { BuscarPorIDFavoritos } from '../../../api/FavoritosAPI'
import Storage from 'local-storage'

import Favoritos from '../../components/favoritosItem'
import Cabecalho from "../../components/cabecalho";
import Rodape from '../../components/rodape'
import { Link, useNavigate } from "react-router-dom";

export default function Favoritos() {

    const [itens, setItens] = useState([]);

    async function CarregarFavoritos(){
        let favoritos = Storage('favoritos');
        if (favoritos) {
            let temp = [];

            for (let produto of favoritos){
                let p = await BuscarPorIDFavoritos(produto.id);
                temp.push({
                    produto: p
                })
            }
            setItens(temp);
            console.log(temp);
            console.log(itens);
        }
    }

    function removerItem(id) {
        let favoritos = Storage('favoritos');
        favoritos = favoritos.filter(item => item.id != id);

        Storage('favoritos', favoritos);
        CarregarFavoritos();
    }

    function BuscarProdutoFavorito(id){
        if(id){
            navigate(`/produto/${id}/detalhe`)
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (!Storage('usuario-logado')) {
            navigate('/Login')
        }
        CarregarFavoritos();
    }, [])
    
    return (
        <div>
            <div>
                <Cabecalho pagina="../images/Heart.png" />
            </div>

            <main className="pg-curtidos">
                <div className="titulo">
                    Você está na página:{" "}
                    <span className="titulo-span"> HOME / FAVORITOS </span>
                </div>

                {itens.map(item =>
                    <div className="excluir" onClick={() => BuscarProdutoFavorito(item.produto.id)}>
                        <Favoritos item={item}/>
                        <div className="coracao">
                            <img className="img-coracao" src="../images/Heart.png" alt="" />
                            <div onClick={() => removerItem(item.produto.id)} className="botao-excluir">
                                Excluir
                            </div>
                        </div>
                    </div>
                )}

            </main>

            <Rodape />
        </div>
    );
}
