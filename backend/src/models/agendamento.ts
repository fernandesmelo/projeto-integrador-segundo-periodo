import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Funcionario } from './funcionario';
import { Cliente } from './cliente';
import { Servico } from './servico';


@Entity({ name: 'Agendamento' })
export class Agendamento {
    @PrimaryGeneratedColumn({ type: 'int' })
    idAgendamento!: number;

    @ManyToOne(() => Funcionario, funcionario => funcionario.agendamentos, {nullable: true, onUpdate: 'CASCADE'})
    funcionario?: Funcionario;

    @ManyToOne(() => Cliente, cliente => cliente.agendamentos, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    cliente: Cliente;

    @Column({ type: 'date' })
    data: Date;

    @Column({ type: 'time' })
    horario: string;

    @Column({ type: 'decimal', precision: 7, scale: 2 })
    valorTotal: number;

    @ManyToMany(() => Servico, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinTable()
    servicos?: Servico[];
 

    constructor(
        cliente: Cliente,
        data: Date,
        horario: string,
        valorTotal: number,
        funcionario?: Funcionario,
        servicos?: Servico[]
    ) {
        this.cliente = cliente;
        this.data = data;
        this.horario = horario;
        this.valorTotal = valorTotal;
        this.funcionario = funcionario;
        this.servicos = servicos;
    }
}
