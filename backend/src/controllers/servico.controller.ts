import { Request, Response } from "express";
import { Servico } from "../models/servico";
import servicoRepository from "../repositories/servico.repository";
import categoriaRepository from "../repositories/categoria.repository";



export default class ServicoController {
    async create (req: Request, res: Response) {
    
        const { nome, descricao, valor, categoria_idcategoria} = req.body;
        if (!nome || !valor || !categoria_idcategoria) {
            res.status(400).send({
             message: "O nome do serviço, seu valor e a categoria são obrigatórios!"
            });
        return;
           
        }

        if (isNaN(valor) || valor <= 0) {
            res.status(400).send({
                message: "O valor do serviço deve ser um número positivo!"
            });
            return; 
        }

        try {
            
            const categoria = await categoriaRepository.buscarById(categoria_idcategoria)

            if (!categoria) {
                 res.status(404).send({
                    message: "Categoria não encontrada!"
                });
                return;
            }

            const servico = new Servico(nome, valor, categoria, descricao);

            await servicoRepository.criar(servico);

            res.status(201).send(servico); 
            return;
        } catch (error) {
            res.status(500).send({
                message: "Falha ao criar o serviço",
                error
            });
            return;
        }
    
    }

    async findAll(req: Request, res: Response) {
        try {
            const servicos = await servicoRepository.buscarAll();
        
            
            const resultado = servicos.map(servico => ({
                idServico: servico.idServico,
                nome: servico.nome,
                valor: servico.valor,
                descricao: servico.descricao,
                categoriaId: servico.categoria?.idCategoria, 
            }));

            res.status(200).json(resultado);

        } catch (err) {
            res.status(500).send({
                message: "Erro encontrado ao buscar todos os servicos."
            });
        }
    }

    async update(req: Request, res: Response) {
        const idServico = parseInt(req.params.id); 
        const dadosAtualizados = req.body;
    
        try {
            const servicoAtualizado = await servicoRepository.update(idServico, dadosAtualizados);
            res.status(200).end({
                message: `Categoria ${servicoAtualizado.nome} atualizado com sucesso!`
            });
        } catch (err) {
            res.status(500).send({
                message: `Erro ao atualizar o categoria com id=${idServico}.`
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const num = await servicoRepository.delete(id);

            if (num === 1) {
                res.status(200).send({
                    message: "Serviço deletado com sucesso!"
                });
            } else {
                res.status(500).send({
                    message: `Não foi possível deletar o serviço com id=${id}. O serviço não foi encontrado.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `O serviço com id=${id} não pode ser deletado.`
            });
        }
    }
}