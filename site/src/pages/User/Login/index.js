import "./index.scss"
import { EntrarLogin } from '../../../api/UsuarioApi.js'
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

    function MostrarSenhaClick(){
        SetMostrarSenha(true)
    }
    async function Entrar() {
        ref.current.continuousStart();
        setCarregando(true);

        try {
            const r = await EntrarLogin(email, senha)
            setTimeout(() => {
                navigate('/teste'); 
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
                <img src="../images/logo.png" alt="logo" className="logo" />
            </div>
            <div className="barra_lateral"></div>
            <div className="botoes">
                <h1 className="titulo">Entrar</h1>
                <div className="cx1">
                    <h6>E-mail</h6>
                    <input className="email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <p></p>
                <div className="cx2">
                    <h6>Senha</h6>
                    <input className="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)}></input>
                    <button onClick={MostrarSenhaClick}> Mostrar Senha </button>
                    {mostrarSenha &&
                    senha
                    }
                    <a className="esqueceu">Esqueceu a senha?</a>
                </div>
                <div className="botao">
                    <div>
                        {erro}
                    </div>
                <button className="entrar" onClick={Entrar}>ENTRAR</button>
                </div>
                <div className="criar_conta">
                    <a>criar conta</a>

                </div>


            </div>
        </section>
    )
}
