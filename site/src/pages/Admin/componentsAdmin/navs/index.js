import "./index.scss";

export default function Navs(props) {

    return (
        <nav className="comp-navs">

            <div className="div-navs">

                <div className="navs-produtos not">
                    <img src="../images/home.png" className="imgs-nav" alt="" />
                    <span> Home </span>
                </div>


                <div className="navs-produtos">
                    <img src="../images/cadastrar.png" className="imgs-nav" alt="" />
                    <span> Cadastrar </span>
                </div>

                <div className="navs-produtos">
                    <img src="../images/skate.png" className="imgs-nav" alt="" />
                    <span> Produtos </span>
                </div>

                <div className="navs-produtos">
                    <img src="../images/pedidos.png" className="imgs-nav" alt="" />
                    <span> Pedidos </span>
                </div>
            </div>

            <div className="div-buscar">
                <input type="text" className="buscar-input" placeholder="Buscar pedido" />
                <div>
                    <img src="../images/buscar.png" className="buscar-img" alt="" />
                </div>
            </div>

        </nav>
    );
}