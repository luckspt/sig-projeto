import { Factory, Faker } from '@mikro-orm/seeder';
import { Utilizador } from '../../entities';

export class UtilizadorFactory extends Factory<Utilizador> {
	public model = Utilizador;

	public definition(faker: Faker): Partial<Utilizador> {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		return {
			nome: `${firstName} ${lastName}`,
			dataNascimento: faker.date.past(),
			telefone: faker.phone.number(),
			email: faker.internet.email(firstName, lastName),
			username: faker.internet.userName(firstName, lastName),
			password: faker.internet.password()
		};
	}
}
