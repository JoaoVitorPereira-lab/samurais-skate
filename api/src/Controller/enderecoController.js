import { Router } from "express";
import { ListarEndereco, SalvarEndereco } from "../repository/enderecoRepository.js";

const server = Router();

server.get('/api/usuario/:id/endereco'), async (req, resp) =>{
    try {
        const id = req.params.id;

        const r = await ListarEndereco(id);
        console.log(r);

        resp.send(r);
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
}


server.post('/api/usuario/:id/endereco'), async (req, resp) =>{
    try {
        const id = req.params.id;
        const endereco = req.body;

        const r = await SalvarEndereco(id, endereco);

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
}

export default server;