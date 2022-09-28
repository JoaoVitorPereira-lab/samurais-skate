create database samuraisdb; 

use samuraisdb;

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
      DS_CEP					varchar(9),
      NM_RUA					varchar(100),
      NR_NUMERO					int,
      
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

-- Tabela do produto
create table tb_produto	(
	ID_PRODUTO			int primary key auto_increment,
	ID_MARCA			int,
	ID_CATEGORIA		int,
	ID_TIPO				int,
	NM_PRODUTO			varchar(200),
	DS_DESCRICAO		varchar(600),
	BT_PROMOCAO			boolean,
	NR_PRECO			decimal(15, 2),
	VL_AVALIACAO		int,
    NR_ESTOQUE			int,
    
    foreign key (ID_MARCA) references tb_marca (ID_MARCA),
    foreign key (ID_CATEGORIA) references tb_categoria (ID_CATEGORIA),
    foreign key (ID_TIPO) references tb_tipo (ID_TIPO)
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
    
    foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO),
    foreign key (ID_PRODUTO) references tb_produto (ID_PRODUTO)
);

-- Tabela do status do pedido
create table tb_pedido_status (
	ID_PEDIDO_STATUS		int primary key auto_increment,
	NM_STATUS				varchar(100),
	IMG_STATUS				varchar(600)
);

-- Tabela do pedido
create table tb_pedido (
	ID_PEDIDO				int primary key auto_increment,
	ID_CONTA_USUARIO		int,
	ID_USUARIO_ENDERECO		int,
	ID_PEDIDO_STATUS		int,
	TP_PAGAMENTO			varchar(100),
	DT_PEDIDO				date,
	NR_VALOR				decimal (15, 2),
    
    foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO),
    foreign key (ID_USUARIO_ENDERECO) references tb_usuario_endereco (ID_USUARIO_ENDERECO),
    foreign key (ID_PEDIDO_STATUS) references tb_pedido_status (ID_PEDIDO_STATUS)
);

-- Tabela de pagamento em cartão
create table tb_pedido_pag_cartao (
	ID_PEDIDO_PAG_CARTAO		int primary key auto_increment,
	ID_PEDIDO					int,
	NR_CARTAO					int,
	DT_VENCIMENTO				date,
	NM_DONO_DO_CARTAO			varchar(100),
	BT_SALVAR_CARTAO			boolean,
	NR_VALOR					decimal(15, 2),
    
    foreign key (ID_PEDIDO) references tb_pedido (ID_PEDIDO)
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

-- tabela tipo skate
create table tb_tipo_skate (
    id_tipo_skate            int primary key auto_increment,
    id_tipo                  int,
    nm_tipo_skate            varchar(100),

    foreign key (id_tipo) references tb_tipo (id_tipo)
);

