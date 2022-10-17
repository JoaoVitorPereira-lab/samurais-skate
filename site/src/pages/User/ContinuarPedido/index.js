import './index.scss'

export default function ConsultarTenis(){

    return(
        <main className='main-continuarPedido'>
            <header className="header-pedido">
                <img src="../images/logo.png" alt="" width="200" height="200" style={{ marginLeft: 40 }}/>

                <div className="div-finalizarpedido">
                    <text> Total: </text>
                    <span> R$ 1029,90 </span>

                    <button> Finalizar Pedido </button>
                </div>
            </header>

            <section className="sec-enderecos">
                <p> Endereços </p>

                <div className="teste">
                    <div className="div-endereco">
                        <p className="p-1"> Casa </p>
                        <text> Av. Coronel Octaviano de Freitas Costa, 463 - Frei </text>
                        <p> 04773-000 - São Paulo/SP </p>
                    </div>
                </div>

                <section className="sec-button">
                    <button> NOVO ENDEREÇO </button>
                </section>
            </section>
        </main>
    )
}