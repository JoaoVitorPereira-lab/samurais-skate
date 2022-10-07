import { Router } from "express";
import { Categoria, InserirProduto, Marca, SalvarImagem, Tipos, TiposSkate,Login, ConsultarProduto, AlterarProduto, BuscarPorID, BuscarPorNome, removerProduto, removerProdutoImagens } from "../repository/AdminRepository.js";
import multer from "multer";

const server = Router();
const upload = multer({ dest: "storage/imgproduto" });


/* CADASTRAR NOVO PRODUTO */
server.post('/api/admin/produto', async (req, resp) => {
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


/* CONSULTAR PRODUTO */
server.get('/api/admin/produto', async (req, resp) => {
  try{
      const resposta = await ConsultarProduto();
      resp.send(resposta) 
  } catch(err){
      resp.status(401).send({
          erro: err.message
      })
  }
})



// ALTERAR PRODUTO //
server.put('/api/admin/:id', async (req, resp) => {
  try
  {
      const { id } = req.params;
      const novoproduto = req.body;

      if (!novoproduto.nome) throw new Error("Nome do produto é obrigatório!");

      if (!novoproduto.preco || novoproduto.preco <= 0) throw new Error("Preço do produto é obrigatória!");

      if (!novoproduto.IdTipo) throw new Error("Tipo do produto é obrigatório!");

      if (novoproduto.promocao == undefined)
        throw new Error("Promoção do produto é obrigatória!");

      if (!novoproduto.IdMarca) throw new Error("Marca do produto é obrigatória!");

      if (!novoproduto.descricao)
        throw new Error("Descrição do produto é obrigatório!");

      if (!novoproduto.IdCategoria)
        throw new Error("Categoria do produto é obrigatória!");

      const resposta = await AlterarProduto(id, novoproduto);
      
      if(resposta != 1)
          throw new Error('Produto não pode ser alterado. ');
      else
          resp.sendStatus(204)
  }
  catch(err)
  {
      console.log(err)
      resp.status(400).send({
          erro: err.message
      })
  }
})


/* BUSCAR POR ID */
server.get('/api/produto/:id', async (req, resp) =>{
  try
  {
      const id = Number(req.params.id);

      const resposta = await BuscarPorID(id);

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


/* BUSCAR PRODUTO POR NOME */
server.get('/api/buscar', async (req, resp) =>{
  try
  {
      const { nome } = req.query;

      const resposta = await BuscarPorNome(nome);

      if(resposta.length == 0)
          resp.status(404).send( [] );
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


/* SALVAR IMAGEM */
server.post('/api/admin/:id/imagem', upload.single("imgproduto"), async (req, resp) => {
    try {
      if(!req.file) throw new Error ('Escolha a imagem!')

      const { id } = req.params

      

      const imagem = req.file.path

      const resposta = await SalvarImagem(imagem, id)

      if (resposta != 1) throw new Error("Não foi possível salvar a imagem!")

      resp.status(204).send()
    } catch (err) {

      resp.status(400).send({
        erro: err.message,
      });
    }
  }
);


/* INSERIR CATEGORIA */
server.get ('/api/categoria', async (req,resp) =>{
  try{ 
  const resposta = await Categoria();

  resp.status(200).send(resposta)
} catch(err){
  resp.status(400).send({
      Erro:err.message
  })
}
})


/* INSERIR TIPO */
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


/* INSERIR MARCA */
server.get('/api/marca', async (req,resp) =>{
  try {
    const resposta = await Marca()

    resp.status(200).send(resposta)
    
  } catch (err) {
    resp.status(400).send({
      Erro:err.message
    })    
  }
})


/* INSERIR TIPOS DO SKATE */
server.get('/api/tipo/skate' , async (req,resp) =>{
  try {
    const resposta = await TiposSkate ()
    
    resp.status(200).send(resposta)
  } 
  
  catch (err) {
    resp.status(400).send({
      Erro:err.message
    })
  }
})


/* FAZER LOGIN */
server.post('/api/login/adm', async (req,resp) =>{
  try {

      const {email, senha} = req.body;

      const resposta = await Login(email, senha)
      if(!resposta) throw new Error("Credencias INVÁLIDAS")
      
      resp.status(200).send(resposta)
  } 
  catch (err) {
      resp.status(401).send({
          Erro:err.message
      })
  }
})


/* REMOVER PRODUTO */
server.delete('/api/produto/:id', async (req, resp) => {
  try {
      const id = req.params.id;

      await removerProdutoImagens(id);
      await removerProduto(id);

      resp.status(204).send();
  }
  catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})

export default server;