import { Factory, Faker } from '@mikro-orm/seeder';
import { Devolucao } from '../../entities';

export class DevolucaoFactory extends Factory<Devolucao> {
	public model = Devolucao;

	public definition(faker: Faker): Partial<Devolucao> {
		return {
			data: faker.date.past(),
			motivo: faker.random.words(13)
			// valor is defined taking into account the value of the encomenda
		};
	}
}
