import { EntityManager, MikroORM, MySqlDriver } from '@mikro-orm/mysql';

const container = {} as {
	orm: MikroORM;
	em: EntityManager;
};

const main = async () => {
	container.orm = await MikroORM.init<MySqlDriver>();

	console.log('Hello world!');
};

void main();
