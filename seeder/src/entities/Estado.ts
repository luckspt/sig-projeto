import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import type { Zona } from './Zona';
import { Cidade } from './Cidade';

@Entity()
export class Estado {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@OneToMany(() => Cidade, (cidade) => cidade.estado)
	public cidades = new Collection<Cidade>(this);

	@ManyToOne()
	public zona!: Zona;
}
