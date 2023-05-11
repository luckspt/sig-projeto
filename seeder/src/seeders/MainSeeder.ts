import type { EntityManager } from '@mikro-orm/mysql';
import { faker, Seeder } from '@mikro-orm/seeder';

export class MainSeeder extends Seeder {
	public async run(em: EntityManager): Promise<void> {
		faker.setLocale('pt_PT');

		
	}
}
