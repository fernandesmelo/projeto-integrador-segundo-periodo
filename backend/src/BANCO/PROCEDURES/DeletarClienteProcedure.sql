use salaosenac;

delimiter $$
create procedure DeletarCliente(p_idCliente int)

begin

delete from cliente

where idCliente = p_idCliente;

end $$

delimiter ;


-- teste!!!!!
call DeletarCliente(29);