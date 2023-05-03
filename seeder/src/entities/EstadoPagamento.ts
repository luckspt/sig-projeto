import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import type { Pagamento } from './Pagamento';

@Entity()
export class EstadoPagamento {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@ManyToOne()
	public pagamento!: Pagamento;
}
