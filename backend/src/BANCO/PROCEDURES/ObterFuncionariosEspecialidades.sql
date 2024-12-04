delimiter $$
create procedure ObterFuncionariosEspecialidades()
	begin
    select 
		f.idFuncionario,
        f.nome,
        group_concat(c.nome ORDER BY c.nome separator ', ') "categoria"
	from funcionario f 
			inner join funcionario_categorias_categoria fc on fc.funcionarioIdFuncionario = f.idFuncionario
            inner join categoria c on fc.categoriaIdCategoria = c.idCategoria
		 GROUP BY f.idFuncionario, f.nome
        order by idFuncionario;
    end$$
delimiter ;


call ObterFuncionariosEspecialidades();