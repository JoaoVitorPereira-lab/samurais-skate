use samuraisdb;

-- ENDPOINTS/CASO DE USO
-- CADASTRAR PRODUTO
INSERT INTO tb_produto (id_marca, id_categoria, id_tipo, id_tipo_skate, nm_produto, ds_descricao, nr_tamanho, bt_promocao, nr_preco, nr_estoque)
		        VALUES (1, 1, 1, 1, 'Skate','Skate muito monstroooooo', 38, 0 , 1234 , 1234);
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
   
-- ------------------------------------------------

-- CONSULTAR TENIS (USER)

select nm_produto, nr_preco, nr_estrela, tb_tipo.id_tipo, ds_imagem, tb_produto.id_produto 
from tb_produto_avaliacao
	join tb_produto on tb_produto.id_produto = tb_produto_avaliacao.id_produto
	join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
	join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
where nm_tipo = "";

-- Consultar tenis por nome
select nm_produto ,
	   nr_preco, vl_avaliacao, tb_tipo.id_tipo, ds_imagem, tb_produto.id_produto
  from tb_produto
join tb_tipo on tb_tipo.id_tipo = tb_produto.id_tipo
join tb_imagem_produto on tb_imagem_produto.id_produto = tb_produto.id_produto
where nm_tipo = "Tênis"
and nm_produto like '%a%';