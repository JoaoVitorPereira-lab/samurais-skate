use samuraisdb;

-- ADMIN
insert into tb_admin (`nm_admin`, `ds_sobrenome`, `DS_EMAIL`, `DS_SENHA`) 
		VALUES ('Bruno', 'Oliveira', 'admin@admin.com', '1234');

-- INSERIR TAMANHOS
insert into tb_tamanho (nr_tamanho)
			    values (35);
insert into tb_tamanho (nr_tamanho)
			    values (36);
insert into tb_tamanho (nr_tamanho)
			    values (37);
insert into tb_tamanho (nr_tamanho)
			    values (38);
insert into tb_tamanho (nr_tamanho)
			    values (39);
insert into tb_tamanho (nr_tamanho)
			    values (40);
insert into tb_tamanho (nr_tamanho)
			    values (41);
insert into tb_tamanho (nr_tamanho)
			    values (42);
insert into tb_tamanho (nr_tamanho)
			    values (43);
insert into tb_tamanho (nr_tamanho)
			    values (44);
insert into tb_tamanho (nr_tamanho)
			    values (45);
                          

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