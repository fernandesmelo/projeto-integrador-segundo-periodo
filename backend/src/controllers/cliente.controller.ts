import { Request, Response } from "express";
import { Cliente } from "../models/cliente";
import clienteRepository from "../repositories/cliente.repository";

export default class ClienteController {

    async create(req: Request, res: Response) {
        console.log('Requisição recebida:', req.body);
    
        const { nome, cpf, email, senha } = req.body;
        if (!nome || !cpf || !email || !senha) {
            res.status(400).send({
                message: "Nome, CPF, email e senha são obrigatórios!"
            });
            return;
        }

        

        try {
            
            const cpfExists = await clienteRepository.buscarByCpf(cpf);
            const emailExists = await clienteRepository.buscarByEmail(email);
            if (cpfExists || emailExists) {
                res.status(409).send({
                    message: "Não foi possível realizar o cadastro. Verifique suas informações e tente novamente."
                });
                return; // para n quebrar a rota, primeiro gerar a response depois enviar o retorno
            }

            const cliente: Cliente = req.body;
            const savedCliente = await clienteRepository.criar(cliente);
            res.status(201).send(savedCliente);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar salvar um cliente."
            });
        }
    }


    async login(req: Request, res: Response) {
        const { email, senha } = req.body;
    
        if (!email || !senha) {
            res.status(400).send({
                message: "Email e senha são obrigatórios!"
            });
            return;
        }
    
        try {
            const cliente = await clienteRepository.buscarPorEmailESenha(email, senha);
            if (cliente) {

                const dadosEnviados = {
                    idCliente: cliente.idCliente,
                    nome: cliente.nome,
                    email: cliente.email,
                    telefone: cliente.telefone,
                    matricula: cliente.matricula || null
                }

                res.status(200).send(dadosEnviados);
            } else {
                res.status(401).send({
                    message: "Email ou senha inválidos."
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar efetuar login."
            });
        }
    }
    
    async findAll(req: Request, res: Response) {
        try {
            const clientes = await clienteRepository.buscarAll();
            res.status(200).send(clientes);
        } catch (err) {
            res.status(500).send({
                message: "Erro encontrado ao buscar todos os clientes."
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const cliente = await clienteRepository.buscarById(id);
            if (cliente) {
                res.status(200).send(cliente);
            } else {
                res.status(404).send({
                    message: `Não foi encontrado nenhum cliente com o id=${id}.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Erro ao tentar buscar o cliente com id=${id}.`
            });
        }
    }

    async findByEmail(req: Request, res: Response) {
        const email: string = req.body.email;

        try{
            const cliente = await clienteRepository.buscarByEmail(email);
            if (cliente) {
                res.status(200).send(cliente);
            } else {
                res.status(404).send({
                    message: `Não foi encontrado nenhum cliente com o email=${email}.`
                });
            }
        } catch (err){
            res.status(500).send({
                message: `Erro ao tentar buscar o cliente com email=${email}.`
            });
        }
    }


    async AtualizaComProcedure(req: Request, res: Response){
        try {
            const idCliente = parseInt(req.params.id);
            const { nome, data_nasc, cpf, email, sexo, telefone, senha, matricula } = req.body;
    
            if (isNaN(idCliente)) {
                res.status(400).send({ message: 'ID de cliente inválido.' });
                return;
            }
    
            await clienteRepository.AtualizaClienteComPrc(
                idCliente,
                nome || null,
                data_nasc || null,
                cpf || null,
                email || null,
                sexo || null,
                telefone || null,
                senha || null,
                matricula || null
            );
    
              res.status(200).send({
                message: `Cliente ${idCliente} atualizado com sucesso!`
              });
              return; 
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
              res.status(500).send({
                message: 'Erro ao atualizar cliente.',
              });
              return; 
        }
    }


    async update(req: Request, res: Response) {
        const idCliente = parseInt(req.params.id); 
        const dadosAtualizados = req.body;
    
        try {
            const clienteAtualizado = await clienteRepository.update(idCliente, dadosAtualizados);
            res.send({
                message: `Cliente ${clienteAtualizado.nome} atualizado com sucesso!`
            });
        } catch (err) {
            res.status(500).send({
                message: `Erro ao atualizar o cliente com id=${idCliente}.`
            });
        }
    }


    async delete (req: Request, res: Response){

        const idCliente = parseInt(req.params.id);
        try{
            await clienteRepository.delete(idCliente);
            res.status(200).send({
                message: "Cliente excluido com sucesso!"
            });

        } catch{
            res.status(500).send({
                message: `Erro ao tentar excluir o cliente com id=${idCliente}.`
            });

        }
    }

    
}
