import { con } from './connection.js'

export async function Login(email, senha) {
  const comando =
    `select tb_conta_usuario.id_conta_usuario     id,
                nm_usuario                            nome
           from tb_login_usuario
           join tb_conta_usuario
             on tb_login_usuario.id_conta_usuario     = tb_conta_usuario.id_conta_usuario
          where ds_email                              = ?
            and ds_senha                              = ?`
  const [resposta] = await con.query(comando, [email, senha]);
  return resposta[0]
}

export async function Cadastro(cadastro) {
  const comando = ` INSERT INTO tb_conta_usuario (nm_usuario, nm_sobrenome)
                     VALUES (?,?)`
  const [resposta] = await con.query(comando, [cadastro.nome, cadastro.sobrenome])
  return resposta[0]
}

export async function CadastrarLogin(cadastro) {
  const comando = ` INSERT INTO tb_login_usuario (id_conta_usuario, ds_email, ds_senha)
                    values (?,?,?) `
  const [resposta] = await con.query(comando, [cadastro.conta, cadastro.email, cadastro.senha])
  cadastro.id = resposta.insertId
  return cadastro
}

export async function CadastrarInformacoes(info) {
  const comando = `INSERT INTO tb_conta_usuario (nm_usuario, nm_sobrenome)
                   Values(?,?)`
  const [resposta] = await con.query(comando, [info.nome, info.sobrenome])
  info.id = resposta.insertId
  return info
}

export async function ConsultarTenis() {
  const comando = `select nm_produto        produto,
                          nr_preco          preco,
                          vl_avaliacao      avaliacao,
                          tb_tipo.id_tipo   idTipo,
                          ds_imagem         imagem,
                          tb_produto.id_produto  id
                     from tb_produto
                     join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
                     join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
                    where nm_tipo = "Tênis"`
            
  const [resposta] = await con.query(comando);
  return resposta;
}

export async function ConsultarTenisNome (nome) {
  const comando = `select nm_produto        produto,
                          nr_preco          preco,
                          vl_avaliacao      avaliacao,
                          tb_tipo.id_tipo   idTipo,
                          ds_imagem         imagem,
                          tb_produto.id_produto  id
                     from tb_produto
                     join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
                     join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
                    where nm_tipo = "Tênis"
                    and nm_produto like ?`
  
  const [resposta] = await con.query(comando, [ `%${nome}%` ]); 
  return resposta;
}