import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/User/Login'
import CadastrarProduto from './pages/Admin/cadastrarpedido'
import Teste from './pages/User/Login/teste'
import LoginAdm from './pages/Admin/LoginAdm/index.js'

export default function Rotas (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login/>} />
                <Route path='/cadastrarproduto' element ={<CadastrarProduto/>}/>
                <Route path='/teste' element ={<Teste/>}/>
                <Route path='/Login/adm' element ={<LoginAdm/>} />
            </Routes>
        </BrowserRouter>
    )
}