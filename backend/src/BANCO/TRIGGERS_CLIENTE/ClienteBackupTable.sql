create table clienteBackup(
idCliente int,
nome varchar(245),
data_nasc date,
cpf varchar(20), 
email varchar(150), 
sexo varchar(50), 
telefone varchar(45),
senha varchar(250), 
matricula varchar(45),
dataAtualizacao datetime default current_timestamp on update current_timestamp,
dataExclusao datetime 
 );
 
 





/*-- possíveis caso de uso: 
impedir de colocar a mesma senha anterior
recuperação de dados 
 */