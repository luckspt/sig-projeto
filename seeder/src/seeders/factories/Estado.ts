import { Factory, Faker } from '@mikro-orm/seeder';
import { Estado } from '../../entities';

export class EstadoFactory extends Factory<Estado> {
	public model = Estado;

	public definition(faker: Faker): Partial<Estado> {
		return {
			nome: faker.address.city()
		};
	}
}
