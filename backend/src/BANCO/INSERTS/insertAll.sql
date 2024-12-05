use salaosenac;

insert into categoria (nome)
	values
     ('Cabelereiro'),
     ('Manicure e Pedicure'),
     ('Estetica'),
     ('Depilacao');
     
INSERT INTO funcionario (nome, cpf, sexo, email) VALUES
('Alice Souza', '123.456.789-01', 'Feminino', 'alice.souza@email.com'),
('Carlos Oliveira', '234.567.890-12', 'Masculino', 'carlos.oliveira@email.com'),
('Mariana Lima', '345.678.901-23', 'Feminino', 'mariana.lima@email.com'),
('Pedro Santos', '456.789.012-34', 'Masculino', 'pedro.santos@email.com'),
('Fernanda Costa', '567.890.123-45', 'Feminino', 'fernanda.costa@email.com');

	

insert into funcionario_categorias_categoria 
	values 
		(1, 1),
		(2, 2),
		(3, 3),
		(4, 3),
		(5, 2);
        
INSERT INTO servico (nome, valor, categoria_idcategoria) 
VALUES 
	('Corte masculino', 65.00, 1),
	('Corte feminino',45.00, 1),
	('Luzes', 200.00, 1),
	('Escova', 40.00, 1),
	('Barba/Designer de barba', 40.00, 1),
	('Manicure',23.00, 2),
	('Esmaltação',  50.00, 2),
	('Francesinha/Inglesinha', 15.00, 2),
	('Pedicure + Manicure', 45.00, 2),
	('Pedicure', 23.0, 2),
	('Drenagem Linfática Corporal Manual',  65.00, 3),
	('Limpeza de Pele', 85.00, 3),
	('Reflexologia Podal', 85.00, 3),
	('Revitalização Facial', 85.00, 3),
	('Ventosaterapia',  50.00, 3),
	('Depilação Feminina - 1/2 Pernas', 30.00, 4),
	('Axilas', 24.00, 4),
	('Virilha Simples', 28.00, 4),
	('Pernas Completas',55.00, 4),
	('Coxas', 40.00, 4);
    

INSERT INTO cliente (nome, data_nasc, cpf, email, sexo, telefone, senha, matricula) VALUES
('João Silva', '1995-05-20', '123.456.789-01', 'joao.silva@gmail.com', 'Masculino', '(11) 98765-4321', 'senha123', 'MAT001'),
('Maria Oliveira', '1990-03-15', '234.567.890-12', 'maria.oliveira@hotmail.com', 'Feminino', '(21) 99876-5432', 'senha123', 'MAT002'),
('Pedro Santos', '1998-07-10', '345.678.901-23', 'pedro.santos@yahoo.com', 'Masculino', '(31) 91234-5678', 'senha123', 'MAT003'),
('Ana Costa', '2000-01-25', '456.789.012-34', 'ana.costa@outlook.com', 'Feminino', '(41) 92345-6789', 'senha123', 'MAT004'),
('Lucas Pereira', '1992-09-05', '567.890.123-45', 'lucas.pereira@gmail.com', 'Masculino', '(51) 93456-7890', 'senha123', 'MAT005'),
('Carla Ferreira', '1997-11-18', '678.901.234-56', 'carla.ferreira@hotmail.com', 'Feminino', '(61) 94567-8901', 'senha123', 'MAT006'),
('Gustavo Rocha', '1988-06-30', '789.012.345-67', 'gustavo.rocha@yahoo.com', 'Masculino', '(71) 95678-9012', 'senha123', 'MAT007'),
('Fernanda Lima', '1994-04-22', '890.123.456-78', 'fernanda.lima@outlook.com', 'Feminino', '(81) 96789-0123', 'senha123', 'MAT008'),
('Ricardo Mendes', '1991-12-12', '901.234.567-89', 'ricardo.mendes@gmail.com', 'Masculino', '(91) 97890-1234', 'senha123', 'MAT009'),
('Juliana Souza', '1996-08-08', '012.345.678-90', 'juliana.souza@hotmail.com', 'Feminino', '(11) 98901-2345', 'senha123', 'MAT010'),
('Eduardo Silva', '1993-02-14', '111.222.333-44', 'eduardo.silva@gmail.com', 'Masculino', '(21) 99123-4567', 'senha123', 'MAT011'),
('Amanda Ramos', '1999-10-11', '222.333.444-55', 'amanda.ramos@hotmail.com', 'Feminino', '(31) 99234-5678', 'senhaa123', 'MAT012'),
('Felipe Alves', '1989-07-25', '333.444.555-66', 'felipe.alves@yahoo.com', 'Masculino', '(41) 99345-6789', 'senha123', 'MAT013'),
('Roberta Martins', '1995-05-19', '444.555.666-77', 'roberta.martins@outlook.com', 'Feminino', '(51) 99456-7890', 'senha123', 'MAT014'),
('Bruno Costa', '1997-11-02', '555.666.777-88', 'bruno.costa@gmail.com', 'Masculino', '(61) 99567-8901', 'senha123', 'MAT015'),
('Daniela Lopes', '1991-04-10', '666.777.888-99', 'daniela.lopes@hotmail.com', 'Feminino', '(71) 99678-9012', 'senha123', 'MAT016'),
('Thiago Nunes', '1998-03-08', '777.888.999-00', 'thiago.nunes@yahoo.com', 'Masculino', '(81) 99789-0123', 'senha123', 'MAT017'),
('Patrícia Oliveira', '2001-12-01', '888.999.000-11', 'patricia.oliveira@outlook.com', 'Feminino', '(91) 99890-1234', 'senha123', 'MAT018'),
('Leonardo Batista', '1996-06-22', '999.000.111-22', 'leonardo.batista@gmail.com', 'Masculino', '(11) 99901-2345', 'senha123', 'MAT019'),
('Camila Ferreira', '1994-09-17', '000.111.222-33', 'camila.ferreira@hotmail.com', 'Feminino', '(21) 99123-4567', 'senha123', 'MAT020');

    

    
    