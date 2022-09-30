import "./index.scss"
import { EntrarLogin } from '../../../api/UsuarioApi.js'
import { useRef, useState} from "react"
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const[nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [erro, setErro] = useState('')
 
    const [mostrarSenha, SetMostrarSenha] = useState(false);
    const navigate = useNavigate()
    function MostrarSenhaClick(){
        SetMostrarSenha(true)
    }
    async function Entrar() {
        try {
            const r = await EntrarLogin(email, senha)
            setTimeout(() => {
                navigate('/teste'); 
            }, 3000);
        }
        catch (err) {
          if(err.response.status === 401){
                setErro(err.response.data.Erro)
            }
        }
    }
    return (
        <section className="page-login">
            <div>
                <img src="../images/logo.png" alt="logo" className="logo" />
            </div>
            <div className="barra_lateral"></div>
            <div className="botoes">
                <h1>CRIAR CONTA</h1>
                <div className="Formulario">

                        <div className="cx1">
                            <h6>Nome</h6>
                            <input className="email" type="text" value={nome} onChange={e => setNome(e.target.value)}/>
                        </div>
                        <p></p>
                        <div className="cx2">
                            <h6>Sobrenome</h6>
                            <input className="senha" type="text" value={sobrenome} onChange={e => setSobrenome(e.target.value)}></input>
                        </div>
                        <h6>E-mail</h6>
                            <input className="email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                            <h6>Senha</h6>
                            <input className="email" type="password" value={senha} onChange={e => setSenha(e.target.value)}/>
                        <button onClick={MostrarSenhaClick}> Mostrar Senha </button>
                            {mostrarSenha &&
                            senha
                            }
                        <div className="botao">
                            <div>
                                {erro}
                            </div>
                        <button className="entrar" onClick={Entrar}>Criar Conta</button>
                        </div>
                        </div>

                        <div className="criar_conta">
                            <a>Entrar</a>

                </div>

            </div>
        </section>
    )
}