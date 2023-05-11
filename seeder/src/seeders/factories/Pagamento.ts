import { Factory, Faker } from '@mikro-orm/seeder';
import { Pagamento } from '../../entities';

export class PagamentoFactory extends Factory<Pagamento> {
	public model = Pagamento;

	public definition(faker: Faker): Partial<Pagamento> {
		return {
			data: faker.date.past(),
			modoPagamento: faker.random.words(13)
		};
	}
}
