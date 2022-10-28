import { con } from "./connection.js";

/* BUSCAR POR ID */
export async function BuscarPorIDCarrinho(id){
    const comando = 
    `SELECT tb_produto.id_produto   id,
            nm_marca 		            nmmarca,
            nm_tipo  		            nmtipo,
            nm_produto		          nome,
            ds_descricao	          descricao,
            nr_preco		            preco,
            nr_estoque		          estoque,
            ds_imagem               imagem     
       FROM tb_produto
      INNER JOIN tb_imagem_produto  ON tb_produto.id_produto = tb_imagem_produto.id_produto
      INNER JOIN tb_tipo            ON tb_produto.id_tipo    = tb_tipo.id_tipo
      INNER JOIN tb_marca           ON tb_produto.id_marca   = tb_marca.id_marca
      WHERE tb_produto.id_produto = ?`;
    
    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}