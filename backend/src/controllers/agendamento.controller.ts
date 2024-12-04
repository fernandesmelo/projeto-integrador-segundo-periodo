import { Request, Response } from 'express';
import agendamentoRepository from '../repositories/agendamento.repository';

export default class AgendamentoController {

  async criarAgendamento(req: Request, res: Response){
    try {
      const { idCliente, data, horario, valorTotal, idFuncionario, servicoIds } = req.body;

      const resultado = await agendamentoRepository.criarAgendamentoProcedure(
        idCliente,
        data,
        horario,
        valorTotal,
        idFuncionario,
        servicoIds
      );

      res.status(201).json({ mensagem: 'Agendamento criado com sucesso', resultado });
      return;
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: 'Erro ao criar agendamento', erro });
      return ;
    }
  }

  async findAll(req: Request, res: Response) {
    try{
        const agendamentos = await agendamentoRepository.findAll();
        res.status(200).send(agendamentos);
    } catch{
        res.status(500).send({ message: "Erro ao buscar os agendamentos"});
    }
  }

  async buscarTodosComPrc(req: Request, res: Response) {
    try{
        const agendamentos = await agendamentoRepository.buscarTodosComProcedure();
        res.status(200).send(agendamentos);
    } catch{
        res.status(500).send({ message: "Erro ao buscar todos os agendamentos"});
    }
  }

  async buscarPorIdClienteComPrc(req: Request, res: Response) {
    try{
      const idCliente = parseInt(req.params.id);
      const agendamentos = await agendamentoRepository.buscarPorIdClienteComProcedure(idCliente);

      res.status(200).send(agendamentos);
      return;

    } catch{
      res.status(500).send({ message: "Erro ao buscar agendamentos por id do cliente"});
    }
    
  }

  async recentesComPrc(req: Request, res: Response) {
    try{
        const agendamentos = await agendamentoRepository.obterMaisRecentesComProcedure()
        res.status(200).send(agendamentos);
    } catch{
        res.status(500).send({ message: "Erro ao buscar os agendamentos mais recentes"});
    }
  }


  async atualizarAgendamentoPrc(req: Request, res: Response){
    try {
        const idAgendamento = parseInt(req.params.id);
        const { data, horario, idFuncionario } = req.body;

        if (isNaN(idAgendamento)) {
            res.status(400).send({ message: 'ID de agendamento inválido.' });
            return;
        }

        await agendamentoRepository.atualizarComProcedure(
            idAgendamento,
            data || null,  
            horario || null,  
            idFuncionario !== undefined ? idFuncionario : null 
        );

          res.status(200).send({
            message: `Agendamento ${idAgendamento} atualizado com sucesso!`
          });
          return; 
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
          res.status(500).send({
            message: 'Erro ao atualizar agendamento.',
          });
          return; 
    }
  }

  async update(req: Request, res: Response) {
    const idAgendamento = parseInt(req.params.id); 
    const dadosAtualizados = req.body;

    try {
        const agendamentoAtualizado = await agendamentoRepository.update(idAgendamento, dadosAtualizados);
        res.status(200).send({
            message: `Agendamento ${agendamentoAtualizado.idAgendamento} atualizado com sucesso!`
        });
        } catch (err) {
          res.status(500).send({
            message: `Erro ao atualizar o agendamento com id=${idAgendamento}.`
          });
        }
  }
  
  async deletarComPrc(req: Request, res: Response) {
    const idAgendamento = parseInt(req.params.id);
    
    try {
      await agendamentoRepository.deletarComProcedure(idAgendamento);
      res.status(200).send({ message: "Agendamento deletado com sucesso!" });
      return;
    } catch(err){
        res.status(500).send({ message: `Erro ao atualizar o agendamento com id=${idAgendamento}.`
      });
    }
  }



  async delete(req: Request, res: Response){
    const id = parseInt(req.params.id);
    
    try{
        if (!id) {
            res.status(400).send({
                message: "É obrigatorio preencher o id do agendamento!"
            });
            return;
        }

        const num = await agendamentoRepository.delete(id);
        if(num ===1){
            res.send({message: "Agendamento deletado com sucesso!"});
        } else{
            res.send({message: "Nenhum agendamento encontrado com esse id!"});
        }
        
    }catch(err){
        res.status(500).send({
            message: "Erro ao tentar deletar o agendamento"
        });
    }
  }
}

