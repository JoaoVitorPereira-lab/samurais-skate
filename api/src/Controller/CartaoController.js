import { Router } from "express";
import { Listar, remover, Salvar } from "../Repository/CartaoRepository.js";
const server = Router();

server.get('/api/cartao/:id', async (req,resp) =>{
    try {
        const {id} = req.params;

        const r = await Listar(id);
        resp.send(r)
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.post('/api/cartao', async (req, resp) => {
    try {
      const novoCartao = req.body;
      
      if (!novoCartao.id) throw new Error("Logue com um usuário para cadastrar o cartão!");
  
      if (!novoCartao.nome) throw new Error("Nome do cartão é obrigatório!");
  
      if (!novoCartao.numero || novoCartao.numero <= 0) throw new Error("Número do cartão é obrigatório!");
  
      if (!novoCartao.vencimento) throw new Error("Vencimento do cartão é obrigatório!");
  
      if (!novoCartao.cvv) throw new Error("cvv do cartão é obrigatório!");

      if (!novoCartao.tipo) throw new Error("Tipo do cartão é obrigatório!");
  
     const resposta = await Salvar(novoCartao)
      
      resp.send(resposta);
    } 
    catch (err) {
      resp.status(400).send({
        erro: err.message,
      });
    }
  });


server.delete('/api/remover/cartao/:id', async (req, resp) => {
  try {
      const id = Number(req.params.id);

      await remover(id);

      resp.status(204).send();
  }
  catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})

export default server;