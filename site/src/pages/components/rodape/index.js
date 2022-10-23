import './index.scss'

export default function Rodape(){
    return(
        <section className='rodape-container'>
            <div className="div-separa-container">
            <div>
                <img src="/images/logo-preta.gif" alt="" className="logo-rodape"/>
            </div>

            <div className='div-contatos'>
                <h2 className='h2-contatos'> Contatos </h2>

                <div className="contato email">
                    <img src="/images/email.png" alt=""/>
                    <span> skatesup@gmail.com </span>
                </div>
                <div className="contato telefone">
                    <img src="/images/telefone.png" alt=""/>
                    <span className="span-telefone"> (11) 94002-8922 </span>
                </div>
            </div>

            <div className='div-criadores'>
                <h2 className='h2-criadores'> Criadores </h2>

                <div className="nomes-criadores">
                    <span> João Vitor </span>
                    <span> João Pedro </span>
                    <span> Pedro Henrique </span>
                    <span> Rodrigo Anjos </span>
                </div>
            </div>

            <div className='div-forma-pagamento'>
                <h2 className='h2-forma-pagamento'> Formas de Pagamento </h2>

                <div className="pag-a-vista">
                    <h3 className='h3-pag-a-vista'> Pagamento à Vista </h3>

                    <div className="icon-pag-a-vista">
                        <img src="/images/boleto.png"      alt="" className="boleto"/>
                        <img src="/images/pix-rodape.png"  alt="" className="pix-rodape"/>
                        <img src="/images/deposito.png"    alt="" className="deposito"/>
                    </div>
                </div>

                <div className="pag-a-prazo">
                    <h3 className='h3-pag-a-prazo'> Pagamento à Prazo </h3>

                    <div className="icon-pag-a-prazo">
                        <img src="/images/mastercard.png"       alt="" className="icon mastercard"/>
                        <img src="/images/american-express.png" alt="" className="icon2 american-express"/>
                        <img src="/images/visa.png"             alt="" className="icon visa"/>
                        <img src="/images/elo.png"              alt="" className="icon elo"/>
                        <img src="/images/hiper.png"            alt="" className="icon hiper"/>
                        <img src="/images/hipercard.png"        alt="" className="icon2 hipercard"/>
                        <img src="/images/diners-club.png"      alt="" className="icon diners-club"/>
                        <img src="/images/mercado-pago.png"     alt="" className="icon mercado-pago"/>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}