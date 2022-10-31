import "./index.scss"

export default function Cabecalho(){
    return(
        <div className="comp-cabecalho">
            <a href="/">
                <img src="/images/logo-branco.gif" alt=""/>
            </a>
            <p> Seja bem-vindo, Admin </p>
            <div className="bolinha">
                <span> A </span>
            </div>
        </div>
    );
}