import { con } from './Connection.js'

/* Listar Endereços */
export async function Listar(idUsuario){
    const comando = 
    `SELECT id_usuario_endereco     id,
            ds_referencia           referencia,
            ds_cep		              cep,
            nm_rua		              rua,
            nr_numero	              numero,
            ds_complemento	        complemento,
            ds_bairro		            bairro,
            ds_cidade		            cidade,
            ds_estado		            estado
       FROM tb_usuario_endereco
      WHERE id_conta_usuario = ? 
    `;
    
    const [registros] = await con.query(comando, [idUsuario]);
    return registros;
  }
  
  
/* Salvar Endereços */
export async function Salvar(idUsuario, endereco){
    const comando = 
    `insert into tb_usuario_endereco (id_conta_usuario, ds_referencia, ds_cep, nm_rua, nr_numero, ds_complemento, ds_bairro, ds_cidade, ds_estado)
                                values (?, ?, ?, ?, ?, ?, ?, ?, ?); `;

    const [info] = await con.query(comando, [idUsuario, endereco.referencia, endereco.cep, endereco.rua, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.estado]);
    return info.insertId;
  }