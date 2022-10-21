import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//Importando EndPoints
import usuarioController from './controller/usuarioController.js'
import adminController from './controller/adminController.js'
import enderecoController from './Controller/enderecoController.js'

// Configurando o Server
const server = express();
server.use(cors())
server.use(express.json())

//Endpoints
server.use(usuarioController)
server.use(adminController)
server.use(enderecoController)


//Liberar rota para a imagem
server.use('/storage/imgproduto' , express.static('storage/imgproduto'));

server.listen(process.env.PORT, () => console.log(`API online na Porta ${process.env.PORT}`))