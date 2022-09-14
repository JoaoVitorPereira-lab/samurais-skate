import { con } from './Connection.js'

export async function login (email, senha){
    const comando = ` select id_conta_usuario      id,
                             from tb_login_usuario
                             join tb_conta_usuario
                             on tb_login_usuario.id_conta_usuario = tb_conta_usuario.id_conta_usuario
                             where ds_email = ?
                             and ds_senha = ? `
    const [resposta] = await con.query(comando, [email,senha]);
    return resposta[0]
}