import "./index.scss"
import { CadastrarLogin, CadastrarConta } from '../../../api/UsuarioApi.js'
import { useRef, useState} from "react"
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    
    const [erro, setErro] = useState('')

    
    const[carregando,setCarregando] = useState(false) 
    const [mostrarSenha, SetMostrarSenha] = useState(false);
    const navigate = useNavigate()
    const ref = useRef()

    function HomeClick(){
        navigate('/')
    }

    function OcultarSenhaClick(){
        SetMostrarSenha(false)
    }

    function MostrarSenhaClick(){
        SetMostrarSenha(true)
    }
    async function CriarConta() {
        ref.current.continuousStart();
        setCarregando(true)
        try {
            const r = await CadastrarConta(nome, sobrenome)
            const resp = await CadastrarLogin (email, senha, r.id)
            setTimeout(() => {
                navigate('/Login'); 
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
        <section className="page-cadastro">
            <LoadingBar color="#E52A45" ref={ref}/>
            <div>
                <img onClick={HomeClick} src="/images/logo-branco.gif" alt="logo" className="logo" />
            </div>
            <div className="barra_lateral"></div>
            <div className="botoes">
                <h1 className="titulo">CRIAR CONTA</h1>
                <div className="Formulario">

                        <div className="cx1">
                            <h6 className="nome">Nome</h6>
                            <input className="email" type="text" placeholder="user" value={nome} onChange={e => setNome(e.target.value)}/>
                        </div>
                        <p></p>
                        <div className="cx2">
                            <h6 className="sobrenome">Sobrenome</h6>
                            <input className="senha" type="text" value={sobrenome} placeholder="user" onChange={e => setSobrenome(e.target.value)}></input>
                        </div>
                        <h6 className="enail1">E-mail</h6>
                            <input className="email" type="text" value={email} placeholder="user@user" onChange={e => setEmail(e.target.value)}/>
                            <h6 className="senha1">Senha</h6>
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
                        <button className="criar" onClick={CriarConta}>Criar Conta</button>
                        </div>
                        </div>

                        <div className="criar_conta">
                            <a href="../Login">Entrar na sua conta</a>

                </div>

            </div>
        </section>
    )
}