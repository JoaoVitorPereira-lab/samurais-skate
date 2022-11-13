import { Router } from "express";
import { atualizarStatus } from "../Repository/StatusRepository.js";

const server = Router();

/* ALTERAR STATUS DO PRODUTO */
server.put('/api/pedido/status/:id', async (req,resp) =>{
  try {
    const { id } = req.params;
    const status = req.body.status;

    await atualizarStatus(id, status)
    resp.status(204).send()
  }
   catch (err) {
    resp.status(400).send({
      Erro: err.message
    })
  }
})

export default server;