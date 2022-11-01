create database samuraisdb;
use samuraisdb;


select * from tb_login_usuario;
select * from tb_conta_usuario;
select * from tb_login_usuario;
select * from tb_conta_usuario;

select * from tb_cartao;
-- Tabela do Admin
create table tb_admin(
	ID_ADMIN 		int primary key auto_increment,
      DS_EMAIL		varchar(100),
      DS_SENHA      varchar(100)
);


-- Tabela do Usuário
create table tb_conta_usuario (
	 ID_CONTA_USUARIO 		int primary key auto_increment,
	 NM_USUARIO				varchar(100),
	 NM_SOBRENOME			varchar(100)
);

-- Tabela do Usuário Login
create table tb_login_usuario (
	ID_LOGIN_USUARIO	int primary key auto_increment,
	ID_CONTA_USUARIO	int,
	DS_EMAIL			varchar(200),
	DS_SENHA 			varchar(100),
    
    foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO)
);



-- Tabela Endereço do Usuário
create table tb_usuario_endereco (
	  ID_USUARIO_ENDERECO 		int primary key auto_increment,
	  ID_CONTA_USUARIO			int,
	  ds_referencia				varchar(200),
      DS_CEP					varchar(9),
      NM_RUA					varchar(100),
      NR_NUMERO					int,
      ds_complemento			varchar(200),
      ds_bairro					varchar(100),
      ds_cidade					varchar(100),
      ds_estado					varchar(100),
      
      foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO)
);

-- Tabela da marca
create table tb_marca (
	ID_MARCA	int primary key auto_increment,
	NM_MARCA	varchar(100)
);

-- Tabela da categoria
create table tb_categoria (
	ID_CATEGORIA		int primary key auto_increment,
	NM_CATEGORIA		varchar(100)
);

-- Tabela dos tipos de produto
create table tb_tipo (
	ID_TIPO 			int primary key auto_increment,
 	NM_TIPO				varchar(100)
);

-- tabela tipo skate
create table tb_tipo_skate (
    id_tipo_skate            int primary key auto_increment,
    nm_tipo_skate            varchar(100)

);

-- Tabela do produto
create table tb_produto	(
	ID_PRODUTO			int primary key auto_increment,
	ID_MARCA			int,
	ID_CATEGORIA		int,
	ID_TIPO				int,
    ID_TIPO_SKATE		int,
	NM_PRODUTO			varchar(200),
	DS_DESCRICAO		varchar(600),
	NR_TAMANHO			int,
    BT_IMPORTADO		boolean,
	BT_PROMOCAO			boolean,
	NR_PRECO			decimal(15, 2),
    NR_ESTOQUE			int,
    
    foreign key (ID_MARCA) references tb_marca (ID_MARCA),
    foreign key (ID_CATEGORIA) references tb_categoria (ID_CATEGORIA),
    foreign key (ID_TIPO) references tb_tipo (ID_TIPO),
    foreign key (ID_TIPO_SKATE) references tb_tipo_skate (ID_TIPO_SKATE)
);


-- Tabela da imagem do produto
create table tb_imagem_produto (
	ID_IMAGEM_PRODUTO		int primary key auto_increment,
	ID_PRODUTO				int,
	DS_IMAGEM				varchar(800),
    
    foreign key (ID_PRODUTO) references tb_produto (ID_PRODUTO)
);

-- Tabela da avaliação do produto
create table tb_produto_avaliacao (
	ID_PRODUTO_AVALIACAO 	int primary key auto_increment,
	ID_CONTA_USUARIO		int,
	ID_PRODUTO				int,
	DS_AVALIACAO			varchar(600),
	NR_ESTRELA				int,
    
    foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO),
    foreign key (ID_PRODUTO) references tb_produto (ID_PRODUTO)
);

-- Tabela do produto curtido
create table tb_produto_curtido (
	ID_PRODUTO_CURTIDO 	int primary key auto_increment,
	ID_PRODUTO				int,
    ID_CONTA_USUARIO		int,
    ID_IMAGEM_PRODUTO		int,
    
    foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO),
    foreign key (ID_PRODUTO) references tb_produto (ID_PRODUTO),
    foreign key (ID_IMAGEM_PRODUTO) references tb_imagem_produto (ID_IMAGEM_PRODUTO)
);

-- Tabela do status do pedido
create table tb_pedido_status (
	ID_PEDIDO_STATUS		int primary key auto_increment,
	NM_STATUS				varchar(100),
	IMG_STATUS				varchar(600)
);

-- Tabela de cupom
create table tb_cupom (
	id_cupom			int primary key auto_increment,
    cod_cupom			varchar(200),
    vl_cupom			decimal(15,2),
    qtd_restante		int
);

create table tb_cartao(
	id_cartao		int primary key auto_increment,
    id_login_usuario	int,
    nm_cartao		varchar(20),
    ds_numero		varchar(16),
    dt_vencimento	varchar(10),
    ds_cvv			varchar(3),
  foreign key (id_login_usuario) references tb_login_usuario (id_login_USUARIO)
);


-- Tabela do pedido
create table tb_pedido (
	id_pedido			int primary key auto_increment,
    id_conta_usuario	int,
    id_usuario_endereco	int,
    id_cupom			int,
    dt_pedido			datetime,
    cod_nota_fiscal		varchar(200),
    ds_status			varchar(200),
    tp_pagamento		varchar(200),
    foreign key (id_conta_usuario) references tb_conta_usuario (ID_CONTA_USUARIO),
    foreign key (id_usuario_endereco) references tb_usuario_endereco (id_usuario_endereco),
    foreign key (id_cupom) references tb_cupom (id_cupom)
);

-- Tabela do item do pedido
create table tb_pedido_item (
	id_pedido_item		int primary key auto_increment,
    id_pedido			int,
    id_produto			int,
    qtd_itens			int,
    vl_produto			decimal(15,2),
    foreign key (id_pedido) references tb_pedido (id_pedido),
    foreign key (id_produto) references tb_produto (id_produto)
);

-- Tabela de pagamento em cartão
create table tb_pagamento_cartao (
	id_pagamento_cartao		int primary key auto_increment,
    id_pedido				int,
	id_cartao				int,
    nr_parcelas				int,
    ds_forma_pagamento		varchar(200),
    foreign key (id_cartao) references tb_cartao (id_cartao),
    foreign key (id_pedido) references tb_pedido (id_pedido)
);

-- Tabela de pagamento boleto
create table tb_pedido_pag_boleto (
	ID_PEDIDO_PAG_BOLETO 		int primary key auto_increment,
	ID_PEDIDO					int,
	NR_CODIGO					int,
	DT_VENCIMENTO				datetime,
	NR_VALOR					decimal(15, 2),
    
	foreign key (ID_PEDIDO) references tb_pedido (ID_PEDIDO)
);

-- Tabela de pagamento pix
create table tb_pedido_pag_pix (
	ID_PEDIDO_PAG_PIX 		int primary key auto_increment,
	ID_PEDIDO					int,
	NR_VALOR					decimal(15, 2),
	DT_VENCIMENTO				datetime,
	NM_USUARIO					varchar(100),
    DS_CHAVE					varchar(200),
    
	foreign key (ID_PEDIDO) references tb_pedido (ID_PEDIDO)
);

-- Tabela Produto pedido
create table tb_produto_pedido (
	ID_PRODUTO_CATEGORIA		int primary key auto_increment,
	ID_PRODUTO					int,
	ID_PEDIDO					int,
    
    foreign key (ID_PEDIDO) references tb_pedido (ID_PEDIDO),
    foreign key (ID_PRODUTO) references tb_produto (ID_PRODUTO)
);



