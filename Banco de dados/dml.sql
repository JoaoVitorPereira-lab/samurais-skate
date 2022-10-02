use samuraisdb;

-- CARGAS INICIAIS

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
-- ----------------------------------------------


-- ENDPOINTS/CASO DE USO
-- CADASTRAR PRODUTO
INSERT INTO tb_produto (id_marca, id_categoria, id_tipo, nm_produto, ds_descricao, bt_promocao, nr_preco, nr_estoque)
		        VALUES (1, 1, 1,'Skate','Skate muito monstroooooo', 0 , 1234 , 1234);
-- ----------------------------------------------

-- CONSULTAR PEDIDO
SELECT id_produto		'id',
	   nm_marca			'marca',
	   nm_categoria     'categoria',
	   nm_tipo  		'tipo',
       nm_produto		'nome',
       ds_descricao	    'descricao',
       bt_promocao	    'promocao',
	   nr_preco			'preco',
	   vl_avaliacao		'avaliacao',
       nr_estoque		'estoque'
  FROM tb_produto
 INNER JOIN tb_marca     ON tb_produto.id_marca = tb_marca.id_marca
 INNER JOIN tb_categoria ON tb_produto.id_categoria = tb_categoria.id_categoria
 INNER JOIN tb_tipo      ON tb_produto.id_tipo = tb_tipo.id_tipo
 ORDER 
	BY id_produto;
-- ----------------------------------------------

-- ALTERAR PEDIDO
UPDATE tb_produto
   SET id_marca			= 1,
	   id_categoria     = 3,
	   id_tipo  		= 2,
       nm_produto		= 'skate teste',
       ds_descricao	    = 'skate muiiiitoooo boooommmm',
       bt_promocao	    = false,
	   nr_preco			= 122.98,
       nr_estoque		= 2
 WHERE id_produto      = 6;
-- ---------------------------------------------- 
 
-- BUSCAR POR ID
SELECT id_produto      	id,
	   id_marca	    	marca,
	   id_categoria    	categoria,
	   id_tipo  		tipo,
	   nm_produto		nome,
	   ds_descricao		descricao,
	   bt_promocao	    promocao,
	   nr_preco			preco,
	   vl_avaliacao		avaliacao,
	   nr_estoque		estoque
  FROM tb_produto
 WHERE id_produto = 1;
-- ----------------------------------------------

-- BUSCAR POR NOME
SELECT id_produto      	id,
	   id_marca	    	marca,
	   id_categoria    	categoria,
	   id_tipo  		tipo,
	   nm_produto		nome,
	   ds_descricao		descricao,
	   bt_promocao	    promocao,
	   nr_preco			preco,
	   vl_avaliacao		avaliacao,
	   nr_estoque		estoque
  FROM tb_produto
 WHERE nm_produto      like "%%";
-- ----------------------------------------------

-- INSERIR IMAGEM
INSERT INTO TB_IMAGEM_PRODUTO (id_produto, ds_imagem) 
	                   VALUES (?, ?);
-- ----------------------------------------------

-- CONSULTAR CATEGORIA 
SELECT id_categoria     id,
	   nm_categoria 	nome
  FROM tb_categoria;
-- ----------------------------------------------

-- CONSULTAR TIPOS
SELECT id_tipo		id,
	   nm_tipo 		nome
  FROM tb_tipo;
-- ----------------------------------------------
  
-- CONSULTAR MARCA
SELECT id_marca		id,
	   nm_marca		nome
  FROM tb_marca;
-- ----------------------------------------------  

-- CONSULTAR TIPOS DO SKATE
SELECT id_tipo_skate      id,
	   nm_tipo_skate      nome
  FROM tb_tipo_skate;
-- ----------------------------------------------
  
-- EFETUAR LOGIN
select id_admin    id
  from tb_admin
 where ds_email    = 'admin@admin.com'
   and ds_senha    = 'pedroatacantedohexa';