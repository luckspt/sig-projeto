import { Factory, Faker } from '@mikro-orm/seeder';
import { EstadoEncomenda } from '../../entities';

export class EstadoEncomendaFactory extends Factory<EstadoEncomenda> {
	public model = EstadoEncomenda;

	public definition(faker: Faker): Partial<EstadoEncomenda> {
		return {
			data: faker.date.past()
		};
	}
}
