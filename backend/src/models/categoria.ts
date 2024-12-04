import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Servico } from './servico';
import { Funcionario } from './funcionario';

@Entity({ name: 'Categoria' })
export class Categoria {
    @PrimaryGeneratedColumn({ type: 'int' })
    idCategoria!: number;

    @Column({ length: 60 })
    nome: string;

    @Column({ length: 100, nullable: true })
    descricao?: string;

    @OneToMany(() => Servico, servico => servico.categoria,{onUpdate: 'CASCADE'})
    servicos!: Servico[];

    @ManyToMany(() => Funcionario, funcionario => funcionario.categorias, {onUpdate: 'CASCADE'})
    funcionarios?: Funcionario[];
    
    constructor(
        nome: string,
        descricao?: string,
        
    ) {
        this.nome = nome;
        this.descricao = descricao;
        
    }
}
