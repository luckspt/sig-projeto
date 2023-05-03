import { Entity, OneToOne, Property } from '@mikro-orm/core';
import type { Encomenda } from './Encomenda';

@Entity()
export class Devolucao {
	@OneToOne({ primary: true, joinColumn: 'id_encomenda' })
	public encomanda!: Encomenda;

	@Property()
	public movito!: string;

	@Property()
	public data!: Date;

	@Property()
	public valor!: number;
}
