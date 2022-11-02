import { con } from './connection.js'

/* CONSULTAR CATEGORIA */
export async function Categoria (){
  const comando = ` SELECT id_categoria           id,
                           nm_categoria           nome
                      FROM tb_categoria`
  const [resposta] = await con.query(comando);
  return resposta;
}


/* CONSULTAR TIPOS */
export async function Tipos (){
  const comando = ` Select id_tipo       id,
                           nm_tipo       nome
                      FROM tb_tipo
  `
  const [resposta] = await con.query(comando)
  return resposta
}


/* CONSULTAR MARCA */
export async function Marca(){
  const comando = ` SELECT id_marca       id,
                           nm_marca       nome
                      FROM tb_marca
  `
  const [resposta] = await con.query(comando)
  return resposta 
}


/* CONSULTAR TIPOS DO SKATE */
export async function TiposSkate(){
  const comando = ` Select id_tipo_skate      id,
                           nm_tipo_skate      nome
                      from tb_skate`
  const [resposta] = await con.query(comando)
  return resposta
}