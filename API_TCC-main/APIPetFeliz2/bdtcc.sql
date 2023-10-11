create database Bd_Pet_Feliz;
use Bd_Pet_Feliz;

create table Tb_Logradouro(
Cod_Log int primary key not null auto_increment,
CEP varchar(10),
Nome_Log varchar(100) not null,
Numero_Log varchar (6) not null
);

INSERT INTO Tb_Logradouro VALUES (DEFAULT, '02020202', 'Louri', '0000');
SELECT LAST_INSERT_ID();

insert into Tb_Usuario (CPF, Nome_Usuario, Email, Telefone, senha, Cod_Log) values (0909090, "teste", "bgbg@gmail", "1145450080", "01111111", last_insert_id());

select * from Tb_Usuario u inner join tb_logradouro l on u.cod_log = l.cod_log;

select * from tb_especie;
create table Tb_Usuario (
Cod_Usuario int primary key not null auto_increment,
CPF varchar(15) unique not null,
Nome_Usuario varchar(30) not null,
Email varchar(100) not null unique,
Telefone varchar(20) not null,
Senha varchar(20) not null,
Cod_Log int,
foreign key (Cod_Log) references Tb_Logradouro (Cod_Log)
);

create table Tb_Especie(
Cod_Especie int primary key not null auto_increment,
Nome_Especie varchar(30) not null unique
);

create table Tb_Raca(
Cod_Raca int primary key not null auto_increment,
Nome_Raca varchar(30) not null unique,
Cod_Especie int,
foreign key (Cod_Especie) references Tb_Especie (Cod_Especie)
);

create table Tb_Animal(
Cod_Animal int primary key not null auto_increment,
Nome_Animal varchar(15) not null,
Cod_Raca int,
foreign key (Cod_Raca) references Tb_Raca (Cod_Raca)
);

create table Tb_Pet(
Cod_Pet int primary key not null auto_increment,
Nome_Pet varchar(20) not null,
Sexo_Pet varchar(1) not null,
Descricao_Pet varchar(150) not null,
Idade_Pet varchar(20) not null,
Foto_Pet varchar(10000) not null,
Porte_Pet varchar(10) not null,
Status_Pet varchar(10),
Cod_Usuario int,
Cod_Animal int,
foreign key (Cod_Usuario) references Tb_Usuario (Cod_Usuario),
foreign key (Cod_Animal) references Tb_Animal (Cod_Animal)
);

create table Tb_Vacina(
Cod_Vacina int primary key not null auto_increment,
Data_Vacina date,
Situacao varchar(20) not null,
Descricao varchar(100)
);

create table Tb_Pet_Vacina(
Cod_Pet int not null,
Cod_Vacina int not null,
primary key(Cod_Pet, Cod_Vacina),
foreign key (Cod_Pet) references Tb_Pet (Cod_Pet),
foreign key (Cod_Vacina) references Tb_Vacina (Cod_Vacina)
);


select * from Tb_Pet p inner join Tb_Animal a on p.Cod_Animal = a.Cod_Animal inner join Tb_Raca r on a.Cod_Raca = r.Cod_Raca inner join Tb_Especie e on r.Cod_Especie = e.Cod_Especie;


select * from Tb_Pet p left join Tb_Animal a on p.cod_animal = a.cod_animal left join Tb_Raca r on a.Cod_Raca = r.Cod_Raca left join Tb_Especie e on r.Cod_especie = e.Cod_especie;

select * from Tb_Usuario
