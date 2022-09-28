import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/User/Login'
import CadastrarProduto from './pages/Admin/cadastrarProduto'
import ConsultarProduto from './pages/Admin/consultarProduto'
import Teste from './pages/User/Login/teste'
import LoginAdm from './pages/Admin/LoginAdm/index.js'
import CadastroConta from './pages/User/Cadastro/index.js'

export default function Rotas (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login/>} />
                <Route path='/cadastrarproduto' element ={<CadastrarProduto/>}/>
                <Route path='/consultarproduto' element ={<ConsultarProduto/>}/>
                <Route path='/teste' element ={<Teste/>}/>
                <Route path='/Login/adm' element ={<LoginAdm/>} />
                <Route path='/CriarConta' element ={<CadastroConta/>} />
            </Routes>
        </BrowserRouter>
    )
}