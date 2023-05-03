import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Cliente } from './Cliente';

@Entity()
export class Segmento {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@OneToMany(() => Cliente, (cliente) => cliente.segmento)
	public clientes = new Collection<Cliente>(this);
}
