import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Encomenda } from './Encomenda';

@Entity()
export class TipoEmbalagem {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@OneToMany(() => Encomenda, (encomenda) => encomenda.tipoEmbalagem)
	public encomendas = new Collection<Encomenda>(this);
}
