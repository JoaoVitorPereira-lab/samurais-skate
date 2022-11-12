import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//Importando EndPoints
import usuarioController from './controller/usuarioController.js'
import adminController from './controller/adminController.js'
import enderecoController from './Controller/enderecoController.js'
import favoritosController from './Controller/FavoritosController.js'
import carrinhoController from './Controller/CarrinhoController.js'
import pedidoController from './Controller/pedidoController.js'
import cartaoController from './Controller/CartaoController.js'
import consultasController from './Controller/ConsultasController.js'
import ConsultarPedidoController from './Controller/ConsultarPedidosController.js'
import MensagemController from './Controller/MensagemController.js'

// Configurando o Server
const server = express();
server.use(cors())
server.use(express.json())

//Endpoints
server.use(usuarioController)
server.use(adminController)
server.use(enderecoController)
server.use(favoritosController)
server.use(carrinhoController)
server.use(pedidoController)
server.use(cartaoController)
server.use(consultasController)
server.use(ConsultarPedidoController)
server.use(MensagemController)


//Liberar rota para a imagem
server.use('/storage/imgproduto' , express.static('storage/imgproduto'));

server.listen(process.env.PORT, () => console.log(`API online na Porta ${process.env.PORT}`))