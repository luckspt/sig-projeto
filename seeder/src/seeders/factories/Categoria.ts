import type { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { Categoria } from '../../entities';

export class CategoriaFactory extends Factory<Categoria> {
	public model = Categoria;

	public definition(faker: Faker): EntityData<Categoria> {
		return {
			nome: faker.commerce.department(),
			descricao: faker.commerce.productDescription()
		};
	}
}
