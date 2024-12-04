use salaosenac;

delimiter $$

create procedure ObterAgendamentosPorCliente(in p_idCliente int)
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
        coalesce(f.nome, 'profissional não selecionado') as nomeFuncionario,
        group_concat(s.nome separator ', ') as servicosAssociados
    from agendamento a
    inner join cliente c on a.clienteIdCliente = c.idCliente
    left join funcionario f on a.funcionarioIdFuncionario = f.idFuncionario
    left join agendamento_servicos_servico ass on a.idAgendamento = ass.agendamentoIdAgendamento
    left join servico s on ass.servicoIdServico = s.idServico
    where c.idCliente = p_idCliente
    group by a.idAgendamento
    order by a.data, a.horario;
end$$

delimiter ;