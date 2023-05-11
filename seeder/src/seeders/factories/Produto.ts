import { Factory, Faker } from '@mikro-orm/seeder';
import { Produto } from '../../entities';

export class ProdutoFactory extends Factory<Produto> {
	public model = Produto;

	public definition(faker: Faker): Partial<Produto> {
		return {
			dataRegistro: faker.date.past(),
			nome: faker.commerce.productName(),
			desconto: faker.datatype.number(100),
			descricao: faker.commerce.productDescription(),
			peso: faker.datatype.number({ min: 0, max: 20000 }),
			stock: faker.datatype.number({ min: 0, max: 890 })
		};
	}
}
