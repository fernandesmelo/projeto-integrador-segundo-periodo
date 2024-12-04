use salaosenac;

delimiter $$

create procedure CadastrarFuncionario(
    in p_nome varchar(245),
    in p_cpf varchar(45),
    in p_sexo varchar(50),
    in p_email varchar(45),
    in p_categorias json 
)
BEGIN
    declare v_idFuncionario int;
    declare v_categoriaId int;
    declare v_categoriaIndex int default 0;
    declare v_categoriaCount int;

    insert into funcionario (nome, cpf, sexo, email)
    values (p_nome, p_cpf, p_sexo, p_email);

    set v_idFuncionario = last_insert_id() ;

    set v_categoriaCount = json_length(p_categorias);

    while v_categoriaIndex < v_categoriaCount do
        set v_categoriaId = cast(json_unquote(json_extract(p_categorias, concat('$[', v_categoriaIndex, ']'))) as signed);

        insert into funcionario_categorias_categoria (funcionarioIdFuncionario, categoriaIdCategoria)
        values (v_idFuncionario, v_categoriaId);

        set v_categoriaIndex = v_categoriaIndex + 1;
    end while;
end $$

delimiter ;

