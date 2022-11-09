import { Router } from "express";
import { Consultar, Detalhe, removerItemPedido, removerPagamentoCartao, removerPedido } from "../Repository/ConsultarPedidosRepository.js";

const server = Router();

/* CONSULTAR PEDIDO */
server.get('/api/admin/pedidos' , async (req, resp) =>{
  try {
      const resposta = await Consultar()
      
      resp.status(200).send(resposta)
  } 
  
  catch (err) {
    resp.status(400).send({
      Erro:err.message
    })
  }
})


/* DETALHE DO PEDIDO */
server.get('/detalhe/pedido/:id', async (req, resp) =>{
  try{
      const id = Number(req.params.id);
      const resposta = await Detalhe(id);

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


/* REMOVER PEDIDO */
server.delete('/api/pedido/:id', async (req, resp) => {
  try {
      const id = Number(req.params.id);

      await removerPagamentoCartao(id);
      await removerItemPedido(id);
      await removerPedido(id);

      resp.status(204).send();
  }
  catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})

export default server;