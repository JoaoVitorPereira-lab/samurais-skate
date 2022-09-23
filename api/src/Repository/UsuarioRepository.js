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