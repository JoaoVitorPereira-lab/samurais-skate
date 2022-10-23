import Cabecalho from "../../components/cabecalho";
import { useEffect } from 'react'
import storage from 'local-storage'
import Rodape from '../../components/rodape'
import "./index.scss";
import { useNavigate } from "react-router-dom";

export default function ProdutoDetalhe() {

  const navigate = useNavigate()

  useEffect(() =>{
    if(!storage('usuario-logado')){
        navigate('/Login')
    }
},[])
  return (
    <div>
      <div>
        <Cabecalho pagina="../images/Heart.png" />
      </div>

      <main className="Pagina-Curtidos">
        <div className="titulo">
          Você está na página:{" "}
          <span className="titulo-span"> HOME / FAVORITOS </span>
        </div>

        <div className="card-produtos-curtidos">
          <div className="img-produto">
            <img
              className="produtos-imgs"
              src="../images/Jordan.png"
              alt=""
              width="200px"
            />
          </div>

          <div className="infos-produto">
            <div className="nome-produto">
              <p className="titulo"> TÊNIS NIKE SB DUNK HIGH PRO ISO </p>
            </div>

            <div>
              <h1 className="preco-produtos"> R$899,99 </h1>
            </div>

            <div className="Avaliacao">
            <img src="../images/aval3.png" alt="" />
            </div>
          </div>

          <div className="coracao">
            <img className="img-coracao" src="../images/Heart.png" alt="" />
            <div className="remover-btn">
                Remover
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
