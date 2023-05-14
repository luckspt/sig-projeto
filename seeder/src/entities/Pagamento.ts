import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { Encomenda } from './Encomenda';
import { EstadoPagamento } from './EstadoPagamento';

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
