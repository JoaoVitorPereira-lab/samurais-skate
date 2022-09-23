import "./index.scss"
import { LoginAdm } from '../../../api/AdminAPI.js'
import { useRef, useState} from "react"
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { toast } from 'react-toastify'



export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate()
    const ref = useRef()

    async function Entrar() {
        ref.current.continuousStart();
        setCarregando(true);

        try {
            const r = await LoginAdm(email, senha)
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
            <LoadingBar color="#E52A45" ref={ref}/>
            <div>
                <img src="../images/logo.png" alt="logo" className="logo" />
            </div>
            <div className="barra_lateral"></div>
            <div className="botoes">
                <h1>Entrar</h1>
                <div className="cx1">
                    <h6>E-mail</h6>
                    <input className="email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <p></p>
                <div className="cx2">
                    <h6>Senha</h6>
                    <input className="senha" type="text" value={senha} onChange={e => setSenha(e.target.value)}></input>
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
