import { Router } from 'express';
import { login } from '../Repository/UsuarioRepository';

const server = Router();

server.post('/api/login', async (req, resp) =>{
    try {
        const { email, senha } = req.body;

        const resposta = await login(email,senha)
        if(!resposta) throw new Error("Credencias inválidas!")
        resp.status(200).send(resposta)
        
    } catch (err) {
        resp.status(401).send({
            Erro: err.message
        })
    }
} )  