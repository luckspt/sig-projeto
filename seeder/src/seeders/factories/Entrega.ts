import { Factory, Faker } from '@mikro-orm/seeder';
import { Entrega } from '../../entities';

export class EntregaFactory extends Factory<Entrega> {
	public model = Entrega;

	public definition(faker: Faker): Partial<Entrega> {
		return {
			data: faker.date.past()
		};
	}
}
