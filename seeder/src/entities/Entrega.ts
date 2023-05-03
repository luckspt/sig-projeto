import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import type { Encomenda } from './Encomenda';
import { LinhaEntrega } from './LinhaEntrega';
import type { ModoEntrega } from './ModoEntrega';

@Entity()
export class Entrega {
	@PrimaryKey()
	public id!: number;

	@Property()
	public data!: Date;

	@OneToMany(() => LinhaEntrega, (linhaEntrega) => linhaEntrega.entrega)
	public linhasEntrega = new Collection<LinhaEntrega>(this);

	@ManyToOne()
	public encomenda!: Encomenda;

	@ManyToOne()
	public modoEntrega!: ModoEntrega;
}
