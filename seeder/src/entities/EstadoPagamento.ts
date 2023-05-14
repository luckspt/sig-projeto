import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Pagamento } from './Pagamento';

@Entity()
export class EstadoPagamento {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@OneToMany(() => Pagamento, (pagamento) => pagamento.estadoPagamento)
	public pagamento!: Pagamento;
}
