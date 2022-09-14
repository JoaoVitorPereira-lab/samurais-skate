import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// Configurando o Server
const server = express();
server.use(cors())
server.use(express.json())

server.listen(process.env.PORT, () => console.log(`API online na Porta ${process.env.PORT}`))