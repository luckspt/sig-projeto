import { Factory, Faker } from '@mikro-orm/seeder';
import { Cidade } from '../../entities';

export class CidadeFactory extends Factory<Cidade> {
	public model = Cidade;

	public definition(faker: Faker): Partial<Cidade> {
		return {
			nome: faker.address.county()
		};
	}
}
