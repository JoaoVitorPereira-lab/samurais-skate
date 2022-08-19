create database SAMURAISDB;

use samuraisdb;

create table tb_admin(
	id_admin		int primary key auto_increment,
    ds_email		varchar(100),
    ds_senha		varchar(100)
);

create table tb_produto (
	id_produto		int primary key auto_increment,
    nm_produto		varchar(100),
    ds_marca		varchar(100),
    ds_preco		varchar(100),
    vl_avaliacao	varchar(100),
    dt_lancamento	date,
    bt_promo		bool
);

create table tb_cliente (
	id_cliente		int primary key auto_increment,
    ds_email		varchar(100),
    ds_senha		varchar(100)
);

create table tb_produto_cliente(
	id_produto_cliente		int primary key auto_increment,
    id_produto				int,
    id_cliente				int,
    foreign key (id_produto) references tb_produto (id_produto),
    foreign key (id_cliente) references tb_cliente (id_cliente)
);