import { Router } from "express";
import FuncionarioController from "../controllers/funcionario.controller";

class FuncionarioRoutes{
    router = Router();
    controller = new FuncionarioController();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.post("/funcionario", this.controller.create);

        this.router.post("/funcionario/cadastro", this.controller.cadastrarFuncionario);

        this.router.get("/funcionarios", this.controller.findAll);

        this.router.get("/funcionarios/especialidade", this.controller.ObterFuncionariosComEspecialidade);

        this.router.get("/funcionario/cpf", this.controller.findByCpf);

        this.router.put("/funcionario/:id", this.controller.update);
    }

    
}

export default new FuncionarioRoutes().router;