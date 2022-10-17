import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Landing_Page  from './pages/Landing_Page/index.js'

import Login from './pages/User/Login'

import CadastrarProduto from './pages/Admin/cadastrarProduto'
import ConsultarProduto from './pages/Admin/consultarProduto'

import Teste from './pages/User/Login/teste'
import LoginAdm from './pages/Admin/LoginAdm/index.js'
import CadastroConta from './pages/User/Cadastro/index.js'

import ConsultarTenis from './pages/User/ConsultarTênis/index.js'
import Carrinho from './pages/User/Carrinho/index.js'
import ContinuarPedido from './pages/User/ContinuarPedido/index.js'

export default function Rotas (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/'                         element={<Landing_Page/>}/>
                
                <Route path='/Login'                    element={<Login/>} />

                <Route path='/cadastrarproduto'         element={<CadastrarProduto/>}/>
                <Route path='/alterarproduto/:idParam'  element={<CadastrarProduto/>}/>
                <Route path='/consultarproduto'         element={<ConsultarProduto/>}/>

                <Route path='/teste'                    element={<Teste/>}/>
                <Route path='/Login/adm'                element={<LoginAdm/>} />
                <Route path='/CriarConta'               element={<CadastroConta/>} />   

                <Route path='/ConsultarTenis'           element={<ConsultarTenis/>}/>
                <Route path='/carrinho'                 element={<Carrinho/>}/>
                <Route path='/ContinuarPedido'          element={<ContinuarPedido/>}/>
            </Routes>
        </BrowserRouter>
    )
}