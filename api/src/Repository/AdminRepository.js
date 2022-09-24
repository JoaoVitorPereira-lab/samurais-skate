import { con } from './connection.js'


/* CADASTRAR NOVO PRODUTO */
export async function InserirProduto (produto){
    const comando = `INSERT INTO tb_produto  (id_marca, id_categoria, id_tipo, nm_produto, ds_descricao, bt_promocao, nr_preco, nr_estoque)
                     VALUES (?,?,?,?,?,?,?,?)`

    const [resposta] = await con.query(comando, [produto.IdMarca, produto.IdCategoria, produto.IdTipo, produto.nome, produto.descricao, produto.promocao, produto.preco, produto.estoque])
    produto.id = resposta.insertId;

    return produto;
}


/* SALVAR IMAGEM */
export async function SalvarImagem (imagem, id) {
    const comando = `INSERT INTO TB_IMAGEM_PRODUTO (id_produto, ds_imagem) 
                      VALUES(?,?)`

    const [resposta] = await con.query(comando, [id,imagem]);
    return resposta.affectedRows;
}


/* INSERIR CATEGORIA */
export async function Categoria (){
    const comando = ` SELECT id_categoria           id,
                             nm_categoria           nome
                        FROM tb_categoria`
    const [resposta] = await con.query(comando);
    return resposta;
}


/* INSERIR TIPOS */
export async function Tipos (){
    const comando = ` Select id_tipo       id,
                             nm_tipo       nome
                        FROM tb_tipo
    `
    const [resposta] = await con.query(comando)
    return resposta
}


/* INSERIR MARCA */
export async function Marca(){
    const comando = ` SELECT id_marca       id,
                             nm_marca       nome
                        FROM tb_marca
    `
    const [resposta] = await con.query(comando)
    return resposta 
}


/* INSERIR TIPOS DO SKATE */
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