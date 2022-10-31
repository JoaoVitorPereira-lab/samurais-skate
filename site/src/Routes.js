import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage  from './pages/Landing_Page/index.js'

import Login from './pages/User/Login'

import CadastrarProduto from './pages/Admin/cadastrarProduto'
import ConsultarProduto from './pages/Admin/consultarProduto'
import ConsultarPedido from './pages/Admin/consultarPedido'

import Teste from './pages/User/Login/teste'
import LoginAdm from './pages/Admin/LoginAdm/index.js'
import CadastroConta from './pages/User/Cadastro/index.js'

import ConsultarTenis from './pages/User/ConsultarTênis/index.js'
import ConsultarSkate from './pages/User/consultarSkate/index.js'
import ConsultarBone from './pages/User/consultarBone/index.js'
import ConsultarAcessorio from './pages/User/consultarAcessorio/index.js'
import Promocoes from './pages/User/Promocoes/index.js'

import DetalheProduto from './pages/User/DetalheProduto/index.js'
import Carrinho from './pages/User/Carrinho/index.js'
import ContinuarPedido from './pages/User/ContinuarPedido/index.js'
import Favoritos from './pages/User/Favoritos/index.js'
import ConfiguracaoInicial from './pages/User/ConfInicial/index.js'
import CentraldeAjuda from './pages/User/CentraldeAjuda/index.js'
import Compras from './pages/User/Compras/index.js'
import Dados from './pages/User/Dados/index.js'
import Endereco from './pages/User/Endereco/index.js'
import Pagamento from './pages/User/Pagamento/index.js'

export default function Rotas (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/'                         element={<LandingPage/>}/>
                
                <Route path='/Login'                    element={<Login/>} />
                <Route path='/CriarConta'               element={<CadastroConta/>} />   

                <Route path='/cadastrarproduto'         element={<CadastrarProduto/>}/>
                <Route path='/alterarproduto/:idParam'  element={<CadastrarProduto/>}/>
                <Route path='/consultarproduto'         element={<ConsultarProduto/>}/>
                <Route path='/consultarpedido'          element={<ConsultarPedido/>}/>

                <Route path='/teste'                    element={<Teste/>}/>
                <Route path='/Login/adm'                element={<LoginAdm/>} />

                <Route path='/ConsultarTenis'           element={<ConsultarTenis/>}/>
                <Route path='/ConsultarSkate'           element={<ConsultarSkate/>}/>
                <Route path='/ConsultarBone'            element={<ConsultarBone/>}/>
                <Route path='/ConsultarAcessorios'      element={<ConsultarAcessorio/>}/>
                <Route path='/Promocoes'                element={<Promocoes/>}/>

                <Route path='/produto/:id/detalhe'      element={<DetalheProduto/>}/>
                <Route path='/carrinho'                 element={<Carrinho/>}/>
                <Route path='/ContinuarPedido'          element={<ContinuarPedido/>}/>
                <Route path='/favoritos'                element={<Favoritos/>}/>
                <Route path='/Config'                   element={<ConfiguracaoInicial/>}/>
                <Route path='/CentralAjuda'             element={<CentraldeAjuda/>}/>
                <Route path='/Compras'                  element={<Compras/>}/>
                <Route path='/Dados'                    element={<Dados/>}/>
                <Route path='/Endereco'                 element={<Endereco/>}/>
                <Route path='/Pagamento'                element={<Pagamento/>}/>

            </Routes>
        </BrowserRouter>
    )
}