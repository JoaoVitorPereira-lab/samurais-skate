import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/User/Login'
import CadastrarProduto from './pages/Admin/cadastrarpedido'
import Teste from './pages/User/Login/teste'

export default function Rotas (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login/>} />
                <Route path='/cadastrarproduto' element ={<CadastrarProduto/>}/>
                <Route path='/teste' element ={<Teste/>}/>
            </Routes>
        </BrowserRouter>
    )
}