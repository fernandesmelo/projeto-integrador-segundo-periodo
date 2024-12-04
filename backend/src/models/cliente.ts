import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Agendamento } from './agendamento'; 

@Entity({ name: 'Cliente' })
export class Cliente {
    @PrimaryGeneratedColumn({ type: 'int' })
    idCliente!: number;

    @Column({ length: 245 })
    nome: string;

    @Column({ type: 'date' })
    data_nasc: Date;

    @Column({ length: 20, unique: true })
    cpf: string;

    @Column({ length: 150, unique: true })
    email: string;

    @Column({ length: 50 })
    sexo: string;

    @Column({ length: 45 })
    telefone: string;

    @Column({ length: 250 })
    senha: string;

    @Column({ length: 45, nullable: true })
    matricula?: string;

    @OneToMany(() => Agendamento, agendamento => agendamento.cliente, {onUpdate: 'CASCADE'}) 
    agendamentos!: Agendamento[]; 

    constructor(
        nome: string,
        data_nasc: Date,
        cpf: string,
        email: string,
        sexo: string,
        telefone: string,
        senha: string,
        matricula?: string,
    ) {
        this.nome = nome;
        this.data_nasc = data_nasc;
        this.cpf = cpf;
        this.email = email;
        this.sexo = sexo;
        this.telefone = telefone;
        this.senha = senha;
        this.matricula = matricula;
    }
}
