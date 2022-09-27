import { Router } from "express";
import { Categoria, InserirProduto, Marca, SalvarImagem, Tipos, TiposSkate,Login, ConsultarProduto } from "../repository/AdminRepository.js";
import multer from "multer";

const server = Router();
const upload = multer({ dest: "storage/imgproduto" });


/* CADASTRAR NOVO PRODUTO */
server.post('/api/admin/produto', async (req, resp) => {
  try {
    const novoproduto = req.body;

    if (!novoproduto.nome) throw new Error("Nome do produto é obrigatório!");

    if (!novoproduto.preco|| novoproduto.preco<=0) throw new Error("Preço do produto é obrigatória!");

    if (!novoproduto.IdTipo) throw new Error("Tipo do produto é obrigatório!");

    if (!novoproduto.estoque)
      throw new Error("Quantidade de estoque do produto é obrigatória!");

    if (novoproduto.promocao == undefined)
      throw new Error("Promoção do produto é obrigatória!");

    if (!novoproduto.IdMarca) throw new Error("Marca do produto é obrigatória!");

    if (!novoproduto.descricao)
      throw new Error("Descrição do produto é obrigatório!");

    if (!novoproduto.IdCategoria)
      throw new Error("Categoria do produto é obrigatória!");

    const resposta = await InserirProduto(novoproduto);
    
    resp.status(200).send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});


/* CONSULTAR PRODUTO */
//Consultar todos Agendamentos
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


/* SALVAR IMAGEM */
server.post( '/api/admin/:id/imagem', upload.single("imgproduto"), async (req, resp) => {
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



export default server;