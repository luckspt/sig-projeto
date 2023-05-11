import { Factory, Faker } from '@mikro-orm/seeder';
import { Funcionario } from '../../entities';

export class FuncionarioFactory extends Factory<Funcionario> {
	public model = Funcionario;

	public definition(faker: Faker): Partial<Funcionario> {
		return {};
	}
}
