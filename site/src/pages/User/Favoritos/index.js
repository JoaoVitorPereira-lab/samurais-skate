import "./index.scss";

import { useEffect, useState } from 'react'
import { BuscarPorIDFavoritos } from '../../../api/FavoritosAPI'
import Storage from 'local-storage'

import Favoritos from '../../components/favoritosItem'
import Cabecalho from "../../components/cabecalho";
import Rodape from '../../components/rodape'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Fav() {

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
        }
        if(favoritos.length === 0){
            toast.error('Favoritos vazio, Coloque um item nos favoritos')
            navigate('/')
        }
    }

    function removerItem(id) {
        let favoritos = Storage('favoritos');
        favoritos = favoritos.filter(item => item.id != id);

        Storage('favoritos', favoritos);
        toast.dark(`Produto removido dos favoritos com sucesso!`);
        CarregarFavoritos();
    }

    const navigate = useNavigate()

    useEffect(() => {
        CarregarFavoritos();
        
        if (!Storage('usuario-logado')) {
            navigate('/Login')
        }

        if(!Storage('favoritos')){
            toast.error('Favoritos vazio, Coloque um item no favoritos')
            navigate('/')
        }
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
                    <div className="excluir">
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
