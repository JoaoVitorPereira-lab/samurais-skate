import { con } from './connection.js'

export async function InserirProduto (produto){
    const comando = `INSERT INTO tb_produto  (id_marca, id_categoria, id_tipo, nm_produto, ds_descricao, bt_promocao, nr_preco, nr_estoque)
                     VALUES (?,?,?,?,?,?,?,?)`

    const [resposta] = await con.query(comando,[produto.marca, produto.categoria,produto.tipo, produto.nome, produto.descricao, produto.promocao, produto.preco, produto.estoque])
    produto.id = resposta.insertId;

    return produto
}

export async function SalvarImagem (imagem, id) {
    const comando = ` INSERT INTO TB_IMAGEM_PRODUTO (id_produto, ds_imagem) 
                      VALUES(?,?)`

    const [resposta] = await con.query(comando, [id,imagem]);
    return resposta.affectedRows;
}