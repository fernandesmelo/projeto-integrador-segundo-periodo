import { AppDataSource } from "../db/data-source"; 
import { Cliente } from "../models/cliente";

class ClienteRepository {
    clienteRepository = AppDataSource.getRepository(Cliente);

    async criar(cliente: Cliente): Promise<Cliente> {
        try {
            this.clienteRepository.save(cliente);
            return cliente;
        } catch (err) {
            throw new Error("Falha ao criar o cliente!");
        }
    }

    

    async buscarAll(): Promise<Cliente[]> {
        try {
            return await this.clienteRepository.find(); 
        } catch (error) {
            throw new Error("Falha ao retornar os clientes!");
        }
    }

    async buscarById(clienteId: number): Promise<Cliente | null> {
        try {
            const cliente = await this.clienteRepository.findOneBy({
                idCliente: clienteId,
            });
            return cliente || null; 
        } catch (error) {
            throw new Error("Falha ao buscar o cliente por ID!");
        }
    }

    async buscarByCpf(cpf: string): Promise<Cliente | null> {
        try {
            return await this.clienteRepository.findOneBy({
                cpf: cpf 
            });
        } catch (error) {
            throw new Error("Falha ao buscar o cliente pelo CPF!");
        }
    }

    async buscarByEmail(email: string): Promise<Cliente | null> {
        try {
            const cliente = await this.clienteRepository.findOneBy({ email });
            if (cliente) {
                return cliente; 
            } else {
                return null;
            }
        } catch (error) {
            
            throw new Error(`Erro ao buscar o cliente com CPF ${email}`);
        }
    }

    async AtualizaClienteComPrc(
        idCliente: number, 
        nome: string,
        data_nasc: Date,
        cpf: string,
        email: string,
        sexo: string,
        telefone: string,
        senha: string,
        matricula?: string
    ): Promise<any>{
        
            await this.clienteRepository.query(
                'CALL AtualizaCliente(?,?,?,?,?,?,?,?,?)', 
                [idCliente, nome || null, data_nasc || null, cpf || null, email || null, sexo || null, telefone || null, senha || null, matricula || null]
            );
            return "cliente atualizado com sucesso";
        
    }

    async update(idCliente: number, dadosAtualizados: Partial<Cliente>): Promise<Cliente> {
        try {
           
            const clienteExistente = await this.clienteRepository.findOneBy({ idCliente });
            if (!clienteExistente) {
                throw new Error("Cliente não encontrado!");
            }
    
            
            const clienteAtualizado = { ...clienteExistente, ...dadosAtualizados }; //mescla os dados
            await this.clienteRepository.save(clienteAtualizado);
            return clienteAtualizado;
        } catch (error) {
            throw new Error("Falha ao atualizar o cliente!");
        }
    }

    async buscarPorEmailESenha(email: string, senha: string): Promise<Cliente | null> {
        try{
            const cliente = await this.clienteRepository.findOneBy({email, senha});
            return cliente || null; 
        } catch (error) {
            throw new Error("Falha ao buscar o cliente por email e senha!");
        }
    
    }

    async delete(clienteId: number): Promise<any> {
            try{
                await this.clienteRepository.query(
                    'CALL DeletarCliente(?)',
                    [clienteId]
                );
                return "ok";
            } catch{
                throw new Error('Erro ao deletar cliente com procedures!');
            }        
    
    }

}



export default new ClienteRepository();
