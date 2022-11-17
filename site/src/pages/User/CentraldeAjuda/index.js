import Cabecalho from '../../components/cabecalho'
import Rodape from '../../components/rodape'
import Menu from '../../components/MenuConfig'
import { useEffect, useState } from 'react'
import storage from 'local-storage'
import './index.scss'

export default function CantralAjuda (){
    const[dificuldades, setDificuldades] = useState(false)
    const[usuario,setUsuario] = useState([]);
    const[falha, setFalha] = useState(false)
    const[conta, setConta] = useState(false)

    function dificuldadeClick(){
        setConta(false)
        setFalha(false)
        setDificuldades(true)
    }

    function falhaClick(){
        setConta(false)
        setFalha(true)
        setDificuldades(false)
    }

    function contaClick(){
        setConta(true)
        setFalha(false)
        setDificuldades(false)
    }

    useEffect(() =>{
        if(storage('usuario-logado')){
            const dados = storage('usuario-logado')
            setUsuario(dados.nome.toUpperCase())
        }
    },[dificuldades,falha,conta])
    return(
        <main className="main-ajuda">
            <Cabecalho/>
            <Menu selecionado='ajuda'/>

            <section className='bot'>
            <div className='bot-inicial'>
                <div> <img src="/images/imagem Bot.png" alt="" /> </div>
                <div className='texto-bot'> <p> Bem vindo ao centro de ajuda! Eu sou o Bot responsável por te ajudar em todas as áreas do site! Qual seria sua dúvida? </p>   </div>
            </div>

            <div className='resposta'>
                {dificuldades === true &&
                <div className='map'>
                    <div className='texto-dificuldade'> <p> Dificuldades na compra </p> </div>
                    <div> <div className='bolinha'> <text> {usuario[0]}</text> </div> </div>
                </div>                
                }

                {falha === true &&
                
                <div className='map'>
                    <div className='texto-dificuldade'><p> Falha no pagamento </p>   </div>
                    <div> <div className='bolinha'> <text> {usuario[0]} </text> </div> </div>
                </div>
                
                }

                {conta === true &&
                <div className='map'>
                <div className='texto-conta'><p> Minha Conta </p> </div>
                <div> <div className='bolinha'> <text> {usuario[0]} </text> </div> </div>
                 </div>                
                }

                
                
                
            </div>
            </section>
            <section className='opcoes-bot'>
                <div className='div-opcoes-bot'>
                    <div> <button onClick={dificuldadeClick}>Dificuldades na compra</button> </div>
                    <div> <button onClick={falhaClick}>Falha no pagamento </button> </div>
                    <div> <button onClick={contaClick}>Minha conta</button> </div>
                </div>
            </section>

            <section className='resposta-bot'>
            <div className='bot-resposta'>
                {dificuldades === true &&
                <div className='map'>
                     <div> <img src="/images/imagem Bot.png" alt="" /> </div>
                <div className='texto-bot-resposta'> <p>Para comprar em nosso site é muito simples! Basta colocar o produto no carrinho, selecionar a quantidade que você vai querer, apertar em ferchar pedido, selecione o endereço e o meio de pagamento e pronto! Viu como é fácil comprar na nossa loja? </p>   </div>
                </div>
                }
            </div>

             {falha === true && 
             <div className='map'>
             <div> <img className='aaaa' src="/images/imagem Bot.png" alt="" /> </div>
             <div className='texto-bot-resposta1'> <p>Para Solucionar esse erro, exclua o cartão cadastrado, e cadastre-o novamente; Se o erro persistir, tente cadastrar outro cartão.</p>   </div>
             </div>             
             }

            {conta === true &&
             <div className='map'>
             <div> <img className='aa' src="/images/imagem Bot.png" alt="" /> </div>
             <div className='texto-bot-resposta2'> <p>Nós da Skate Shop priorizamos a segurança e conforto de todos os nossos usuários, não se proucupe, seus dados estão seguros e podem ser alterados a qualquer momento na aba Meus Dados</p>   </div>
             </div>
            }
                       
            
            </section>
            <Rodape/>
        </main>
    )
}