import { Router } from "express";
import ServicoController from "../controllers/servico.controller";

class ServicoRoutes {
  router = Router();
  controller = new ServicoController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Criar um novo serviço
    this.router.post("/servico", this.controller.create);

    // Retornar todos os serviços já cadastrados
    this.router.get("/servicos", this.controller.findAll);

    // Atualizar um serviço pelo seu id
    this.router.put("/servico/:id", this.controller.update);

    // Deleta um serviço pelo seu id
    this.router.delete("/servico/:id", this.controller.delete);

  }
}

export default new ServicoRoutes().router;
