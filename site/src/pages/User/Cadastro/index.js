import "./index.scss"
import { CadastrarLogin, CadastrarConta } from '../../../api/UsuarioApi.js'
import { useRef, useState} from "react"
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    
    const [erro, setErro] = useState('')
 
    const [mostrarSenha, SetMostrarSenha] = useState(false);
    const navigate = useNavigate()

    function OcultarSenhaClick(){
        SetMostrarSenha(false)
    }

    function MostrarSenhaClick(){
        SetMostrarSenha(true)
    }
    async function CriarConta() {
        try {
            const r = await CadastrarConta(nome, sobrenome)
            const resp = await CadastrarLogin (email, senha, r.id)
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
        <section className="page-cadastro">
            <div>
                <img src="../images/logo.png" alt="logo" className="logo" />
            </div>
            <div className="barra_lateral"></div>
            <div className="botoes">
                <h1 className="titulo">CRIAR CONTA</h1>
                <div className="Formulario">

                        <div className="cx1">
                            <h6>Nome</h6>
                            <input className="email" type="text" placeholder="user" value={nome} onChange={e => setNome(e.target.value)}/>
                        </div>
                        <p></p>
                        <div className="cx2">
                            <h6>Sobrenome</h6>
                            <input className="senha" type="text" value={sobrenome} placeholder="user" onChange={e => setSobrenome(e.target.value)}></input>
                        </div>
                        <h6>E-mail</h6>
                            <input className="email" type="text" value={email} placeholder="user@user" onChange={e => setEmail(e.target.value)}/>
                            <h6>Senha</h6>
                            {!mostrarSenha &&
                    <input className="senha" type="password" value={senha} placeholder="1234..." onChange={e => setSenha(e.target.value)}></input>
                    }
                    {mostrarSenha &&
                    
                    <input className="senha" type="text" value={senha} placeholder="1234..." onChange={e => setSenha(e.target.value)}></input>
                    
                    }
                    {!mostrarSenha &&
                    <img className="olho_mostrar_senha" src="../images/olho sem x.png" onClick={MostrarSenhaClick} />                    
                    }
                    {mostrarSenha &&
                    <img className="olho_mostrar_senha" src="../images/olho com x.png" onClick={OcultarSenhaClick}/>
                    }
                        <div className="botao">
                            <div>
                                {erro}
                            </div>
                        <button className="entrar" onClick={CriarConta}>Criar Conta</button>
                        </div>
                        </div>

                        <div className="criar_conta">
                            <a>Entrar na sua conta</a>

                </div>

            </div>
        </section>
    )
}