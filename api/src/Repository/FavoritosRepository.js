import { con } from './Connection.js'

/* Listar Endereços */
export async function Listar(idUsuario){
    const comando = 
    `select nm_produto	        nome,
            nr_preco		    preco
       from tb_produto_curtido
      inner join tb_produto on tb_produto_curtido.id_produto = tb_produto.id_produto
      where id_conta_usuario = ?;
    `;
    
    const [registros] = await con.query(comando, [idUsuario]);
    return registros;
}