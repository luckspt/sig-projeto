import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Entrega } from './Entrega';

@Entity()
export class ModoEntrega {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@OneToMany(() => Entrega, (entrega) => entrega.modoEntrega)
	public entregas = new Collection<Entrega>(this);
}
