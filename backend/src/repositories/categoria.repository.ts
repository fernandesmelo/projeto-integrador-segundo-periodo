import { AppDataSource } from "../db/data-source";
import { Categoria } from "../models/categoria";

class CategoriaRepository {
    categoriaRepository = AppDataSource.getRepository(Categoria);

    

    async criar(categoria: Categoria): Promise<Categoria> {
        try {
            return await this.categoriaRepository.save(categoria);
        } catch (err) {
            console.error("Erro ao criar a categoria:", err);
            throw new Error("Falha ao criar o Categoria!");
        }
    }

    async buscarPorNome(nome: string): Promise<Categoria | null> {
        try {
            return await this.categoriaRepository.findOneBy({
                nome,
            });
        } catch (error) {
            console.error("Erro ao buscar categoria por nome:", error)
            throw new Error("Falha ao buscar o Categoria por nome!");
        }
    }


    async buscarAll(): Promise<Categoria[]> {
        try {
            return await this.categoriaRepository.find(); 
        } catch (error) {
            console.error("Erro ao buscar todas as categorias:", error);
            throw new Error("Falha ao retornar os Categorias!");
        }
    }

    async buscarById(categoriaId: number): Promise<Categoria | null> {
        try {
            const categoria = await this.categoriaRepository.findOneBy({
                idCategoria: categoriaId,
            });
            return categoria || null; 
        } catch (error) {
            throw new Error("Falha ao buscar o Categoria por ID!");
        }
    }

    
    async update(idCategoria: number, dadosAtualizados: Partial<Categoria>): Promise<Categoria> {
        try {

            const categoriaExistente = await this.categoriaRepository.findOneBy({
                idCategoria: idCategoria,
            });

            if (!categoriaExistente) {
                throw new Error("Categoria não encontrada!");
            }

            const categoriaAtualizada = { ...categoriaExistente, ...dadosAtualizados}
            await this.categoriaRepository.save(categoriaAtualizada);
            return categoriaAtualizada; 

        } catch (error) {
            throw new Error("Falha ao atualizar o Categoria!");
        }
    }

    async delete(categoriaId: number): Promise<number> {
        try {
            const CategoriaEncontrado = await this.categoriaRepository.findOneBy({
                idCategoria: categoriaId,
            });
            if (CategoriaEncontrado) {
                await this.categoriaRepository.remove(CategoriaEncontrado); 
            }
            return 0; 
        } catch (error) {
            throw new Error("Falha ao deletar o Categoria!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            
            const result = await this.categoriaRepository.query("select count(idCategoria) as total from Categoria;");
            await this.categoriaRepository.query("delete from Categoria;"); 
            const num = result[0]?.total || 0; 
            return num; 
        } catch (error) {
            throw new Error("Falha ao deletar todos os Categorias!");
        }
    }

}


export default new CategoriaRepository();