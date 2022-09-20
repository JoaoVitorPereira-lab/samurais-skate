import { con } from './connection.js'

export async function Login(email,senha){
    const comando =`
            selct id_conta_usuario     id,
            from  tb_login_usuario
            inner join tb_conta_usuario on tb_login_usuario.id_conta_usuario = tb_conta_usuario.id_conta_usuario
            where ds_email = ?
            and   ds_senha = ?`
    const [resposta] = await con.query(comando, [email,senha]);
    return resposta[0]
}