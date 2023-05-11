import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import type { Encomenda } from './Encomenda';
import type { EstadoEncomendaSpec } from './EstadoEncomendaSpec';

@Entity()
export class EstadoEncomenda {
	@ManyToOne({ primary: true })
	public encomenda!: Encomenda;

	@ManyToOne({ primary: true })
	public estado!: EstadoEncomendaSpec;

	@Property()
	public data!: Date;
}
