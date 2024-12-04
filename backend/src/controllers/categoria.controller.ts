import { Request, Response } from "express";
import { Categoria } from "../models/categoria";
import categoriaRepository from "../repositories/categoria.repository";

export default class CategoriaController{

    async create(req: Request, res: Response){
        const { nome, descricao } = req.body;
        try{
            if (!nome) {
                res.status(400).send({
                    message: "É obrigatorio preencher o nome da categoria!"
                });
                return;
            }

            if (!nome || typeof nome !== 'string' ) {
                res.status(400).send({
                    message: "Nome inválido"
                });
                return;
            }
            
        
            const categoria = new Categoria(nome, descricao);
            await categoriaRepository.criar(categoria);
            res.status(201).json(categoria);
            return;
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar criar uma nova categoria"
            });
        }

        
    }

    async findAll(req: Request, res: Response){
        try{
            const categorias = await categoriaRepository.buscarAll();
            res.json(categorias);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar listar todas categorias"
            });
        }
    }

    async findByNome(req: Request, res: Response){
        const nomeCategoria = req.body.nome;
        try{
            if (!nomeCategoria) {
                res.status(400).send({
                    message: "É obrigatorio preencher o nome da categoria!"
                });
                return;
            }

            if (!nomeCategoria || typeof nomeCategoria!=='string' ) {
                res.status(400).send({
                    message: "Nome inválido"
                });
                return;
            }

            const categoria = await categoriaRepository.buscarPorNome(nomeCategoria);
            res.status(200).json(categoria);
            
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar buscar categoria por nome"
            });
        }

    }

    async update(req: Request, res: Response) {
        const idCategoria = parseInt(req.params.id); 
        const dadosAtualizados = req.body;
    
        try {
            const categoriaAtualizada = await categoriaRepository.update(idCategoria, dadosAtualizados);
            res.send({
                message: `Categoria ${categoriaAtualizada.nome} atualizado com sucesso!`
            });
        } catch (err) {
            res.status(500).send({
                message: `Erro ao atualizar o categoria com id=${idCategoria}.`
            });
        }
    }

    async delete(req: Request, res: Response){
        const id = parseInt(req.params.id);
        
        try{
            if (!id) {
                res.status(400).send({
                    message: "É obrigatorio preencher o id da categoria!"
                });
                return;
            }

            const num = await categoriaRepository.delete(id);
            if(num ===1){
                res.send({message: "Categoria deletada com sucesso!"});
            } else{
                res.send({message: "Nenhuma categoria encontrada com esse id!"});
            }
            
        }catch(err){
            res.status(500).send({
                message: "Erro ao tentar deletar a categoria"
            });
        }
    }

}