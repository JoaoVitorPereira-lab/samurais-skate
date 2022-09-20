import { Router } from "express";
import { InserirProduto } from "../repository/AdminRepository.js";
import multer from "multer";

const server = Router();
const Upload = multer({ dest: "storage/imgproduto" });

server.post("/api/admin/produto", async (req, resp) => {
  try {
    const novoproduto = req.body;

    if (!novoproduto.marca) throw new Error("Marca do produto é obrigatória!");

    if (!novoproduto.categoria)
      throw new Error("Categoria do produto é obrigatória!");

    if (!novoproduto.tipoid) throw new Error("Tipo do produto é obrigatório!");

    if (!novoproduto.nome) throw new Error("Nome do produto é obrigatório!");

    if (!novoproduto.descricao)
      throw new Error("Descrição do produto é obrigatório!");

    if (novoproduto.promocao == undefined)
      throw new Error("Promoção do produto é obrigatória!");

    if (!novoproduto.preco) throw new Error("Preço do produto é obrigatória!");

    if (!novoproduto.estoque)
      throw new Error("Quantidade de estoque do produto é obrigatória!");

    const resposta = await InserirProduto(novoproduto);

    resp.status(200).send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

export default server;
