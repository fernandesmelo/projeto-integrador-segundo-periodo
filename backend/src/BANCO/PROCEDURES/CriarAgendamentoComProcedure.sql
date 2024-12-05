use salaosenac;

DELIMITER //

CREATE PROCEDURE criarAgendamento(
    IN p_idCliente INT,
    IN p_data DATE,
    IN p_horario TIME,
    IN p_valorTotal DECIMAL(7, 2),
    IN p_idFuncionario INT,
    IN p_servicoIds JSON
)
BEGIN
    DECLARE last_insert_id INT;
    DECLARE i INT DEFAULT 0;
    DECLARE idServico INT;
    DECLARE servicoCount INT;

    
    INSERT INTO Agendamento (clienteIdCliente, data, horario, valorTotal, funcionarioIdFuncionario)
    VALUES (p_idCliente, p_data, p_horario, p_valorTotal, p_idFuncionario);

    
    SET last_insert_id = LAST_INSERT_ID();

   
    SET servicoCount = JSON_LENGTH(p_servicoIds);

   
    WHILE i < servicoCount DO
        SET idServico = JSON_UNQUOTE(JSON_EXTRACT(p_servicoIds, CONCAT('$[', i, ']')));
        INSERT INTO agendamento_servicos_servico (agendamentoIdAgendamento, servicoIdServico)
        VALUES (last_insert_id, idServico);
        SET i = i + 1;
    END WHILE;
END //

DELIMITER ;

--preencher!!!

CALL criarAgendamento(1, '2024-12-01', '09:00:00', 100.00, 1, JSON_ARRAY(1, 5, 10));
CALL criarAgendamento(2, '2024-12-02', '10:30:00', 150.00, 2, JSON_ARRAY(2, 6, 11));
CALL criarAgendamento(3, '2024-12-03', '11:45:00', 200.00, 3, JSON_ARRAY(3, 7, 12));
CALL criarAgendamento(4, '2024-12-04', '14:00:00', 250.00, 4, JSON_ARRAY(4, 8, 13));
CALL criarAgendamento(5, '2024-12-05', '15:30:00', 120.00, 1, JSON_ARRAY(5, 9, 14));
CALL criarAgendamento(6, '2024-12-06', '16:15:00', 130.00, 2, JSON_ARRAY(6, 10, 15));
CALL criarAgendamento(7, '2024-12-07', '09:45:00', 140.00, 3, JSON_ARRAY(7, 11, 16));
CALL criarAgendamento(8, '2024-12-08', '11:00:00', 160.00, 4, JSON_ARRAY(8, 12, 17));
CALL criarAgendamento(9, '2024-12-09', '13:15:00', 180.00, 1, JSON_ARRAY(9, 13, 18));
CALL criarAgendamento(10, '2024-12-10', '14:45:00', 190.00, 2, JSON_ARRAY(10, 14, 19));
CALL criarAgendamento(11, '2024-12-11', '10:15:00', 210.00, 3, JSON_ARRAY(1, 15, 20));
CALL criarAgendamento(12, '2024-12-12', '12:30:00', 220.00, 4, JSON_ARRAY(2, 16, 1));
CALL criarAgendamento(13, '2024-12-13', '13:00:00', 230.00, 1, JSON_ARRAY(3, 17, 2));
CALL criarAgendamento(14, '2024-12-14', '09:30:00', 240.00, 2, JSON_ARRAY(4, 18, 3));
CALL criarAgendamento(15, '2024-12-15', '11:45:00', 260.00, 3, JSON_ARRAY(5, 19, 4));
CALL criarAgendamento(16, '2024-12-16', '14:00:00', 270.00, 4, JSON_ARRAY(6, 20, 5));
CALL criarAgendamento(17, '2024-12-17', '16:15:00', 280.00, 1, JSON_ARRAY(7, 1, 6));
CALL criarAgendamento(18, '2024-12-18', '17:30:00', 290.00, 2, JSON_ARRAY(8, 2, 7));
CALL criarAgendamento(19, '2024-12-19', '09:00:00', 300.00, 3, JSON_ARRAY(9, 3, 8));
CALL criarAgendamento(20, '2024-12-20', '10:30:00', 310.00, 4, JSON_ARRAY(10, 4, 9));
CALL criarAgendamento(1, '2024-12-21', '09:00:00', 100.00, 1, JSON_ARRAY(1, 2, 3));
CALL criarAgendamento(2, '2024-12-21', '10:30:00', 150.00, 2, JSON_ARRAY(4, 5, 6));
CALL criarAgendamento(3, '2024-12-22', '11:00:00', 120.00, 3, JSON_ARRAY(7, 8, 9));
CALL criarAgendamento(4, '2024-12-22', '13:00:00', 80.00, 4, JSON_ARRAY(10, 11, 12));
CALL criarAgendamento(5, '2024-12-23', '08:30:00', 200.00, 1, JSON_ARRAY(13, 14, 15));
CALL criarAgendamento(6, '2024-12-23', '14:00:00', 180.00, 2, JSON_ARRAY(16, 17, 18));
CALL criarAgendamento(7, '2024-12-24', '15:00:00', 110.00, 3, JSON_ARRAY(19, 20));
CALL criarAgendamento(8, '2024-12-24', '16:30:00', 90.00, 4, JSON_ARRAY(1, 2, 3));
CALL criarAgendamento(9, '2024-12-25', '09:15:00', 130.00, 1, JSON_ARRAY(4, 5));
CALL criarAgendamento(10, '2024-12-25', '14:30:00', 140.00, 2, JSON_ARRAY(6, 7, 8));
CALL criarAgendamento(11, '2024-12-26', '10:00:00', 160.00, 3, JSON_ARRAY(9, 10));
CALL criarAgendamento(12, '2024-12-26', '13:30:00', 170.00, 4, JSON_ARRAY(11, 12, 13));
CALL criarAgendamento(13, '2024-12-27', '08:45:00', 190.00, 1, JSON_ARRAY(14, 15));
CALL criarAgendamento(14, '2024-12-27', '15:00:00', 210.00, 2, JSON_ARRAY(16, 17, 18));
CALL criarAgendamento(15, '2024-12-28', '11:30:00', 180.00, 3, JSON_ARRAY(19, 20));
CALL criarAgendamento(16, '2024-12-28', '16:00:00', 200.00, 4, JSON_ARRAY(1, 2));
CALL criarAgendamento(17, '2024-12-29', '10:15:00', 220.00, 1, JSON_ARRAY(3, 4, 5));
CALL criarAgendamento(18, '2024-12-29', '13:00:00', 230.00, 2, JSON_ARRAY(6, 7));
CALL criarAgendamento(19, '2024-12-30', '09:30:00', 240.00, 3, JSON_ARRAY(8, 9, 10));
CALL criarAgendamento(20, '2024-12-30', '14:30:00', 250.00, 4, JSON_ARRAY(11, 12, 13));
CALL criarAgendamento(1, '2024-12-31', '09:00:00', 100.00, 1, JSON_ARRAY(1, 2, 3));
CALL criarAgendamento(2, '2024-12-31', '10:30:00', 150.00, 2, JSON_ARRAY(4, 5, 6));
CALL criarAgendamento(3, '2025-01-01', '11:00:00', 120.00, 3, JSON_ARRAY(7, 8, 9));
CALL criarAgendamento(4, '2025-01-01', '13:00:00', 80.00, 4, JSON_ARRAY(10, 11, 12));
CALL criarAgendamento(5, '2025-01-02', '08:30:00', 200.00, 1, JSON_ARRAY(13, 14, 15));
CALL criarAgendamento(6, '2025-01-02', '14:00:00', 180.00, 2, JSON_ARRAY(16, 17, 18));
CALL criarAgendamento(7, '2025-01-03', '15:00:00', 110.00, 3, JSON_ARRAY(19, 20));
CALL criarAgendamento(8, '2025-01-03', '16:30:00', 90.00, 4, JSON_ARRAY(1, 2, 3));
CALL criarAgendamento(9, '2025-01-04', '09:15:00', 130.00, 1, JSON_ARRAY(4, 5));
CALL criarAgendamento(10, '2025-01-04', '14:30:00', 140.00, 2, JSON_ARRAY(6, 7, 8));
CALL criarAgendamento(11, '2025-01-05', '10:00:00', 160.00, 3, JSON_ARRAY(9, 10));
CALL criarAgendamento(12, '2025-01-05', '13:30:00', 170.00, 4, JSON_ARRAY(11, 12, 13));
CALL criarAgendamento(13, '2025-01-06', '08:45:00', 190.00, 1, JSON_ARRAY(14, 15));
CALL criarAgendamento(14, '2025-01-06', '15:00:00', 210.00, 2, JSON_ARRAY(16, 17, 18));
CALL criarAgendamento(15, '2025-01-07', '11:30:00', 180.00, 3, JSON_ARRAY(19, 20));
CALL criarAgendamento(16, '2025-01-07', '16:00:00', 200.00, 4, JSON_ARRAY(1, 2));
CALL criarAgendamento(17, '2025-01-08', '10:15:00', 220.00, 1, JSON_ARRAY(3, 4, 5));
CALL criarAgendamento(18, '2025-01-08', '13:00:00', 230.00, 2, JSON_ARRAY(6, 7));
CALL criarAgendamento(19, '2025-01-09', '09:30:00', 240.00, 3, JSON_ARRAY(8, 9, 10));
CALL criarAgendamento(20, '2025-01-09', '14:30:00', 250.00, 4, JSON_ARRAY(11, 12, 13));



