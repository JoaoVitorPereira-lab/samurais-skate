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
  const comando =  ` INSERT INTO tb_conta_usuario (nm_usuario, nm_sobrenome)
                     VALUES (?,?)`
  const [resposta] = await con.query(comando,[cadastro.nome, cadastro.sobrenome])
  return resposta[0]
}

export async function CadastrarLogin (cadastro){
  const comando = ` INSERT INTO tb_login_usuario (id_conta_usuario, ds_email, ds_senha)
                    values (?,?,?) `
  const [resposta] = await con.query(comando, [cadastro.conta, cadastro.email, cadastro.senha])
  cadastro.id = resposta.insertId
  return cadastro         
}

export async function CadastrarInformacoes(info){
  const comando = `INSERT INTO tb_conta_usuario (nm_usuario, nm_sobrenome)
                   Values(?,?)`
  const [resposta] = await con.query(comando, [info.nome, info.sobrenome])
  info.id = resposta.insertId
  return info  
}