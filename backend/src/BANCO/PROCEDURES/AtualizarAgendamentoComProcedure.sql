use salaosenac;

delimiter $$
create procedure AtualizaAgendamento(
			p_idAgendamento int,
			p_data date,
			p_horario time,
			p_funcionarioIdFuncionario int
            )
	begin
		update agendamento
        set
			data = ifnull(p_data, data),
            horario = ifnull(p_horario, horario),
            funcionarioIdFuncionario =ifnull(p_funcionarioIdFuncionario, funcionarioIdFuncionario)
		where
        idAgendamento = p_idAgendamento;
	end $$

delimiter ;