import { Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import type { Encomenda } from './Encomenda';
import type { Produto } from './Produto';
import { LinhaEntrega } from './LinhaEntrega';

@Entity()
export class LinhaEncomenda {
	@ManyToOne({ primary: true })
	public produto!: Produto;

	@ManyToOne({ primary: true })
	public encomenda!: Encomenda;

	@Property()
	public quantidade!: number;

	@Property()
	public preco!: number;

	@OneToMany(() => LinhaEntrega, (linhaEntrega) => linhaEntrega.linhaEncomenda)
	public linhasEntrega = new Array<LinhaEntrega>();
}
