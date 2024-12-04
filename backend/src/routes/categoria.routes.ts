import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller";

class CategoriaRoutes {
  router = Router();
  controller = new CategoriaController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Criar uma nova categoria
    this.router.post("/categoria", this.controller.create);

    // Retornar todas as categorias já cadastradas
    this.router.get("/categorias", this.controller.findAll);

    // Retorna uma categoria específico pelo seu id
    this.router.get("/categoria/nome", this.controller.findByNome);

    // Atualizar uma categoria pelo seu id
    this.router.put("/categoria/:id", this.controller.update);

    // Deletar uma categoria
    this.router.delete("/categoria/:id", this.controller.delete);

    // Deletar todas as categorais
    this.router.delete("/categorias", this.controller.delete)
  }
}

export default new CategoriaRoutes().router;
