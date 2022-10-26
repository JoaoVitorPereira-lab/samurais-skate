import { Router } from "express";
import { Listar } from "../Repository/FavoritosRepository.js";

const server = Router();

server.get('/api/favoritos/usuario/:id', async (req, resp) =>{
    try {
        const id = req.params.id;

        const r = await Listar(id);

        resp.send(r);
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
});

export default server;