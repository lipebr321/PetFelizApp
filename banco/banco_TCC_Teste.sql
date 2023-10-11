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

select * from tb_logradouro;

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

select * from Tb_Usuario;

INSERT INTO TB_vacina (nome_especie) VALUES
  ('Cão'),
  ('Gato'),
  ('Coelho'),
  ('Pássaro');

-- Inserir raças de cachorro na tabela Tb_Raca (Cod_Especie = 1)
INSERT INTO Tb_Raca (Nome_Raca, Cod_Especie) VALUES
('Labrador Retriever', 1),
('Bulldog Inglês', 1),
('Golden Retriever', 1),
('Poodle', 1),
('Beagle', 1),
('Bulldog Francês', 1),
('Yorkshire Terrier', 1),
('Dachshund', 1),
('Boxer', 1),
('Chihuahua', 1);

select * from tb_raca;

-- Inserir 10 cachorros na tabela Tb_Animal
INSERT INTO Tb_Animal (Nome_Animal, Cod_Raca) VALUES
('Rex', 1), -- Exemplo: Cachorro chamado Rex associado à raça com Cod_Raca 1
('Buddy', 3), -- Exemplo: Cachorro chamado Buddy associado à raça com Cod_Raca 2
('Luna', 3),
('Max', 4),
('Charlie', 5),
('Bailey', 6),
('Lucy', 7),
('Rocky', 8),
('Coco', 9),
('Milo', 10);

select * from tb_animal;

-- Inserir animais de estimação com Cod_Usuario igual a 1
INSERT INTO Tb_Pet (Nome_Pet, Sexo_Pet, Descricao_Pet, Idade_Pet, Foto_Pet, Porte_Pet, Status_Pet, Cod_Usuario, Cod_Animal) VALUES
('Rex', 'M', 'Um cachorro muito amigável', '3 anos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdY5YxHQ7NfnQQvlrcbIyCYGmf4iNMTlZUhQ&usqp=CAU', 'Médio', 'Disponível', 1, 12),
('Luna', 'F', 'Uma gatinha adorável', '2 anos', 'https://static.wixstatic.com/media/e2e4ef_33e572bf2cc1415489c351e1120e06b6~mv2.jpeg/v1/fill/w_648,h_636,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Maria%2520-%2520cachorro%2520para%2520adocao%2520-.jpeg', 'Pequeno', 'Disponível', 1, 13),
('Lucy', 'F', 'Uma cachorrinha brincalhona', '1 ano e meio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2eqfp_TeTZrgBOdObXkUnkcJzuk0wh6UGBw&usqp=CAU', 'Médio', 'Disponível', 1, 14),
('Bella', 'F', 'Uma cadelinha inteligente', '2 anos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQZ01RVJvroghRgkVAJI3t_14aLtN_cwtEzA&usqp=CAU', 'Médio', 'Disponível', 1, 20),
('Oliver', 'M', 'Um gato curioso', '3 anos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoM9ipFKDuKdY3Fj2XgUW2w9Af-FYJevuukw&usqp=CAU', 'Médio', 'Adotado', 1, 19),
('Milo', 'M', 'Um cachorro alegre', '4 anos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcRDA6lYZe3WJo384dV7qDk9__LT-d0MX7_g&usqp=CAU', 'Grande', 'Disponível', 1, 18),
('Zoe', 'F', 'Uma gatinha brincalhona', '1 ano e meio', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn31p4T3bGxWWVjNbyN_4NomAyXg0COEkduw&usqp=CAU', 'Pequeno', 'Disponível', 1, 20),
('Coco', 'F', 'Uma cadelinha adorável', '2 anos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHFC6Y7SpZ7tW2azCrrIrxuvDLrzI5R4yvQ&usqp=CAU', 'Médio', 'Disponível', 1, 21);







