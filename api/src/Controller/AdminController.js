import { Router } from "express";
import { InserirProduto, SalvarImagem, Login, ConsultarProduto, AlterarProduto, BuscarPorID, BuscarPorNome, removerProduto, removerProdutoImagens, removerProdutoAval, buscarProdutoImagens, removerPedidoItemProduto } from "../repository/AdminRepository.js";
import multer from "multer";

const server = Router();
const upload = multer({ dest: "storage/imgproduto" });


/* CADASTRAR NOVO PRODUTO */
server.post('/api/produto', async (req, resp) => {
  try {
    const novoproduto = req.body;

    if (!novoproduto.nome) throw new Error("Nome do produto é obrigatório!");

    if (!novoproduto.preco || novoproduto.preco <= 0) throw new Error("Preço do produto é obrigatória!");

    if (!novoproduto.IdTipo) throw new Error("Tipo do produto é obrigatório!");

    if (novoproduto.promocao == undefined)
      throw new Error("Promoção do produto é obrigatória!");

    if (!novoproduto.IdMarca) throw new Error("Marca do produto é obrigatória!");

    if (!novoproduto.descricao)
      throw new Error("Descrição do produto é obrigatório!");

    const resposta = await InserirProduto(novoproduto);

    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});


// SALVAR TAMANHO
server.put('/admin/produto/:id/tamanho', async (req, resp) => {
  try {
    const id = req.params.id;
    const tamanhos = [];
    

    for (const numero of tamanhos) {
      await InserirTamanho(id, numero);
    }

    resp.send({
      id: id
    })
    
  } catch (err) {
    resp.status(404).send({
      erro: err.message
    })
  }
})


/* CONSULTAR PRODUTO */
server.get('/api/admin/produto', async (req, resp) => {
  try {
    const resposta = await ConsultarProduto();
    resp.send(resposta)
  } catch (err) {
    resp.status(401).send({
      erro: err.message
    })
  }
})



// ALTERAR PRODUTO //
server.put('/api/admin/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const novoproduto = req.body;

    if (!novoproduto.nome) throw new Error("Nome do produto é obrigatório!");

    if (!novoproduto.preco || novoproduto.preco <= 0) throw new Error("Preço do produto é obrigatória!");

    if (!novoproduto.IdTipo) throw new Error("Tipo do produto é obrigatório!");

    if (!novoproduto.IdMarca) throw new Error("Marca do produto é obrigatória!");

    if (!novoproduto.descricao)
      throw new Error("Descrição do produto é obrigatório!");

    const resposta = await AlterarProduto(id, novoproduto);

    if (resposta != 1)
      throw new Error('Produto não pode ser alterado.');
    else
      resp.status(204).send([])
  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})


/* BUSCAR POR ID */
server.get('/api/produto/:id', async (req, resp) => {
  try {
    const id = Number(req.params.id);

    const resposta = await BuscarPorID(id);
    const imagens = await buscarProdutoImagens(id);

    if (!resposta)
      resp.status(404).send([]);
    else
      resp.send({
        info:resposta,
        imagens:imagens
      });
  }

  catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})


/* BUSCAR PRODUTO POR NOME */
server.get('/api/buscar', async (req, resp) => {
  try {
    const { nome } = req.query;

    const resposta = await BuscarPorNome(nome);

    if (resposta.length == 0)
      resp.status(404).send([]);
    else
      resp.send(resposta);
  }

  catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})


/* SALVAR IMAGEM */
server.put('/admin/produto/:id/imagem', upload.array('imagens'), async (req, resp) => {
  try {
    const id = req.params.id;
    const imagens = req.files;

    for (const imagem of imagens) {
      await SalvarImagem(id, imagem.path)
    }

    resp.send({
      id: id
    });

  } catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})


/* FAZER LOGIN */
server.post('/api/login/adm', async (req, resp) => {
  try {

    const { email, senha } = req.body;

    const resposta = await Login(email, senha)
    if (!resposta) throw new Error("Credencias inválidas")

    resp.status(200).send(resposta)
  }
  catch (err) {
    resp.status(401).send({
      Erro: err.message
    })
  }
})


/* REMOVER PRODUTO */
server.delete('/api/produto/:id', async (req, resp) => {
  try {
    const id = req.params.id;

    await removerProdutoImagens(id);
    await removerPedidoItemProduto(id);
    await removerProduto(id);
    await removerProdutoAval(id);

    resp.status(204).send();
  }
  catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

export default server;