import { Factory, Faker } from '@mikro-orm/seeder';
import { LinhaEntrega } from '../../entities';

export class LinhaEntregaFactory extends Factory<LinhaEntrega> {
	public model = LinhaEntrega;

	public definition(faker: Faker): Partial<LinhaEntrega> {
		return {
			// quantidade is defined taking into account the value of the linhaencomenda
		};
	}
}
