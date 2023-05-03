import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import type { Categoria } from './Categoria';
import { Preco } from './Preco';
import { LinhaEncomenda } from './LinhaEncomenda';

@Entity()
export class Produto {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@Property()
	public dataRegistro!: Date;

	@Property()
	public descricao!: string;

	@Property()
	public desconto!: number;

	@Property()
	public stock!: number;

	@Property()
	public peso!: number;

	@ManyToOne()
	public categoria!: Categoria;

	@OneToMany(() => LinhaEncomenda, (linhaEncomenda) => linhaEncomenda.produto)
	public linhasEncomenda = new Collection<LinhaEncomenda>(this);

	@OneToMany(() => Preco, (preco) => preco.produto)
	public precos = new Collection<Preco>(this);
}
