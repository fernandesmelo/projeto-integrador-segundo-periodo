import { Request,Response } from "express";
import { Funcionario } from "../models/funcionario";
import funcionarioRepository from "../repositories/funcionario.repository";
import categoriaRepository from "../repositories/categoria.repository";
categoriaRepository


export default class FuncionarioController{
    async create(req: Request, res: Response) {
        if (!req.body.funcionario) {
            res.status(400).send({ message: 'Preencha corretamente por favor' });
            return;
        } 
    
        try{
            const funcionario = new Funcionario(
                req.body.funcionario.nome,
                req.body.funcionario.cpf,
                req.body.funcionario.sexo,
                req.body.funcionario.email,
                
            );

            funcionario.categorias = [];

            if (req.body.categorias && Array.isArray(req.body.categorias)){
                for(const categoriaId of req.body.categorias){
                    const categoria = await categoriaRepository.buscarById(categoriaId);
                    if(categoria){
                        funcionario.categorias.push(categoria);
                    } 
                }
            }

            const novoFuncionario = await funcionarioRepository.criar(funcionario);
            res.status(201).send(novoFuncionario);
           

        } catch (err) {
            res.status(500).send({ message: "Erro ao cadastrar o funcionario"});
        }
    }

    async cadastrarFuncionario(req: Request, res: Response){
        const {nome, cpf, sexo, email, categorias }= req.body;
        const verfica = await funcionarioRepository.buscarByCpf(cpf)

        if (verfica?.cpf == cpf || verfica?.email == email){
            res.status(400).send({ message: "CPF ou email ja está atrelado a um funcionario! "});
            return;
        } else{
            await funcionarioRepository.cadastrarFuncionarioPrc(
                nome,
                cpf,
                sexo,
                email,
                categorias
            );

        }

        try{
            res.status(201).send("ok");
        }catch(err){
            res.status(500).send({ message: "Erro ao cadastrar o funcionario"});
        }
    }


    
    async ObterFuncionariosComEspecialidade(req: Request, res: Response){
        try{
            const FuncionariosEspecialidade = await funcionarioRepository.FuncionariosEspecialidade();
            res.status(200).send(FuncionariosEspecialidade);
            
        } catch{
            res.status(500).send({ message: "Erro ao buscar os funcionarios com especialidade"});
        }

    }

    async findAll(req: Request, res: Response) {
        try{
            const funcionarios = await funcionarioRepository.buscarAll();
            res.status(200).send(funcionarios);
        } catch{
            res.status(500).send({ message: "Erro ao buscar os funcionarios"});
        }
    }

    

    async findByCpf(req: Request, res: Response){
        const cpf = req.body.cpf;

        try{
            const funcionario = await funcionarioRepository.buscarByCpf(cpf);
            if(funcionario){
                res.status(200).send(funcionario);
            } else{
                res.status(404).send({ message: `Funcionario não encontrado com cpf=${cpf}`});
            }
        } catch (err){
            res.status(500).send({ message: "Erro ao buscar o funcionario"});
        }
    }

    async update(req: Request, res: Response) {
        const idFuncionario = parseInt(req.params.id); 
        const dadosAtualizados = req.body;
    
        try {
            const funcionarioAtualizado = await funcionarioRepository.update(idFuncionario, dadosAtualizados);
            res.send({
                message: `Categoria ${funcionarioAtualizado.nome} atualizado com sucesso!`
            });
        } catch (err) {
            res.status(500).send({
                message: `Erro ao atualizar o categoria com id=${idFuncionario}.`
            });
        }
    }

}



