import { AppDataSource } from "../db/data-source";
import { Agendamento } from "../models/agendamento";

class AgendamentoRepository {
    agendamentoRepository = AppDataSource.getRepository(Agendamento)
    async criarAgendamentoProcedure(
      idCliente: number,
      data: Date,
      horario: string,
      valorTotal: number,
      idFuncionario?: number,
      servicoIds?: number[]
    ): Promise<JSON> {
      return this.agendamentoRepository.query(
        'CALL criarAgendamento(?, ?, ?, ?, ?, ?)',
        [idCliente, data, horario, valorTotal, idFuncionario, JSON.stringify(servicoIds)]
      );
    }

    async findAll(): Promise<Agendamento[]> {
        try{
            return await this.agendamentoRepository.find();
        } catch(err){
            throw new Error('Erro ao listar agendamentos: ');
        }
    }


    async buscarTodosComProcedure(): Promise<JSON>{
        try{
            const agendamentos = await this.agendamentoRepository.query(
                'CALL ObterTodosAgendamentos()'
            );
            return agendamentos;
        } catch{
            throw new Error('Erro ao buscar agendamentos com procedures!');
        }
        
    }

    async buscarPorIdClienteComProcedure(idCliente: number): Promise<JSON> {
        try{
            const agendamentos = await this.agendamentoRepository.query(
                'CALL ObterAgendamentosPorCliente(?)',
                [idCliente]
            );
            return agendamentos;
        } catch{
            throw new Error('Erro ao buscar agendamentos com procedures!');
        }        

    }

    async obterMaisRecentesComProcedure(): Promise<any>{
        try{
            const agendamentos = await this.agendamentoRepository.query(
                'CALL ObterAgendamentosRecentes()'
            );
            return agendamentos;
        } catch{
            throw new Error('Erro ao buscar agendamentos com procedures!');
        }
    }
    
    async atualizarComProcedure(idAgendamento: number, data: Date, horario: string,funcionarioIdFuncionario: number): Promise<any> {
        
    
        await this.agendamentoRepository.query(
            `CALL AtualizaAgendamento(?, ?, ?, ?)`,
            [
                idAgendamento,
                data || null,  
                horario || null,
                funcionarioIdFuncionario !== undefined ? funcionarioIdFuncionario : null
            ]
        );
    
        return "ok";
    }


    async update(idAgendamento: number, dadosAtualizados: Partial<Agendamento>): Promise<Agendamento> {
      try {

          const agendamentoExistente = await this.agendamentoRepository.findOneBy({
              idAgendamento: idAgendamento,
          });

          if (!agendamentoExistente) {
              throw new Error("Agendamento não encontrada!");
          }

          const agendamentoAtualizado = { ...agendamentoExistente, ...dadosAtualizados}
          await this.agendamentoRepository.save(agendamentoAtualizado);
          return agendamentoAtualizado; 

        } catch (error) {
          throw new Error("Falha ao atualizar o Agendamento!");
        }
    }

    async deletarComProcedure(idCliente: number): Promise<any> {
        try{
            await this.agendamentoRepository.query(
                'CALL DeletarAgendamento(?)',
                [idCliente]
            );
            return "ok";
        } catch{
            throw new Error('Erro ao deletar agendamentos com procedures!');
        }        

    }

    async delete(idAgendamento: number): Promise<number> {
        try {
            const agendamentoEncontrado = await this.agendamentoRepository.findOneBy({
                idAgendamento: idAgendamento,
            });
            if (agendamentoEncontrado) {
                await this.agendamentoRepository.remove(agendamentoEncontrado); 
                return 1; 
            }
            return 0; 
        } catch (error) {
            throw new Error("Falha ao deletar o Agendamento!");
        }
    }

    
  
}
  
  export default new AgendamentoRepository();
  