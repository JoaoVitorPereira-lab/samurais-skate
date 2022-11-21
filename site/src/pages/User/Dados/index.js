import Cabecalho from '../../components/cabecalho'
import Rodape from '../../components/rodape'
import Menu from '../../components/MenuConfig'
import storage from 'local-storage'
import { useState,useEffect } from 'react'
import { AtualizarConta,AtualizarLogin, EntrarLogin } from '../../../api/UsuarioApi'

import { toast } from 'react-toastify'
 
import './index.scss'
import { EnviarAoAlterar } from '../../../api/GmailAPI'

export default function Dados(){
    const[nome,setNome] = useState(storage('usuario-logado').nome)
    const[sobrenome,setSobrenome] = useState(storage('usuario-logado').sobrenome)
    const[email,setEmail] = useState(storage('usuario-logado').Email)
    const[senha,setSenha] = useState()
    const[usuario,setUsuario] = useState([])

    async function AlterarInfosClick(){
        try {
            const NovoLogin = await AtualizarLogin (usuario.id, email, senha)
            const NovaConta = await AtualizarConta (usuario.id, nome, sobrenome)
            const alterarStorage = await EntrarLogin (email,senha)

            storage('usuario-logado', alterarStorage)

            toast.dark("Informações Atualizadas!")
            await EnviarAoAlterar(nome, sobrenome, email, senha);
        } 
        
        catch (err) {
            if (err.response)
            toast.dark(err.response.data.erro)
            else {
                toast.dark(err.message)
            }            
        }
    }

    useEffect(() =>{
        if(storage('usuario-logado')){
            const nome = storage('usuario-logado')
            setUsuario(nome)
        }
    },[])
    return(
        <main className='main-dados'>
            <Cabecalho/>
            <Menu selecionado='dados'/>
            <div className='div-dados'>

                <div className='titulo-dados'>
                    <h1> Meus Dados </h1>
                    <label> Gerencie seus dados pessoais: </label>
                </div>

                <div className='infos-dados'>

                    <div className='nome-dados'>
                        <label> Nome: </label> <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                    </div>  

                    <div className='sobrenome-dados'>
                        <label> Sobrenome: </label> <input type="text" value={sobrenome}  onChange={e =>setSobrenome(e.target.value)} />               
                    </div>

                    <div className='email-dados'>
                        <label> Email: </label> <input type="text" value={email}  onChange={e => setEmail(e.target.value)} />
                    </div>      

                    <div className='senha-dados'>
                        <label> Senha: </label> <input type="text" value={senha} placeholder="****" onChange={e => setSenha(e.target.value)} />
                    </div>      
                </div>

                <div className='botao-dados'>
                    <button onClick={AlterarInfosClick}> Alterar </button>
                </div>

            </div>
            <Rodape/>
        </main>
    )
}
