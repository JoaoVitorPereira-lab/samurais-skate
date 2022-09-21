 use samuraisdb;

 -- Login 
 select tb_conta_usuario.id_conta_usuario      id,
        nm_usuario      nome
   from tb_login_usuario
   join tb_conta_usuario
     on tb_login_usuario.id_conta_usuario = tb_conta_usuario.id_conta_usuario
  where ds_email = 'admin@admin.com'
    and ds_senha = '1234'

-- Cadastrar Produto
INSERT INTO tb_produto  (id_marca, id_categoria, id_tipo, nm_produto, ds_descricao, bt_promocao, nr_preco, nr_estoque)
                     VALUES (1,1,1,'Skate','Skate muito fodaaa', 0 , 1234 , 1234);