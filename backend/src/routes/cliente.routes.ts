import { Router } from "express";
import ClienteController from "../controllers/cliente.controller";

class ClienteRoutes {
  router = Router();
  controller = new ClienteController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {

    // Criar um novo cliente.
    this.router.post("/cliente", this.controller.create);
    // Rota para o login
    this.router.post("/login", this.controller.login);

    // Retornar todos os clientes já cadastrados.
    this.router.get("/clientes", this.controller.findAll);

    // Retorna um cliente específico pelo seu id
    this.router.get("/cliente/:id", this.controller.findOne);

    //  Retorna cliente pelo email
    this.router.get("/email", this.controller.findByEmail);

    this.router.put("/cliente/:id/prc", this.controller.AtualizaComProcedure);

    // Atualizar um cliente pelo seu id
    this.router.put("/cliente/:id", this.controller.update);

    this.router.delete("/cliente/:id", this.controller.delete);

  }
}

export default new ClienteRoutes().router;
