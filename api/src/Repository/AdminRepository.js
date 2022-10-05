import { con } from './connection.js'


/* CADASTRAR NOVO PRODUTO */
export async function InserirProduto (produto){
    const comando = `INSERT INTO tb_produto  (id_marca, id_categoria, id_tipo, id_tipo_skate, nm_produto, ds_descricao, nr_tamanho, bt_importado, bt_promocao, nr_preco, nr_estoque)
                     VALUES (?,?,?,?,?,?,?,?,?,?,?)`

    const [resposta] = await con.query(comando, [produto.IdMarca, produto.IdCategoria, produto.IdTipo, produto.IdTipoSkate, produto.nome, produto.descricao, produto.tamanho, produto.importado, produto.promocao, produto.preco, produto.estoque])
    produto.id = resposta.insertId;

    return produto;
}


/* CONSULTAR PRODUTOS */
export async function ConsultarProduto(){
    const comando = 
        `SELECT id_produto      id,
                nm_marca	    marca,
                nm_categoria    categoria,
                nm_tipo  		tipo,
                nm_produto		nome,
                ds_descricao	descricao,
                bt_promocao	    promocao,
                nr_preco		preco,
                vl_avaliacao	avaliacao,
                nr_estoque		estoque
           FROM tb_produto
          INNER JOIN tb_marca     ON tb_produto.id_marca = tb_marca.id_marca
          INNER JOIN tb_categoria ON tb_produto.id_categoria = tb_categoria.id_categoria
          INNER JOIN tb_tipo      ON tb_produto.id_tipo = tb_tipo.id_tipo
          ORDER 
	         BY id_produto`;

    const [resposta] = await con.query(comando);
    return resposta;
}



/* ALTERAR PRODUTO */
export async function AlterarProduto(id, produto){
    const comando =
       `UPDATE tb_produto
           SET id_marca			= ?,
               id_categoria     = ?,
               id_tipo  		= ?,
               nm_produto		= ?,
               ds_descricao	    = ?,
               bt_promocao	    = ?,
               nr_preco			= ?,
               nr_estoque		= ?
         WHERE id_produto       = ?`;
        
    const [resposta] = await con.query(comando, [produto.IdMarca, produto.IdCategoria, produto.IdTipo, produto.nome, produto.descricao, produto.promocao, produto.preco, produto.estoque, id])

    return resposta.affectedRows;
}


/* BUSCAR POR ID */
export async function BuscarPorID (id){
    const comando = 
    `SELECT id_produto      id,
            id_marca	    marca,
            id_categoria    categoria,
            id_tipo  		tipo,
            nm_produto		nome,
            ds_descricao	descricao,
            bt_promocao	    promocao,
            nr_preco		preco,
            vl_avaliacao	avaliacao,
            nr_estoque		estoque
       FROM tb_produto
      WHERE id_produto = ? `;
    
    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}


// BUSCAR PRODUTO POR NOME //
export async function BuscarPorNome(nome){
    const comando =
        `SELECT id_produto      id,
                id_marca	    marca,
                id_categoria    categoria,
                id_tipo  		tipo,
                nm_produto		nome,
                ds_descricao	descricao,
                bt_promocao	    promocao,
                nr_preco		preco,
                vl_avaliacao	avaliacao,
                nr_estoque		estoque
           FROM tb_produto
          WHERE nm_produto      like ? `;

    const [linhas] = await con.query(comando, [ `%${nome}%` ]);
    return linhas;
}


/* SALVAR IMAGEM */
export async function SalvarImagem (imagem, id) {
    const comando = `INSERT INTO TB_IMAGEM_PRODUTO (id_produto, ds_imagem) 
                      VALUES(?,?)`

    const [resposta] = await con.query(comando, [id,imagem]);
    return resposta.affectedRows;
}


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
                        from tb_tipo_skate`
    const [resposta] = await con.query(comando)
    return resposta
}


/* FAZER LOGIN */
export async function Login(email, senha) {
    const comando =
        `select id_admin    id
           from tb_admin
          where ds_email    = ?
            and 
                ds_senha    = ?
        `
    const [resposta] = await con.query(comando, [email, senha]);
    return resposta[0];
}


/* REMOVER PRODUTO */
export async function removerProduto(idProduto) {
    const comando = `
        delete from tb_produto 
              where id_produto = ?
    `

    const [resp] = await con.query(comando, [idProduto])
    return resp.affectedRows;
}


/* REMOVER IMAGEM DO PRODUTO */
export async function removerProdutoImagens(idProduto) {
    const comando = `
        delete from tb_imagem_produto 
              where id_produto = ?
    `

    const [resp] = await con.query(comando, [idProduto])
    return resp.affectedRows;
}