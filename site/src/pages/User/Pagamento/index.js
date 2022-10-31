import Cabecalho from "../../components/cabecalho";
import Menu from "../../components/MenuConfig";
import Rodape from "../../components/rodape";
import { useState, useEffect } from "react";
import storage from 'local-storage'
import { BuscarCartao } from '../../../api/UsuarioApi'

import "./index.scss";

export default function Pagamento() {
  const[nome,setNome] = useState()
  const[numero,setNumero] = useState()
  const[vencimeto,setVencimento] = useState()
  const[cvv,setCvv] = useState()
  const[usuario,setUsuario] = useState()
  const[cartao,setCartao] = useState([])
  
  useEffect(() =>{
    if(storage('usuario-logado')){
      const nome = storage('usuario-logado')
      setUsuario(nome.id)
  }
  })

  function Pegarid(){
      const nome = storage('usuario-logado')
      setUsuario(nome.id)
  }
  
  
  async function BuscarCartoes (){
    const resposta = await BuscarCartao(usuario)
    setCartao(resposta)
  }
 
  useEffect(() =>{
    BuscarCartoes();
},[])

  return (
    <main className="main-pagamento">
      <Cabecalho />
      <Menu />
      <div className="div-pagamento">
        <div className="div-titulo-pagamento">
          <h1> Cartões </h1>
          <label> Gerencie seus cartões </label>
        </div>

        <div className="div-cartoes-pagamento">
          <div className="div-column-pagamento">
              <div className="nomes">
              <h2> Cadastrados: </h2>
              {cartao.map(item =>
                <div className="div-cartoes-cadastrados">
                  <h3> {item.nome} </h3>
                </div>
                )}
              
             </div>
            
            </div>
            
          
            <div className="linha"> </div>  
          <div className="div-cadastrar-cartao">
            <h2> Cadastrar: </h2>
            <div className="cartao-credito">
              <div className="cartao-infos">
                <p className="cartao-p-1"> Nome do cartão </p>
                <p> Número do cartão </p>
                <p> Vencimento </p>
                <p> CVV </p>
              </div>

              <div className="cartao-inputs">
                <input  type="text" />
                <br />
                <input className="input-numero" type="number" />
                <br />
                <input className="input-vencimeto" type="number" />
                <br />
                <input type="text" />
                <br />
                <div>
                    <div className="botao-cadastro-cartao">
                        <button> Salvar </button>
                    </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Rodape />
    </main>
  );
}
