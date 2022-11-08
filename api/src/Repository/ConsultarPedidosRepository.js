import { con } from './connection.js'

/* CONSULTAR PEDIDO */
export async function ConsultarPedido(){
  const comando = 
  `select nm_usuario    nome,
          nm_sobrenome  sobrenome,
          DATE_FORMAT (dt_pedido, '%d-%m-%y') AS data,
          ds_status	    status
     from tb_pedido
     join tb_conta_usuario on tb_pedido.id_conta_usuario = tb_conta_usuario.id_conta_usuario
  `;
  const [resposta] = await con.query(comando);
  return resposta;
}

/* DETALHE DO PEDIDO */
export async function DetalhePedido(id){
  const comando = 
  `select id_pedido_item		nome,
          ds_imagem			    imagem,
          nm_produto			  nome_produto,
          DATE_FORMAT       (dt_pedido, '%d-%m-%y') AS data,
          nr_preco				   valor,
          cod_nota_fiscal		codigo
     from tb_pedido_item
     join tb_pedido 			    on tb_pedido_item.id_pedido   = tb_pedido.id_pedido
     join tb_produto 			    on tb_pedido_item.id_produto  = tb_produto.id_produto
     join tb_imagem_produto   on tb_produto.id_produto      = tb_imagem_produto.id_produto
    where tb_pedido_item.id_pedido = ?;
  `;

  const [resposta] = await con.query(comando, [id]);
  return resposta;
}