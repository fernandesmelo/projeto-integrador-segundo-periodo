delimiter $$
create trigger registraExclusaoClienteBackup
before delete on cliente
for each row 
begin
update clientebackup
set
	nome = old.nome,
    data_nasc = old.data_nasc,
    cpf = old.cpf,
    email = old.email,
    sexo = old.sexo,
    telefone = old.telefone,
    senha = old.senha,
    matricula = old.matricula,
    dataExclusao = now()

where idCliente = old.idCliente;

end $$


delimiter ; 
-- teste 
SET SQL_SAFE_UPDATES = 1;

DELETE FROM cliente WHERE idCliente =22;