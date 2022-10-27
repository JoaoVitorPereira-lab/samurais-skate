import Cabecalho from '../../components/cabecalho'
import Rodape from '../../components/rodape'
import Menu from '../../components/MenuConfig'

import './index.scss'

export default function Dados(){
    return(
        <main className='main-dados'>
            <Cabecalho/>
            <Menu/>
            <div className='div-dados'>

                <div className='titulo-dados'>
                    <h1> Meus Dados </h1>
                    <label> Gerencie seus dados pessoais: </label>
                </div>

                <div className='infos-dados'>

                    <div className='nome-dados'>
                        <label> Nome: </label> <input type="text" />
                    </div>  

                    <div className='sobrenome-dados'>
                        <label> Sobrenome: </label> <input type="text" />               
                    </div>

                    <div className='email-dados'>
                        <label> Email: </label> <input type="text" />
                    </div>      

                    <div className='senha-dados'>
                        <label> Senha: </label> <input type="text" />
                    </div>      
                </div>

                <div className='botao-dados'>
                    <button> Alterar </button>
                </div>

            </div>
            <Rodape/>
        </main>
    )
}