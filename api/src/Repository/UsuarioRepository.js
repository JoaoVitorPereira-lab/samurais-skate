import { con } from './connection.js'

/* BUSCAR POR ID */
export async function BuscarPorID(id){
  const comando = 
  `SELECT tb_produto.id_produto       id,
          nm_marca	                  marca,
          id_tamanho		              tamanho,
          tb_produto.id_tipo  	      tipo,
          tb_produto.id_tipo_skate    tipoSkate,
          tb_produto.id_categoria     categoria,
          nm_produto		              nome,
          ds_descricao	              descricao,
          bt_promocao                 promocao,
          bt_importado                importado,
          nr_preco		                preco,
          nr_estoque		              estoque
     FROM tb_produto
     JOIN tb_marca    ON tb_produto.id_marca    = tb_marca.id_marca
    WHERE tb_produto.id_produto = ?`;
  
  const [linhas] = await con.query(comando, [id]);
  return linhas[0];
}

export async function buscarProdutoImagens(idProduto) {
  const comando = `
        select ds_imagem   as imagem
          from tb_imagem_produto
         where id_produto = ?
      `

  const [registros] = await con.query(comando, [idProduto]);
  return registros.map(item => item.imagem);
}

export async function Login(email, senha) {
  const comando = ` select tb_conta_usuario.id_conta_usuario     id,
                                            nm_usuario           nome,
                                            nm_sobrenome				 sobrenome,
                                            ds_email						 Email
                                        from tb_login_usuario
                                        join tb_conta_usuario
                                        on tb_login_usuario.id_conta_usuario     = tb_conta_usuario.id_conta_usuario
                                        where ds_email                              = ?
                                        and ds_senha                              = ?`;
  const [resposta] = await con.query(comando, [email, senha]);
  return resposta[0];
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

export async function ConsultarTudo() {
  const comando = `select nm_produto                        produto, 
  nr_preco                          preco, 
  tb_tipo.id_tipo                   tipo, 
  format(avg(nr_estrela), 1)        avaliacao, 
  id_tipo_skate                     tipoSkate, 
  id_categoria                      categoria, 
  bt_importado                      importado, 
  ds_imagem                         imagem, 
  tb_produto.id_produto             id,
  id_marca                          marca 
from tb_produto
join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
left join tb_produto_avaliacao on tb_produto_avaliacao.id_produto = tb_produto.id_produto
group by tb_produto.id_produto`
            
  const [resposta] = await con.query(comando);
  return resposta;
}

export async function ConsultarTenis() {
  const comando = `select nm_produto                        produto, 
  nr_preco                          preco, 
  tb_tipo.id_tipo                   tipo, 
  format(avg(nr_estrela), 1)        avaliacao, 
  id_tipo_skate                     tipoSkate, 
  id_categoria                      categoria, 
  bt_importado                      importado, 
  ds_imagem                         imagem, 
  tb_produto.id_produto             id,
  id_marca                          marca 
from tb_produto
join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
left join tb_produto_avaliacao on tb_produto_avaliacao.id_produto = tb_produto.id_produto
where nm_tipo = "Tênis"
group by tb_produto.id_produto`
            
  const [resposta] = await con.query(comando);
  return resposta;
}

export async function ConsultarProdutoNome (nome) {
  const comando = `select nm_produto                        produto, 
  nr_preco                          preco, 
  tb_tipo.id_tipo                   tipo, 
  format(avg(nr_estrela), 1)        avaliacao, 
  id_tipo_skate                     tipoSkate, 
  id_categoria                      categoria, 
  bt_importado                      importado, 
  ds_imagem                         imagem, 
  tb_produto.id_produto             id,
  id_marca                          marca 
from tb_produto
join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
left join tb_produto_avaliacao on tb_produto_avaliacao.id_produto = tb_produto.id_produto
where nm_produto like ?
group by tb_produto.id_produto`
  
  const [resposta] = await con.query(comando, [ `%${nome}%` ]); 
  return resposta;
}

/* BUSCAR PRODUTO POR ID */
export async function BuscarNomePorID (id){
  const comando = 
  `SELECT tb_produto.id_produto   id,
          nm_marca	            marca,
          nm_tipo  		        tipo,
          nm_produto		        nome,
          ds_descricao	        descricao,
          nr_preco		        preco,
          nr_estoque		        estoque,
          ds_imagem               imagem     
     FROM tb_produto
    INNER JOIN tb_marca           ON tb_produto.id_marca   = tb_marca.id_marca
    INNER JOIN tb_tipo            ON tb_produto.id_tipo    = tb_tipo.id_tipo
    INNER JOIN tb_imagem_produto  ON tb_produto.id_produto = tb_imagem_produto.id_produto
    WHERE tb_produto.id_produto = ? `;
  
  const [linhas] = await con.query(comando, [id]);
  return linhas[0];
}



export async function ConsultarSkate() {
  const comando = `select nm_produto                        produto, 
                          nr_preco                          preco, 
                          tb_tipo.id_tipo                   tipo, 
                          format(avg(nr_estrela), 1)        avaliacao, 
                          id_tipo_skate                     tipoSkate, 
                          id_categoria                      categoria, 
                          bt_importado                      importado, 
                          ds_imagem                         imagem, 
                          tb_produto.id_produto             id,
                          id_marca                          marca 
                  from tb_produto
                    join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
                    join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
                    left join tb_produto_avaliacao on tb_produto_avaliacao.id_produto = tb_produto.id_produto
                  where nm_tipo = "Skate"
                  group by tb_produto.id_produto`

  const [resposta] = await con.query(comando);
  return resposta;
}

export async function ConsultarBone() {
  const comando = `select nm_produto                        produto, 
  nr_preco                          preco, 
  tb_tipo.id_tipo                   tipo, 
  format(avg(nr_estrela), 1)        avaliacao, 
  id_tipo_skate                     tipoSkate, 
  id_categoria                      categoria, 
  bt_importado                      importado, 
  ds_imagem                         imagem, 
  tb_produto.id_produto             id,
  id_marca                          marca 
from tb_produto
join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
left join tb_produto_avaliacao on tb_produto_avaliacao.id_produto = tb_produto.id_produto
where nm_tipo = "Boné"
group by tb_produto.id_produto`
            
  const [resposta] = await con.query(comando);
  return resposta;
}

export async function ConsultarAcessorios() {
  const comando = `select nm_produto                        produto, 
  nr_preco                          preco, 
  tb_tipo.id_tipo                   tipo, 
  format(avg(nr_estrela), 1)        avaliacao, 
  id_tipo_skate                     tipoSkate, 
  id_categoria                      categoria, 
  bt_importado                      importado, 
  ds_imagem                         imagem, 
  tb_produto.id_produto             id,
  id_marca                          marca 
from tb_produto
join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
left join tb_produto_avaliacao on tb_produto_avaliacao.id_produto = tb_produto.id_produto
where nm_tipo = "Acessórios"
group by tb_produto.id_produto`
            
  const [resposta] = await con.query(comando);
  return resposta;
}

export async function Promocoes() {
  const comando = `select nm_produto                        produto, 
  nr_preco                          preco, 
  tb_tipo.id_tipo                   tipo, 
  format(avg(nr_estrela), 1)        avaliacao, 
  id_tipo_skate                     tipoSkate, 
  id_categoria                      categoria, 
  bt_importado                      importado, 
  ds_imagem                         imagem, 
  tb_produto.id_produto             id,
  id_marca                          marca 
from tb_produto
join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
left join tb_produto_avaliacao on tb_produto_avaliacao.id_produto = tb_produto.id_produto
where bt_promocao = 1
group by tb_produto.id_produto`
            
  const [resposta] = await con.query(comando);
  return resposta;
}

export async function AlterarInfosConta (infos,id){
  const comando =`update tb_conta_usuario
                  set nm_usuario = ?,
                      nm_sobrenome = ?
                  where id_conta_usuario = ?`
  const [resposta] = await con.query(comando,[infos.nome, infos.sobrenome, id])
  return resposta.affectedRows;
}

export async function AlterarInfosLogin (infos,id){
  const comando = `update tb_login_usuario
                   set ds_email = ?,
                       ds_senha = ?
                   where id_login_usuario = ?`
  const [resposta] = await con.query(comando,[infos.email, infos.senha, id])
  return resposta.affectedRows;
}

/****************************************************************************************************/

/* CONSULTAR PEDIDO */
export async function ConsultarPedido(idUsuario){
  const comando = 
  `select tb_pedido.id_pedido         id,
          tb_pedido.id_conta_usuario  idUser,
          nm_usuario                  nome,
          nm_sobrenome                sobrenome,
          DATE_FORMAT                 (dt_pedido, '%d-%m-%y às %Hh%i') AS data,
          ds_status	                  status
     from tb_pedido
     join tb_conta_usuario on tb_pedido.id_conta_usuario = tb_conta_usuario.id_conta_usuario
    where tb_pedido.id_conta_usuario = ?
    order
       by 
     data
     desc
  `;
  const [resposta] = await con.query(comando,[idUsuario]);
  return resposta;
}

/* DETALHE DO PEDIDO */
export async function DetalhePedido(idPedido, idUsuario){
  const comando = 
  `select id_pedido_item		            nome,
          tb_produto.id_produto         idProduto,
          tb_imagem_produto.ds_imagem   imagem,
          nm_produto			              nome_produto,
          tb_pedido.ds_status           status,
          DATE_FORMAT                   (dt_pedido, '%d-%m-%y às %Hh%i') AS data,
          nr_preco				              valor,
          qtd_itens                     qtd
     from tb_pedido_item
     join tb_pedido 			          on tb_pedido_item.id_pedido   = tb_pedido.id_pedido
     join tb_produto 			          on tb_pedido_item.id_produto  = tb_produto.id_produto
     join tb_imagem_produto         on tb_produto.id_produto      = tb_imagem_produto.id_produto
     where tb_pedido_item.id_pedido = ? and tb_pedido.id_conta_usuario = ?
     group by 
      tb_produto.id_produto
  `;

  const [resposta] = await con.query(comando, [idPedido, idUsuario]);
  return resposta;
}

/* AVALIAR PRODUTO */
export async function avaliarProduto(idProduto, idUser, descricao, nota) {
  const comando = `
      insert into tb_produto_avaliacao (ID_PRODUTO, ID_CONTA_USUARIO,  DS_AVALIACAO, NR_ESTRELA)
	                              values (?, ?, ?, ?);
  `

  const [resposta] = await con.query(comando, [idProduto, idUser, descricao, nota]);
  return resposta.insertId;
}

/* ALTERAR AVALIAÇÃO DO PRODUTO */
export async function deletarAvaliacao (id){
  const comando = `delete from tb_produto_avaliacao
  where id_produto_avaliacao = ?`
  const [resposta] = await con.query(comando,[id])
  
  return resposta.affectedRows;
}

/* BUSCAR AVALIAÇÃO DO PRODUTO*/
export async function buscarAval1(idProduto, idUser) {
  const comando = `select id_produto_avaliacao                      id,
                   DS_AVALIACAO                                     descricao, 
                   NR_ESTRELA                                       nota 
        from tb_produto_avaliacao
        join tb_conta_usuario on tb_conta_usuario.id_conta_usuario = tb_produto_avaliacao.id_conta_usuario
        where id_produto = ?
        and TB_PRODUTO_AVALIACAO.ID_CONTA_USUARIO = ?`
  const [resposta] = await con.query(comando, [idProduto, idUser]);
  return resposta;
}

export async function buscarAval2(id) {
  const comando = `select id_produto_avaliacao                      id,
                   nm_usuario                                       nome,
                   DS_AVALIACAO                                     descricao, 
                   NR_ESTRELA                                       nota 
        from tb_produto_avaliacao
        join tb_conta_usuario on tb_conta_usuario.id_conta_usuario = tb_produto_avaliacao.id_conta_usuario
        where id_produto = ?`
  const [resposta] = await con.query(comando, [id]);
  return resposta;
}

