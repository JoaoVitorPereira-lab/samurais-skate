import Cabecalho from '../../components/cabecalho'
import './index.scss'

export default function Avaliar() {
    return(
        <main className='aval-container'>
            <Cabecalho />
            <section className='info'>
                <div className='titulo'>
                    <hr />
                    <h2> Avalie o produto: <span className="span-status">a  </span> </h2>
                </div>
                <div className='inputs'>
                    <h2>Descreva sua avaliação: </h2>
                    <textarea placeholder='Avaliação' cols="50" rows="10"></textarea>
                </div>
                
            </section>
        </main>
    );
}