import './index.scss'

export default function Rodape(){
    return(
        <section className='rodape-container'>
            <div>
                <img src="./images/logo.png" alt="" className="logo-rodape"/>
            </div>

            <div className='div-contatos'>
                <h2 className='h2-contatos'> Contatos </h2>

                <div className="contato email">
                    <img src="./images/email.png" alt="" className="logo-contatos"/>
                    <span> skatesup@gmail.com </span>
                </div>
                <div className="contato telefone">
                    <img src="./images/telefone.png" alt="" className="logo-contatos"/>
                    <span className="span-telefone"> (11) 94002-8922 </span>
                </div>
            </div>

            <div className='div-rdsc'>
                <h2 className='h2-rdsc'> Redes Sociais </h2>

                <div className="rdsc">
                    <img src="./images/instagram.png" alt=""/>
                    <img src="./images/facebook.png" alt=""/>
                </div>
            </div>

            <div className='div-forma-pagamento'>
                <h2 className='h2-forma-pagamento'> Forma de Pagamento </h2>

                <div className="pag-a-vista">
                    <h2 className='h2-pag-a-vista'> Pagamento à Vista </h2>

                    <div className="icon-pag-a-vista">
                        <img src="./images/boleto.png" alt=""/>
                        <img src="./images/pix-rodape.png" alt=""/>
                        <img src="./images/deposito.png" alt=""/>
                    </div>
                </div>

                <div className="pag-a-prazo">
                    <h2 className='h2-pag-a-prazo'> Pagamento à Prazo </h2>

                    <div className="icon-pag-a-prazo">
                        <img src="./images/mastercard.png" alt=""/>
                        <img src="./images/american-express.png" alt=""/>
                        <img src="./images/visa.png" alt=""/>
                        <img src="./images/elo.png" alt=""/>
                        <img src="./images/hiper.png" alt=""/>
                        <img src="./images/hipercard.png" alt=""/>
                        <img src="./images/diners-club.png" alt=""/>
                        <img src="./images/mercado-pago.png" alt=""/>
                    </div>
                </div>
            </div>
        </section>
    )
}