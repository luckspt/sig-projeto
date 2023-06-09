import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { EstadoEncomenda } from './EstadoEncomenda';

@Entity()
export class EstadoEncomendaSpec {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@OneToMany(() => EstadoEncomenda, (estadoEncomenda) => estadoEncomenda.spec)
	public estadoEncomendas = new Collection<EstadoEncomenda>(this);
}
