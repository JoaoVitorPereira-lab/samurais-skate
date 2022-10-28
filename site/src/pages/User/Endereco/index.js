import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/MenuConfig'
import Rodape from '../../components/rodape'

import './index.scss'

export default function Endereco (){
    return(
        <main className='main-endereco'>
            <Cabecalho/>
            <Menu/>
            <div className='div-endereco'>
                <div className='titulo-enderecos'>
                    <h1> Meus Endereços </h1>
                    <label> Gerencie seus endereços </label>
                </div>

                <div className='infos-total'>
                    <div className='div-esquerda'>

                        <div className='infos-endereco-botoes'>
                            <h4> Nome | Cep </h4>
                            <div className='div-botoes'>

                                <div>
                                    <button className='editar'> Editar </button>
                                </div>

                                <div >
                                    <button className='excluir'> Excluir </button>
                                </div>

                            </div>
                        </div>


                        <div className='infos-endereco'>
                            <h4> Rua dos Loucos </h4>
                        </div>

                        <div className='infos-endereco'>
                            <h4> Número, Bairro</h4>
                        </div>

                        <div className='infos-endereco'>
                            <h4> Cidade | Estado </h4>
                        </div>
                        
                        <div className='infos-endereco'>
                            <h4> Complemento   </h4>
                        </div>
                        
                    </div>
                </div>
                <div className='add-endereco'>
                    <button> Adicionar endereco </button>
                </div>
            </div>
            <Rodape/>  
        </main>
    )
}