delimiter $$

create trigger atualizaClienteDados
after update on cliente 
for each row
begin
update clientebackup
set
	nome = new.nome,
    data_nasc = new.data_nasc,
    cpf = new.cpf,
    email = new.email,
    sexo = new.sexo,
    telefone = new.telefone,
    senha = new.senha,
    matricula =new.matricula,
    dataAtualizacao = now()

where idCliente = new.idCliente;

end $$

delimiter ;

-- teste
update cliente
set nome = 'joao Atualizado'
where idCliente = 22; 


SET SQL_SAFE_UPDATES = 1; -- ZERO para tirar modo segurança e UM para ativar
