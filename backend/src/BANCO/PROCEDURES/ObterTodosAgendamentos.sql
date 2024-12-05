use salaosenac;

delimiter $$

create procedure ObterTodosAgendamentos()
begin
    select 
        a.idAgendamento,
        a.data,
        a.horario,
        a.valorTotal,
        c.idCliente,
        c.nome as nomeCliente,
        c.email,
        c.telefone,
        f.idFuncionario,
        coalesce(f.nome, 'Profissional não selecionado') as nomeFuncionario,
        GROUP_CONCAT(s.nome SEPARATOR ', ') as servicosAssociados
    from agendamento a
    inner join cliente c on a.clienteIdCliente = c.idCliente
    left join funcionario f on a.funcionarioIdFuncionario = f.idFuncionario
    left join agendamento_servicos_servico ass on a.idAgendamento = ass.agendamentoIdAgendamento
    left join servico s on ass.servicoIdServico = s.idServico
    group by a.idAgendamento
    order by a.data, a.horario;
end$$

delimiter ;