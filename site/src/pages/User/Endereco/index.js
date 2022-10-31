import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/MenuConfig'
import Rodape from '../../components/rodape'
import {Listar } from '../../../api/EnderecoAPI'
import storage from 'local-storage'
import ModalEndereco from '../../components/ModalEndereco'

import './index.scss'
import { useState, useEffect } from 'react';

export default function Endereco (){

    const[exibirEndereco,setExibirEndereco] = useState(false)
    const[usuario,setUsuario]= useState([])
    const[endereco,setEndereco] = useState ([])
    
    function exibirNovoEnderecoClick(){
        setExibirEndereco(true)
    }

    function fecharNovoEndereco() {
        setExibirEndereco(false);
    }

    async function  ListarEnderecos(){
        const resposta = await Listar(usuario.id)
        setEndereco(resposta)
    }

    useEffect(() =>{
        if(storage('usuario-logado')){
            const nome = storage('usuario-logado')
            setUsuario(nome)
        }
        ListarEnderecos();
    },[])

    return(
        <main className='main-endereco'>
            <ModalEndereco exibir={exibirEndereco} fechar={fecharNovoEndereco} />
            <Cabecalho/>
            <Menu/>
            {exibirEndereco === true 
            }
            {exibirEndereco === false &&
            <div className='div-endereco'>
            <div className='titulo-enderecos'>
                <h1> Meus Endereços </h1>
                <label> Gerencie seus endereços </label>
            </div>
            {endereco.map(item =>
            <div className='infos-total'>
            <div className='div-esquerda'>

                <div className='infos-endereco-botoes'>
                    <h4> {item.referencia} | {item.cep} </h4>
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
                    <h4> {item.rua} </h4>
                </div>

                <div className='infos-endereco'>
                    <h4> {item.numero}, {item.bairro}</h4>
                </div>

                <div className='infos-endereco'>
                    <h4> {item.cidade} | {item.estado} </h4>
                </div>
                
                <div className='infos-endereco'>
                    <h4> {item.complemento}   </h4>
                </div>
                
            </div>
        </div>            
            )}
            
            <div className='add-endereco'>
            <button onClick={exibirNovoEnderecoClick}> Adicionar endereco </button>
            </div>
        </div>            
            }
            
            <Rodape/>  
        </main>
    )
}