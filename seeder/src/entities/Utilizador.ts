import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Funcionario } from './Funcionario';
import { Cliente } from './Cliente';

@Entity()
export class Utilizador {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@Property()
	public dataNascimento!: Date;

	@Property()
	public email!: string;

	@Property()
	public telefone!: string;

	@Property()
	public username!: string;

	@Property()
	public password!: string;

	@OneToOne(() => Cliente, (cliente) => cliente.utilizador, { nullable: true })
	public cliente!: Cliente;

	@OneToOne(() => Funcionario, (funcionario) => funcionario.utilizador, { nullable: true })
	public funcionario!: Funcionario;
}
