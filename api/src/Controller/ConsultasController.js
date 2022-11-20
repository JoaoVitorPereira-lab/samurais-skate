import { Router } from "express";
import { Categoria, Marca, MarcaSkate, TamanhoTenis, Tipos, TiposSkate } from "../repository/ConsultasRepository.js";

const server = Router();

/* CONSULTAR CATEGORIA */
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


/* CONSULTAR TIPO */
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


/* CONSULTAR MARCA */
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

/* CONSULTAR MARCA Skate */
server.get('/api/marca/skate', async (req,resp) =>{
  try {
    const resposta = await MarcaSkate()

    resp.status(200).send(resposta)
    
  } catch (err) {
    resp.status(400).send({
      Erro:err.message
    })    
  }
})


/* CONSULTAR TIPOS DO SKATE */
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


/* CONSULTAR TIPOS DO SKATE */
server.get('/api/tamanho/tenis' , async (req,resp) =>{
  try {
    const resposta = await TamanhoTenis();
    resp.status(200).send(resposta);
  } 
  
  catch (err) {
    resp.status(400).send({
      Erro:err.message
    })
  }
})

export default server;