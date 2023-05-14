import { Factory, Faker } from '@mikro-orm/seeder';
import { Preco } from '../../entities';

export class PrecoFactory extends Factory<Preco> {
	public model = Preco;

	public definition(faker: Faker): Partial<Preco> {
		const dataInicio = faker.date.past();
		return {
			dataInicio,
			dataFim: faker.date.future(undefined, dataInicio),
			valor: faker.datatype.number({ min: 1, max: 50000 })
		};
	}
}
