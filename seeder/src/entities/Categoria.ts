import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Produto } from './Produto';

@Entity()
export class Categoria {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@Property()
	public descricao!: string;

	@ManyToOne()
	public categoriaPai!: Categoria;

	@OneToMany(() => Produto, (produto) => produto.categoria)
	public produtos = new Collection<Produto>(this);
}
