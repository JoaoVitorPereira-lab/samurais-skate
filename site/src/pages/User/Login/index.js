import "./index.scss"


export default function Login() {
    return (
        <section className="page-login">
            <div>
                <img src="../images/logo.png" alt="logo" className="logo" />
            </div>
            <div className="barra_lateral"></div>
            <div className="botoes">
                <h1>Entrar</h1>
                <div className="cx1">
                    <h6>E-mail</h6>
                    <input className="email" type="text"></input>
                </div>
                <p></p>
                <div className="cx2">
                    <h6>Senha</h6>
                    <input className="senha" type="text"></input>
                    <button className="esqueceu">Esqueceu a senha?</button>
                    <button className="entrar">Entrar</button>
                </div>

            </div>
        </section>
    )
}
