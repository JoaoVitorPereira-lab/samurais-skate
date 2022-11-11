import "./index.scss";
import { useNavigate } from "react-router-dom";

export default function Menu() {

  const Navigate = useNavigate();

  function ComprasClick(){
    Navigate('/Compras')
  }

  function MeusDadosClick(){
    Navigate('/Dados')
  }

  function PagamentoClick(){
    Navigate('/Pagamento')
  }

  function EnderecoClick(){
    Navigate('/Endereco')
  }

  function CentraldeAjudaClick(){
    Navigate('/CentralAjuda')
  }
  

  return (
    <main className="main-config">
      <div className="titulo">
        <h3> Meu Perfil </h3>
      </div>

      <div className="infos-div">
        <div className="compras-config" onClick={ComprasClick}>
          <div>
            <img src="/images/Wallet.png" alt="" />
          </div>
          <div className="div-texto">
            <label> Compras </label>
          </div>
        </div>

        <div className="compras-config" onClick={MeusDadosClick}>
          <div>
            <img src="/images/Microsoft Admin.png" alt="" />
          </div>
          <div className="div-texto">
            <label> Meus Dados </label>
          </div>
        </div>

        <div className="compras-config" onClick={PagamentoClick}>
          <div>
            <img src="/images/Credit Card.png" alt="" />
          </div>
          <div className="div-texto">
            <label> Cartões </label>
          </div>
        </div>

        <div className="compras-config" onClick={EnderecoClick}>
          <div>
            <img src="/images/Location.png" alt="" />
          </div>
          <div className="div-texto">
            <label> Endereço </label>
          </div>
        </div>

        <div className="compras-config" onClick={CentraldeAjudaClick}>
          <div>
            <img src="/images/Online Support.png" alt="" />
          </div>
          <div className="div-texto">
            <label> Central de Ajuda </label>
          </div>
        </div>
      </div>
      
      <div className="linha-config">        
      </div>
    </main>
  );
}
