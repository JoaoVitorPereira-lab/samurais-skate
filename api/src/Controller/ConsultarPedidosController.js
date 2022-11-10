import { Router } from "express";
import { Consultar, Detalhe, InfosUsuario, removerItemPedido, removerPagamentoCartao, removerPedido } from "../Repository/ConsultarPedidosRepository.js";

const server = Router();

/* INFOS DO USUÁRIO */
server.get('/api/info/usuario/:id', async (req, resp) =>{
  try{
      const id = Number(req.params.id);
      const resposta = await InfosUsuario(id);

      if(!resposta)
        resp.status(404).send([]);
      else
        resp.status(200).send(resposta)
  }

  catch(err)
  {
      resp.status(400).send({
          erro: err.message
      })
  }
})


/* CONSULTAR PEDIDO ADMIN */
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
server.get('/detalhe/pedido/admin/:id', async (req, resp) =>{
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


/* DETALHE DO PEDIDO */
server.get('/detalhe/pedido/usuario/:id', async (req, resp) =>{
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


export default server;