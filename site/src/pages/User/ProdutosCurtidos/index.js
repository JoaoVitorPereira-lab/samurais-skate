import Cabecalho from "../../components/cabecalhoUser/index.js";
import Rodape from '../../components/rodape/index.js'
import "./index.scss";

export default function ProdutoDetalhe() {
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
