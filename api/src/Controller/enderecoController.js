import { Router } from "express";
import { listarEndereco, SalvarEndereco } from "../Repository/EnderecoRepository.js";

const server = Router();

server.get('/api/endereco/:id/usuario'), async (req, resp) =>{
    try {
        const id = req.params.id;

        const r = await listarEndereco(id);

        resp.send(r);
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
}


server.post('/api/endereco/:id/usuario'), async (req, resp) =>{
    try {
        const id = req.params.id;
        const endereco = req.body;

        const r = await SalvarEndereco(id, endereco);

        resp.status(204).send(r);
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
}

export default server;