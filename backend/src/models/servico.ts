import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, ManyToMany } from 'typeorm';
import { Categoria } from './categoria';
import { Agendamento } from './agendamento';


@Entity({ name: 'servico' })
export class Servico {
    @PrimaryGeneratedColumn({ type: 'int' })
    idServico!: number;

    @Column({ length: 100 })
    nome: string;

    @Column({ type: 'decimal', precision: 6, scale: 2 })
    valor: number;

    @Column({ length: 45, nullable: true })
    descricao?: string;

    @ManyToOne(() => Categoria, categoria => categoria.servicos, {onUpdate:'CASCADE'})
    @JoinColumn({ name: 'categoria_idcategoria' }) // Especifica a coluna de junção
    categoria!: Categoria;

    @ManyToMany(() => Agendamento, agendamento => agendamento.servicos, {onUpdate: 'CASCADE'})
    agendamentos?: Agendamento[];

    constructor(nome: string, valor: number, categoria: Categoria, descricao?: string) {  
        this.nome = nome;
        this.valor = valor;
        this.categoria = categoria;
        this.descricao = descricao;  
    }
}
