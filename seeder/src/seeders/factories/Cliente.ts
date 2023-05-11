import { Factory, Faker } from '@mikro-orm/seeder';
import { Cliente } from '../../entities';

export class ClienteFactory extends Factory<Cliente> {
	public model = Cliente;

	public definition(faker: Faker): Partial<Cliente> {
		return {
			moradaEntrega: faker.address.streetAddress(true)
		};
	}
}
