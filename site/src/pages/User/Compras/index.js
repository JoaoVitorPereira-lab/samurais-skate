import Cabecalho from "../../components/cabecalho";
import Menu from "../../components/MenuConfig";
import Rodape from "../../components/rodape";

import './index.scss'

export default function Compras() {
  return (
    <main className="main-compras">
      <Cabecalho />
      <Menu />

      <div className="div-compras">

        <div className="esquerda-compras">

            <div className="nome-pedido">
             <h3> Pedido de Pedro </h3>
            </div>

            <div className="verpedido-pedido">
             <h3> Ver pedido </h3>
             <div className="linha-verpedido"> </div>
            </div>

        </div>

        <div className="direita-compra">

             <div className="status-pedido">
                 <h3> Status </h3>
             </div>

        

            <div className="Valor-pedido">
                <h3> R$239,90 </h3>
             </div>

        </div>

      </div>

      <Rodape />
      
    </main>
  );
}
