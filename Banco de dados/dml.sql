 use samuraisdb;

 
 select tb_conta_usuario.id_conta_usuario      id,
        nm_usuario      nome
   from tb_login_usuario
   join tb_conta_usuario
     on tb_login_usuario.id_conta_usuario = tb_conta_usuario.id_conta_usuario
  where ds_email = 'admin@admin.com'
    and ds_senha = '1234'