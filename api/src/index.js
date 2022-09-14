import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//Importando os EndPoints
import UsuarioController from './Controller/UsuarioController.js'

//EndPoints
server.use(UsuarioController);


// Configurando o Server
const server = express();
server.use(cors())
server.use(express.json())

server.listen(process.env.PORT, () => console.log(`API online na Porta ${process.env.PORT}`))