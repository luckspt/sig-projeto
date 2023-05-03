import type { Options } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
	entities: ['./dist/entities/**'],
	entitiesTs: ['./src/entities/**'],
	type: 'mysql',
	metadataProvider: TsMorphMetadataProvider,
	seeder: {
		defaultSeeder: 'MainSeeder'
	}
};

export default config;
