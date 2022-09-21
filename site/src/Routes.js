import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/User/Login'
import CadastarProduto from './pages/Admin/cadastrarpedido'

export default function Rotas (){
    return(
        <BrowserRouter>
        <Routes>
        <Route path='/Login' element={<Login/>} />
        <Route path='/CadastrarProduto' element ={<CadastarProduto/>}/>
        </Routes>
        </BrowserRouter>
    )
}