import { con } from "./connection.js";

export async function Listar(id){
    const comando = 
    ` select id_cartao          id,
             nm_cartao	        nome,
             ds_numero          numero,
             dt_vencimento      vencimento,
             ds_cvv             cvv,
             ds_tipo_cartao     tipoCartao
        from tb_cartao
       where id_login_usuario = ? `
    const[resposta] = await con.query(comando,[id])
    return resposta; 
}
  
export async function Salvar(novoCartao){
    const comando = `INSERT INTO tb_cartao (id_login_usuario, nm_cartao, ds_numero, dt_vencimento, ds_cvv, ds_tipo_cartao)
                     VALUES (?, ?, ?, ?, ?, ?);`
    const [resposta] = await con.query (comando,[novoCartao.id, novoCartao.nome, novoCartao.numero,novoCartao.vencimento, novoCartao.cvv, novoCartao.tipo])
    
    novoCartao.id = resposta.insertId;
    return novoCartao;
}