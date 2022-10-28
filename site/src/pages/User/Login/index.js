import "./index.scss"
import { EntrarLogin } from '../../../api/UsuarioApi.js'
import strorage from 'local-storage'
import { useRef, useState} from "react"
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'


export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
 
    const [mostrarSenha, SetMostrarSenha] = useState(false);
  
  
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate()
    const ref = useRef()

    function HomeClick(){
        navigate('/')
    }

    function MostrarSenhaClick(){
        SetMostrarSenha(true)
    }
    
    function OcultarSenhaClick(){
        SetMostrarSenha(false)
    }
    async function Entrar() {
        ref.current.continuousStart();
        setCarregando(true);

        try {
            const r = await EntrarLogin(email, senha)
            strorage('usuario-logado', r)
            setTimeout(() => {
                navigate('/'); 
            }, 3000);
        }
        catch (err) {
          if(err.response.status === 401){
                ref.current.complete()
                setErro(err.response.data.Erro)
            }
        }
    }

    return (
        <section className="page-login">
            <LoadingBar color="#E52A45" ref={ref}/>
            <div>
                <img onClick={HomeClick} src="/images/logo-branco.gif" alt="logo" className="logo" />
            </div>
            <div className="barra_lateral"></div>
            <div className="botoes">
                <h1     className="titulo">Entrar</h1>
                <div className="cx1">
                    <h6>E-mail</h6>
                    <input className="email" type="text" value={email} placeholder="Ex: user@user.com" onChange={e => setEmail(e.target.value)}/>
                </div>
                <p></p>
                <div className="cx2">
                    <h6>Senha</h6>
                    {!mostrarSenha &&
                    <input className="senha" type="password" value={senha} placeholder="1234..." onChange={e => setSenha(e.target.value)}></input>
                    }
                    {mostrarSenha &&
                    
                    <input className="senha" type="text" value={senha} onChange={e => setSenha(e.target.value)}></input>
                    
                    }
                    {!mostrarSenha &&
                    <img className="olho_mostrar_senha" src="../images/olho sem x.png" onClick={MostrarSenhaClick} />                    
                    }
                    {mostrarSenha &&
                    <img className="olho_mostrar_senha" src="../images/olho com x.png" onClick={OcultarSenhaClick}/>
                    }
                    <a className="esqueceu">Esqueceu a senha?</a>
                </div>
                <div className="botao">
                    <div>
                        <span className="ERRO">
                            {erro}
                        </span>
                    </div>
                    <button className="entrar" onClick={Entrar}>Entrar</button>
                </div>
                <div className="criar_conta">
                    <a href="../CriarConta">criar conta</a>
                </div>
            </div>
        </section>
    )
}
