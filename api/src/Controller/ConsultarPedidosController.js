import { Router } from "express";
import { ConsultarPedido, DetalhePedido } from "../Repository/ConsultarPedidosRepository.js";

const server = Router();

/* CONSULTAR Pedido */
server.get('/api/admin/pedidos' , async (req, resp) =>{
  try {
    const resposta = await ConsultarPedido()
    
    resp.status(200).send(resposta)
  } 
  
  catch (err) {
    resp.status(400).send({
      Erro:err.message
    })
  }
})


/* DETALHE DO PEDIDO */
server.get('/api/pedido/:id', async (req, resp) =>{
  try
  {
      const id = Number(req.params.id);
      const resposta = await DetalhePedido(id);

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