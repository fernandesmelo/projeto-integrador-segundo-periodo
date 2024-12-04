delimiter $$

create trigger insereDadosBackup
after insert on cliente
for each row 
begin 
	insert into clientebackup(idCliente,
							nome, data_nasc, cpf,
                            email, sexo, telefone,
                            senha, matricula, dataAtualizacao)
    values
    (new.idCliente, new.nome, new.data_nasc,
    new.cpf, new.email, new.sexo,
    new.telefone, new.senha, new.matricula,
    now());
    

end $$

delimiter ;

-- teste

INSERT INTO cliente (nome, data_nasc, cpf, email, sexo, telefone, senha, matricula) 
VALUES 
('Maria Oliveira', '1988-05-22', '888.654.888-77', 'maria.oliveira@email.com', 'Feminino', '(21) 99876-5432', 'senhaSegura456!', 'MAT20231235'),
('Carlos Souza', '1990-07-15', '557.655.555-55', 'carlos.souza@email.com', 'Masculino', '(31) 91234-5678', 'senhaSegura789!', 'MAT20231236'),
(
    'Maria Oliveira', 
    '1988-05-22', 
    '111.000.999-33', 
    'oliveiraguedes@email.com', 
    'Feminino', 
    '(21) 99876-5432', 
    'senhaSegura456!', 
    NULL
);
