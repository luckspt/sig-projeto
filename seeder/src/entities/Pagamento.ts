import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import type { Encomenda } from './Encomenda';
import type { EstadoPagamento } from './EstadoPagamento';

@Entity()
export class Pagamento {
	@OneToOne({ primary: true })
	public encomenda!: Encomenda;

	@Property()
	public data!: Date;

	@Property()
	public modoPagamento!: string;

	@ManyToOne()
	public estadoPagamento!: EstadoPagamento;
}
