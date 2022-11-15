import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage  from './pages/Landing_Page'

import Login from './pages/User/Login'

import CadastrarProduto from './pages/Admin/cadastrarProduto'
import ConsultarProduto from './pages/Admin/consultarProduto'
import ConsultarPedido from './pages/Admin/consultarPedido'
import DetalhePedido from './pages/Admin/detalhePedido'

import CriarConta from './pages/User/CriarConta'

import ConsultarTenis from './pages/User/ConsultarTênis'
import ConsultarSkate from './pages/User/consultarSkate'
import ConsultarBone from './pages/User/consultarBone'
import ConsultarAcessorio from './pages/User/consultarAcessorio'
import Promocoes from './pages/User/Promocoes'

import DetalheProduto from './pages/User/DetalheProduto'
import Carrinho from './pages/User/Carrinho'
import ContinuarPedido from './pages/User/ContinuarPedido'
import Favoritos from './pages/User/Favoritos'
import ConfiguracaoInicial from './pages/User/ConfInicial'
import CentraldeAjuda from './pages/User/CentraldeAjuda'
import Pedidos from './pages/User/Pedidos'
import VerPedido from './pages/User/VerPedido'
import Dados from './pages/User/Dados'
import Endereco from './pages/User/Endereco'
import Cartoes from './pages/User/Cartoes'

export default function Rotas (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/'                                         element={<LandingPage/>}/>
                
                <Route path='/Login'                                    element={<Login/>} />
                <Route path='/CriarConta'                               element={<CriarConta/>} />   

                <Route path='/cadastrarproduto'                         element={<CadastrarProduto/>}/>
                <Route path='/alterarproduto/:idParam'                  element={<CadastrarProduto/>}/>
                <Route path='/consultarproduto'                         element={<ConsultarProduto/>}/>
                <Route path='/consultarpedidos'                         element={<ConsultarPedido/>}/>
                <Route path='/detalhe/pedido/admin/:id'                 element={<DetalhePedido/>}/>

                <Route path='/ConsultarTenis'                           element={<ConsultarTenis/>}/>
                <Route path='/ConsultarSkate'                           element={<ConsultarSkate/>}/>
                <Route path='/ConsultarBone'                            element={<ConsultarBone/>}/>
                <Route path='/ConsultarAcessorios'                      element={<ConsultarAcessorio/>}/>
                <Route path='/Promocoes'                                element={<Promocoes/>}/>

                <Route path='/produto/:id/detalhe'                      element={<DetalheProduto/>}/>
                <Route path='/carrinho'                                 element={<Carrinho/>}/>
                <Route path='/ContinuarPedido'                          element={<ContinuarPedido/>}/>
                <Route path='/favoritos'                                element={<Favoritos/>}/>
                <Route path='/Config'                                   element={<ConfiguracaoInicial/>}/>
                <Route path='/CentralAjuda'                             element={<CentraldeAjuda/>}/>
                <Route path='/pedidos'                                  element={<Pedidos/>}/>
                <Route path='/detalhe/pedido/:idPedido/usuario/:idUser' element={<VerPedido/>}/>
                <Route path='/Dados'                                    element={<Dados/>}/>
                <Route path='/Endereco'                                 element={<Endereco/>}/>
                <Route path='/cartoes'                                  element={<Cartoes/>}/>

            </Routes>
        </BrowserRouter>
    )
}