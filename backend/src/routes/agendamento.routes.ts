import { Router } from "express";
import AgendamentoController from "../controllers/agendamento.controller";

class AgendamentoRoutes{
    router = Router();
    controller = new AgendamentoController;

    constructor(){
        this.initializeRoutes();
    }



    initializeRoutes(){
        // Cria um novo agendamento
        this.router.post("/agendamento", this.controller.criarAgendamento);

        // Buscar todos agendamentos
        this.router.get("/agendamentos", this.controller.findAll);

        // Buscar todos agendamentos com procedure
        this.router.get("/agendamentos/todos", this.controller.buscarTodosComPrc);
        // Buscar agendamentos de um cliente com procedure
        this.router.get("/agendamentos/cliente/:id", this.controller.buscarPorIdClienteComPrc);

        //Buscar os 5 agendamentos mais recentes
        this.router.get("/agendamentos/recentes", this.controller.recentesComPrc);

        // Atualizar um agendamento
        this.router.put("/agendamento/:id", this.controller.update);

        // Atualizar um agendamento com procedure
        this.router.put("/agendamento/:id/prc", this.controller.atualizarAgendamentoPrc);

        // Deleta um agendamento
        this.router.delete("/agendamento/:id", this.controller.delete);

        //Deletar com procedure
        this.router.delete("/agendamento/:id/prc", this.controller.delete);
        
    }
}

export default new AgendamentoRoutes().router;
