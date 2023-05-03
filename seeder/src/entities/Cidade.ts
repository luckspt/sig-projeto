import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import type { Estado } from './Estado';

@Entity()
export class Cidade {
	@PrimaryKey()
	public id!: number;

	@Property()
	public nome!: string;

	@ManyToOne()
	public estado!: Estado;
}
