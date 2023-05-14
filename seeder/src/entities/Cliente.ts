import { Collection, Entity, ManyToOne, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { Utilizador } from './Utilizador';
import type { Segmento } from './Segmento';
import { Encomenda } from './Encomenda';

@Entity()
export class Cliente {
	@OneToOne({ primary: true })
	public utilizador!: Utilizador;

	@Property()
	public moradaEntrega!: string;

	@ManyToOne()
	public segmento!: Segmento;

	@OneToMany(() => Encomenda, (encomenda) => encomenda.cliente)
	public encomendas = new Collection<Encomenda>(this);
}
