import { Router } from "express";
import { BuscarPorIDCarrinho } from "../Repository/CarrinhoRepository.js";

const server = Router();

server.get('/api/carrinho/produto/:id', async (req, resp) =>{
    try
    {
        const id = Number(req.params.id);
        const resposta = await BuscarPorIDCarrinho(id);
  
        if(!resposta)
          resp.status(404).send([]);
        else
          resp.send(resposta);
    }
  
    catch(err)
    {
        resp.status(400).send({
            erro: err.message
        })
    }
  })

export default server;