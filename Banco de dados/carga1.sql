use samuraisdb;

-- ADMIN
insert into tb_admin (ds_email, ds_senha)
			 values ('admin@admin.com', 'pedroatacantedohexa');

             
-- INSERIR TIPO SKATE
insert into tb_tipo_skate (nm_tipo_skate)
			 values ('Equipamento de proteção');
insert into tb_tipo_skate (nm_tipo_skate)
			 values ('Skate Montado');
insert into tb_tipo_skate (nm_tipo_skate)
			 values ('Rolamento');
insert into tb_tipo_skate (nm_tipo_skate)
			 values ('Shape');
insert into tb_tipo_skate (nm_tipo_skate)
			 values ('Truck');
-- ----------------------------------------------
-- INSERIR TIPO
insert into tb_tipo (nm_tipo)
			 values ('Skate');
insert into tb_tipo (nm_tipo)
			 values ('Boné');
insert into tb_tipo (nm_tipo)
			 values ('Tênis');
insert into tb_tipo (nm_tipo)
			 values ('Acessórios');
-- ----------------------------------------------
-- INSERIR MARCA
insert into tb_marca (nm_marca)
			 values ('Flip Skateboards');
insert into tb_marca (nm_marca)
			 values ('Santa Cruz');             
insert into tb_marca (nm_marca)
			 values ('Girl Skateboards');             
insert into tb_marca (nm_marca)
			 values ('Element');             
insert into tb_marca (nm_marca)
			 values ('Thrasher');             
insert into tb_marca (nm_marca)
			 values ('Everlong Skate');
insert into tb_marca (nm_marca)
			 values ('Vans');
insert into tb_marca (nm_marca)
			 values ('Tesla');             
insert into tb_marca (nm_marca)
			 values ('DC Shoes');             
insert into tb_marca (nm_marca)
			 values ('Grizzly');             
insert into tb_marca (nm_marca)
			 values ('Hocks');             
insert into tb_marca (nm_marca)
			 values ('Nine Clouds');
insert into tb_marca (nm_marca)
			 values ('Nike');             
insert into tb_marca (nm_marca)
			 values ('Lakai');
insert into tb_marca (nm_marca)
			 values ('ÖUS');
insert into tb_marca (nm_marca)
			 values ('Independent');             
insert into tb_marca (nm_marca)
			 values ('Diamond');             
insert into tb_marca (nm_marca)
			 values ('Hondar');             
insert into tb_marca (nm_marca)
			 values ('High Company');             
insert into tb_marca (nm_marca)
			 values ('Hocks');
-- ----------------------------------------------
-- INSERIR CATEGORIA
insert into tb_categoria (nm_categoria)
			 values ('Iniciante');
insert into tb_categoria (nm_categoria)
			 values ('Semi-Profissional');             
insert into tb_categoria (nm_categoria)
			 values ('Profissional');


select nm_produto	nome,
	   nr_preco		preco,
       ds_imagem	imagem
  from tb_produto_curtido
  join tb_produto 			on tb_produto_curtido.id_produto 		= tb_produto.id_produto
  join tb_imagem_produto 	on tb_produto_curtido.id_imagem_produto = tb_imagem_produto.id_imagem_produto
 where id_conta_usuario = 1;

select dt_pedido		dt,
	   cod_nota_fiscal	codigo,
       ds_status		stts,
	   nm_usuario		nome
  from tb_pedido
  join tb_conta_usuario on tb_pedido.id_conta_usuario = tb_conta_usuario.id_conta_usuario;

select id_pedido_item		nome,
	   ds_imagem			imagem,
	   nm_produto			nome_produto,
       DATE_FORMAT (dt_pedido, '%d-%m-%y') AS data,
       nr_preco				valor,
       cod_nota_fiscal		codigo
  from tb_pedido_item
  join tb_pedido 			on tb_pedido_item.id_pedido = tb_pedido.id_pedido
  join tb_produto 			on tb_pedido_item.id_produto = tb_produto.id_produto
  join tb_imagem_produto 	on tb_produto.id_produto  = tb_imagem_produto.id_produto
 where tb_pedido_item.id_pedido = 1;

select * from tb_pedido;
select * from tb_pedido_item;
select * from tb_produto;


select ds_referencia	referencia,
	   ds_cep			cep,
	   nm_rua			rua,
       nr_numero		numero,
       ds_complemento	complemento,
       ds_bairro		bairro,
       ds_cidade		cidade,
       ds_estado		estado
  from tb_usuario_endereco
 where id_conta_usuario = 1;
 
insert into tb_usuario_endereco (id_conta_usuario, ds_referencia, ds_cep, nm_rua, nr_numero, ds_complemento, ds_bairro, ds_cidade, ds_estado)
						 values (1, 'MyHome', '04843-460', 'rua uraba', 7, 'Casa2', 'Grajaú', 'São Paulo', 'São Paulo');