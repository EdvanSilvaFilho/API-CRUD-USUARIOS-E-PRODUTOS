CREATE DATABASE IF NOT EXISTS market_cubos;

CREATE TABLE IF NOT EXISTS usuarios (
  id serial primary key,
  nome varchar(20) not null,
  nome_loja varchar(30) not null,
  email varchar(60) not null unique,
  senha varchar(60) not null
);

CREATE TABLE IF NOT EXISTS produtos (
  id serial primary key,
  usuario_id integer not null,
  nome varchar(20) not null,
  quantidade integer not null,
  categoria varchar(30) not null,
  preco integer not null,
  descricao text,
  imagem text,
  foreign key (usuario_id) references usuarios (id)
);