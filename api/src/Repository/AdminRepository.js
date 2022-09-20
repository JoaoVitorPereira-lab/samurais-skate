import { con } from './connection.js'

export async function InserirProduto (produto){
    const comando = `INSERT INTO tb_produto  (id_marca, id_categoria, id_tipo, nm_produto, ds_descricao, bt_promocao, nr_preco, vl_avaliacao, nr_estoque, ds_tipo)
                     VALUES (?,?,?,?,?,?,?,?,?,?);`

    const [resposta] = await con.query(comando,[produto.marca, produto.categoria,produto.tipoid, produto.nome, produto.descricao, produto.promocao, produto.preco, produto.avaliacao, produto.estoque, produto.tipo])
    produto.id = resposta.insertId;

    return produto
}