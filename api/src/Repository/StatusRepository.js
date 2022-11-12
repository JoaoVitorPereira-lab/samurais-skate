import { con } from './connection.js'

export async function atualizarStatus(idPedido, status){
    const comando = `
        update tb_pedido
           set ds_status = ?
         where id_pedido = ?
    `
    const [resposta] = await con.query(comando,[status, idPedido])
    return resposta.affectedRows;
}