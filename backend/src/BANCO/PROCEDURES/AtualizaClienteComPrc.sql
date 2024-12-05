use salaosenac;

delimiter $$
create procedure AtualizaCliente(
			p_idCliente int,
			p_nome varchar(245),
			p_data_nasc date,
			p_cpf varchar(20),
            p_email varchar(150),
            p_sexo varchar(50),
            p_telefone varchar(45), 
			p_senha varchar(250), 
			p_matricula varchar(45)
            
            )
	begin
		update cliente
        set
			nome = ifnull(p_nome, nome),
            data_nasc = ifnull(p_data_nasc, data_nasc),
            cpf =ifnull(p_cpf, cpf),
            email =ifnull(p_email, email),
            sexo =ifnull(p_sexo, sexo),
            telefone =ifnull(p_telefone, telefone),
            senha = ifnull(p_senha, senha),
            matricula = ifnull(p_matricula, matricula)
		where
        idCliente = p_idCliente;
	end $$

delimiter ;

--teste!!!
call AtualizaCliente(5, 'jose', null, null, null, null, null, null, null )

