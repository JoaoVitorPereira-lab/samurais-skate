import { Router } from "express";
import { Categoria, InserirProduto, SalvarImagem, Tipos } from "../repository/AdminRepository.js";
import multer from "multer";

const server = Router();
const upload = multer({ dest: "storage/imgproduto" });

server.post('/api/admin/produto', async (req, resp) => {
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

server.post( '/api/admin/:id/imagem', upload.single("imgproduto"), async (req, resp) => {
    try {
      const { id } = req.params

      const imagem = req.file.path

      const resposta = await SalvarImagem(imagem, id)

      resp.status(204).send()

      if (resposta != 1) throw new Error("Não foi possível adicionar a imagem!")

    } catch (err) {

      resp.status(400).send({
        erro: err.message,
      });
    }
  }
);

server.get ('/api/categoria', async (req,resp) =>{
  try{ 
  const resposta = await Categoria();

  resp.status(200).send(resposta)
}
catch(err){
  resp.status(400).send({
      Erro:err.message
  })
}
})

server.get ('/api/tipo', async (req,resp) =>{
  try{ 
  const resposta = await Tipos();

  resp.status(200).send(resposta)
}
catch(err){
  resp.status(400).send({
      Erro:err.message
  })
}
})



export default server;
