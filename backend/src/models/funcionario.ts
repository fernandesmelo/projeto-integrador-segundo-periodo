import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Agendamento } from './agendamento';
import { Categoria } from './categoria';

@Entity({ name: 'Funcionario' })
export class Funcionario {
    @PrimaryGeneratedColumn({ type: 'int' })
    idFuncionario!: number;

    @Column({ length: 245 })
    nome: string;

    @Column({ length: 45, unique: true })
    cpf: string;

    @Column({ length: 50 }) // TROCAR NO BANCO DE DADOS PARA STRING
    sexo: string;

    @Column({ length: 45, unique: true })
    email: string;

    @OneToMany(() => Agendamento, agendamento => agendamento.funcionario, {onUpdate: 'CASCADE'})
    agendamentos?: Agendamento[];

    @ManyToMany(() => Categoria)
    @JoinTable()
    categorias?: Categoria[];

    constructor(
        nome: string,
        cpf: string,
        sexo: string,
        email: string,
        categorias?: Categoria[],
        
        
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.sexo = sexo;
        this.email = email;
        this.categorias = categorias;
        
        
    }
}
