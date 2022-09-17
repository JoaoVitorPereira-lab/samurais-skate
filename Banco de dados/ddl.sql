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

