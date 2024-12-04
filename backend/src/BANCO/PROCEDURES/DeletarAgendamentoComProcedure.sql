use salaosenac;

delimiter $$
create procedure DeletarAgendamento(p_idAgendamento int)

begin

delete from agendamento

where idAgendamento = p_idAgendamento;

end $$

delimiter ;