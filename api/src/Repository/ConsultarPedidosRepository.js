import { con } from './connection.js'

/* CONSULTAR PEDIDO */
export async function InfosUsuario(id){
  const comando = 
  `select id_pedido     id,
          nm_usuario    nome,
          nm_sobrenome  sobrenome,
          ds_email      email
     from tb_pedido
     join tb_conta_usuario on tb_pedido.id_conta_usuario = tb_conta_usuario.id_conta_usuario
     join tb_login_usuario on tb_conta_usuario.id_conta_usuario = tb_login_usuario.id_conta_usuario
    where tb_pedido.id_pedido = ?
  `;
  const [resposta] = await con.query(comando, [id]);
  return resposta;
}

/* CONSULTAR PEDIDO */
export async function Consultar(){
  const comando = 
  `select id_pedido     id,
          nm_usuario    nome,
          nm_sobrenome  sobrenome,
          DATE_FORMAT   (dt_pedido, '%d-%m-%y às %Hh%i') AS data,
          ds_status	    status
     from tb_pedido
     join tb_conta_usuario on tb_pedido.id_conta_usuario = tb_conta_usuario.id_conta_usuario
  `;
  const [resposta] = await con.query(comando);
  return resposta;
}

/* DETALHE DO PEDIDO */
export async function Detalhe(id){
  const comando = 
  `select id_pedido_item		            nome,
          tb_produto.id_produto         idProduto,
          tb_imagem_produto.ds_imagem   imagem,
          tb_pedido.ds_status           status,
          nm_produto			              nome_produto,
          DATE_FORMAT                   (dt_pedido, '%d-%m-%y às %Hh%i') AS data,
          nr_preco				              valor  
     from tb_pedido_item
     join tb_pedido 			        on tb_pedido_item.id_pedido  = tb_pedido.id_pedido
     join tb_produto 			        on tb_pedido_item.id_produto = tb_produto.id_produto
     join tb_imagem_produto       on tb_produto.id_produto     = tb_imagem_produto.id_produto
    where tb_pedido_item.id_pedido = ?;
  `;

  const [resposta] = await con.query(comando, [id]);
  return resposta;
}


/* REMOVER PEDIDO */
export async function removerPedido(idProduto) {
  const comando = `
      delete from tb_pedido 
            where id_pedido = ?
  `

  const [resp] = await con.query(comando, [idProduto])
  return resp.affectedRows;
}


/* REMOVER PAGAMENTO */
export async function removerPagamentoCartao(idProduto) {
  const comando = `
      delete from tb_pagamento_cartao
            where id_pedido = ?
  `

  const [resp] = await con.query(comando, [idProduto])
  return resp.affectedRows;
}


/* REMOVER PAGAMENTO */
export async function removerItemPedido(idProduto) {
  const comando = `
      delete from tb_pedido_item
            where id_pedido = ?
  `

  const [resp] = await con.query(comando, [idProduto])
  return resp.affectedRows;
}