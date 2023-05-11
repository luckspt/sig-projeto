import { Factory, Faker } from '@mikro-orm/seeder';
import { Encomenda } from '../../entities';

export class EncomendaFactory extends Factory<Encomenda> {
	public model = Encomenda;

	public definition(faker: Faker): Partial<Encomenda> {
		return {
			dataCriacao: faker.date.past()
			// valorTotal is defined as the sum of the values of the linhasEncomenda + portes
		};
	}
}
