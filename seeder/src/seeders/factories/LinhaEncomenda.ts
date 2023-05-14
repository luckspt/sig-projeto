import { Factory, Faker } from '@mikro-orm/seeder';
import { LinhaEncomenda } from '../../entities';

export class LinhaEncomendaFactory extends Factory<LinhaEncomenda> {
	public model = LinhaEncomenda;

	public definition(faker: Faker): Partial<LinhaEncomenda> {
		return {
			quantidade: faker.datatype.number({ min: 1, max: 100 })
		};
	}
}
