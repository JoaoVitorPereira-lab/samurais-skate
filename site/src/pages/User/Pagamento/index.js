import Cabecalho from "../../components/cabecalho";
import Menu from "../../components/MenuConfig";
import Rodape from "../../components/rodape";
import { useState, useEffect } from "react";
import storage from 'local-storage'
import { BuscarCartao, CadastrarCartao } from '../../../api/CartaoAPI'
import { toast } from "react-toastify"

import "./index.scss";

export default function Pagamento() {
  const[nome,setNome] = useState()
  const[numero,setNumero] = useState()
  const[vencimeto,setVencimento] = useState()
  const[cvv,setCvv] = useState()
  const[usuario,setUsuario] = useState()
  const[cartao,setCartao] = useState([])
  const [id,setId] = useState(0)
  
  useEffect(() =>{
    if(storage('usuario-logado')){
      const nome = storage('usuario-logado')
      setUsuario(nome.id)
  }
  })

  function Pegarid(){
      const nome = storage('usuario-logado')
      setUsuario(nome.id)
      console.log(setUsuario)
  }
  
  
  async function BuscarCartoes (){
    const resposta = await BuscarCartao(usuario)
    setCartao(resposta)
  }

  async function CadastrarCartaoClick (){
    try {
      const novoCartao = await CadastrarCartao (usuario,nome,numero,vencimeto,cvv)
     
      toast.dark('Cartão cadastrado com sucesso 🚀'); 

      setId(novoCartao.id);
    } 
    
    catch (err) {
      if (err.response)
          toast.dark(err.response.data.erro)
      else {
          toast.dark(err.message)
      }
  }
  }      
    
   
  
    
    useEffect(() =>{
        Pegarid();
        BuscarCartoes();
    },  [cartao] )

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
                <input value={nome}  type="text" maxlength="10" onChange={e => setNome(e.target.value)}/>
                <br />
                <input value={numero} className="input-numero" type="number"  minLength={1} maxLength={16} onChange={e => setNumero(e.target.value)}/>
                <br />
                <input value={vencimeto} className="input-vencimeto" type="text" maxLength={5} onChange={e => setVencimento (e.target.value)} />
                <br />
                <input value={cvv} type="number" min={1} max={3} onChange={e => setCvv(e.target.value)}/>
                <br />
                <div>
                    <div className="botao-cadastro-cartao">
                        <button onClick={CadastrarCartaoClick}> Salvar </button>
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
