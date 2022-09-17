create database SAMURAISDB;

use samuraisdb;

create table tb_admin(
	ID_ADMIN 		int primary key auto_increment,
      DS_EMAIL		varchar(100),
      DS_SENHA      varchar(100)
);

create table tb_conta_usuario (
	 ID_CONTA_USUARIO 		int primary key auto_increment,
	 NM_USUARIO				varchar(100),
	 NM_SOBRENOME			varchar(100)
);

create table tb_login_usuario (
	ID_LOGIN_USUARIO	int primary key auto_increment,
	ID_CONTA_USUARIO	int,
	DS_EMAIL			varchar(200),
	DS_SENHA 			varchar(100),
    
    foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO)
);

create table tb_usuario_endereco (
	  ID_USUARIO_ENDERECO 		int primary key auto_increment,
	  ID_CONTA_USUARIO			int,
      DS_CEP					varchar(9),
      NM_RUA					varchar(100),
      NR_NUMERO					int,
      
      foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO)
);

create table tb_marca (
	ID_MARCA	int primary key auto_increment,
	NM_MARCA	varchar(100)
);

create table tb_categoria (
	ID_CATEGORIA		int primary key auto_increment,
	NM_CATEGORIA		varchar(100)
);

create table tb_tipo (
	ID_TIPO 			int primary key auto_increment,
 	NM_TIPO				varchar(100)
);

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
	DT_LANCAMENTO		date,
	DS_TIPO				varchar(100),
    
    foreign key (ID_MARCA) references tb_marca (ID_MARCA),
    foreign key (ID_CATEGORIA) references tb_categoria (ID_CATEGORIA),
    foreign key (ID_TIPO) references tb_tipo (ID_TIPO)
);

create table tb_imagem_produto (
	ID_IMAGEM_PRODUTO		int primary key auto_increment,
	ID_PRODUTO				int,
	DS_IMAGEM				varchar(800),
    
    foreign key (ID_PRODUTO) references tb_produto (ID_PRODUTO)
);

create table tb_produto_avaliacao (
	ID_PRODUTO_AVALIACAO 	int primary key auto_increment,
	ID_CONTA_USUARIO		int,
	ID_PRODUTO				int,
	DS_AVALIACAO			varchar(600),
	NR_ESTRELA				int,
    
    foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO),
    foreign key (ID_PRODUTO) references tb_produto (ID_PRODUTO)
);

create table tb_produto_curtido (
	ID_PRODUTO_CURTIDO 	int primary key auto_increment,
	ID_PRODUTO				int,
    ID_CONTA_USUARIO		int,
    
    foreign key (ID_CONTA_USUARIO) references tb_conta_usuario (ID_CONTA_USUARIO),
    foreign key (ID_PRODUTO) references tb_produto (ID_PRODUTO)
);















