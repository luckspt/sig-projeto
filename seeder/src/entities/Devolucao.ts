import { Entity, OneToOne, Property } from '@mikro-orm/core';
import type { Encomenda } from './Encomenda';

@Entity()
export class Devolucao {
	@OneToOne({ primary: true })
	public encomenda!: Encomenda;

	@Property()
	public motivo!: string;

	@Property()
	public data!: Date;

	@Property()
	public valor!: number;
}
