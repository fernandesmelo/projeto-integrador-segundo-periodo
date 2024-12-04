import { AppDataSource } from "../db/data-source";
import { Funcionario } from "../models/funcionario";

class FuncionarioRepository {
    funcionarioRepository = AppDataSource.getRepository(Funcionario);

    async criar(funcionario: Funcionario): Promise<Funcionario> {
        try{
            this.funcionarioRepository.save(funcionario);
            return funcionario;
        } catch(err){
            throw new Error('Erro ao salvar funcionario: ');
        }
    }

    async cadastrarFuncionarioPrc(
        nome: string,
        cpf: string,
        sexo: string,
        email: string,
        categorias: number[]
    ): Promise<JSON>{
        try{
            const funcionario = await this.funcionarioRepository.query(
                'CALL CadastrarFuncionario(?, ?, ?, ?, ?)', 
                [nome, cpf, sexo, email, JSON.stringify(categorias)]
            );
            return funcionario;
        } catch(err){
            throw new Error('Erro ao cadastrar funcionario: ');
        }
    }

    async FuncionariosEspecialidade(): Promise<JSON> {
        try{
            const funcionarios = await this.funcionarioRepository.query(
                'CALL ObterFuncionariosEspecialidades()'
            );
            return funcionarios;
        } catch(err){
            throw new Error('Erro ao listar funcionarios com categorias: ');
        }
    }

    async buscarAll(): Promise<Funcionario[]> {
        try{
            return await this.funcionarioRepository.find();
        } catch(err){
            throw new Error('Erro ao listar funcionarios: ');
        }
    }


    async buscarById(FuncionarioId: number): Promise<Funcionario | null> {
        try{
            const funcionario = await this.funcionarioRepository.findOneBy({
                idFuncionario: FuncionarioId,
            });
            return funcionario || null;
        } catch(err){
            throw new Error('Erro ao buscar funcionario por id: ');
        }
    }

    async buscarByCpf(cpf: string): Promise<Funcionario | null> {
        try{
            const funcionario = await this.funcionarioRepository.findOneBy({
                cpf: cpf,
            });
            return funcionario || null;
        } catch(err){
            throw new Error('Erro ao buscar funcionario por cpf: ');
        }
    }

    async buscarByEmail(email: string): Promise<Funcionario | null>{
        try{
            const funcionario = await this.funcionarioRepository.findOneBy({
                email: email,
            });
            return funcionario || null;
        } catch(err){
            throw new Error('Erro ao buscar funcionario por email: ');
        }
    }

    async update(idFuncionario: number, dadosAtualizados: Partial<Funcionario>): Promise<Funcionario> {
        try {

            const funcionarioExistente = await this.funcionarioRepository.findOneBy({
                idFuncionario: idFuncionario,
            });

            if (!funcionarioExistente) {
                throw new Error("Categoria não encontrada!");
            }

            const funcionarioAtualizado = { ...funcionarioExistente, ...dadosAtualizados}
            await this.funcionarioRepository.save(funcionarioAtualizado);
            return funcionarioAtualizado; 

        } catch (error) {
            throw new Error("Falha ao atualizar o Categoria!");
        }
    }


    async delete(funcionarioId: number): Promise<number>{
        try{
            const funcionarioEncontrado = await this.funcionarioRepository.findOneBy({
                idFuncionario: funcionarioId,
            });
            if(funcionarioEncontrado){
                await this.funcionarioRepository.remove(funcionarioEncontrado);
                return funcionarioId;
            }
            return 0; //cliente nao encontrado
        } catch(err){
            throw new Error('Erro ao deletar funcionario: ');
        }

    }

    async deletaAll(): Promise<number>{
        try{
            const funcionarios = await this.funcionarioRepository.find();
            if(funcionarios.length > 0){
                await this.funcionarioRepository.remove(funcionarios);
                return funcionarios.length;
            }
            return 0; //funcionarios nao encontrados
        } catch(err){
            throw new Error('Erro ao deletar todos os funcionarios: ');
        }
    }

    

}

export default new FuncionarioRepository();